import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = "agencybankai-hash/deca-website";
const PAGES_DIR = "src/data/pages";

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

async function fetchPageFromGitHub(slug: string, ghToken: string) {
  const filePath = `${PAGES_DIR}/${slug}.json`;
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
    {
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { page: JSON.parse(content), sha: data.sha };
}

async function updatePageOnGitHub(
  slug: string,
  page: Record<string, unknown>,
  sha: string,
  ghToken: string
) {
  const filePath = `${PAGES_DIR}/${slug}.json`;
  const content = Buffer.from(JSON.stringify(page, null, 2), "utf-8").toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `AI edit: update page "${slug}" via chat`,
        content,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "GitHub update failed");
  }

  const result = await res.json();
  return result.content.sha;
}

const SYSTEM_PROMPT = `You are a website content editor for DECA Windows, a premium European window manufacturer in Massachusetts.

You receive a JSON object representing a page's content and a user instruction to modify it.

RULES:
1. Return ONLY the modified JSON — no explanations, no markdown, no code blocks
2. Preserve the JSON structure exactly — only change text values, not keys or structure
3. Keep the same professional, concise English tone
4. Do not add new sections or remove existing ones
5. If the user asks to change something that doesn't exist in the JSON, respond with: {"error": "Section not found. Available sections: [list them]"}
6. For image changes, update the "src" or "image" field with the provided URL
7. Keep all technical specifications accurate — don't invent performance numbers

The page JSON will be provided as the first user message, followed by the edit instruction.`;

/** POST — process chat message, apply edit via Claude API, push to GitHub */
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!ghToken) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  if (!anthropicKey) {
    return NextResponse.json({ error: "Anthropic API key not configured. Add ANTHROPIC_API_KEY to Vercel env vars." }, { status: 500 });
  }

  try {
    const { message, slug, image } = await req.json();

    if ((!message && !image) || !slug) {
      return NextResponse.json({ error: "Missing message or slug" }, { status: 400 });
    }

    // 1. Fetch current page content from GitHub
    const pageResult = await fetchPageFromGitHub(slug, ghToken);
    if (!pageResult) {
      return NextResponse.json({ error: `Page "${slug}" not found` }, { status: 404 });
    }

    const { page, sha } = pageResult;

    // 2. Build message content (text + optional image)
    const userContent: Array<Record<string, unknown>> = [];

    if (image?.base64 && image?.mediaType) {
      userContent.push({
        type: "image",
        source: {
          type: "base64",
          media_type: image.mediaType,
          data: image.base64,
        },
      });
    }

    userContent.push({
      type: "text",
      text: `Current page JSON:\n${JSON.stringify(page, null, 2)}\n\nEdit instruction: ${message || "See the attached screenshot and make the changes shown/described."}`,
    });

    // 3. Send to Claude API
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userContent,
          },
        ],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.json();
      return NextResponse.json(
        { error: `Claude API error: ${err.error?.message || "Unknown error"}` },
        { status: 502 }
      );
    }

    const claudeData = await claudeRes.json();
    const responseText = claudeData.content?.[0]?.text || "";

    // 4. Parse Claude's response as JSON
    let updatedPage;
    try {
      // Try to extract JSON from the response (Claude might wrap in code blocks)
      let jsonStr = responseText.trim();
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      updatedPage = JSON.parse(jsonStr);
    } catch {
      // If not valid JSON, it's likely an error message from Claude
      return NextResponse.json({
        reply: responseText,
        applied: false,
      });
    }

    // Check if Claude returned an error object
    if (updatedPage.error) {
      return NextResponse.json({
        reply: updatedPage.error,
        applied: false,
      });
    }

    // 5. Push updated JSON to GitHub
    const newSha = await updatePageOnGitHub(slug, updatedPage, sha, ghToken);

    // 6. Generate a brief summary of what changed
    const changedKeys: string[] = [];
    for (const key of Object.keys(updatedPage)) {
      if (JSON.stringify(updatedPage[key]) !== JSON.stringify((page as Record<string, unknown>)[key])) {
        changedKeys.push(key);
      }
    }

    return NextResponse.json({
      reply: changedKeys.length > 0
        ? `Updated sections: ${changedKeys.join(", ")}. Changes will appear on the site in ~30-60 seconds after Vercel redeploys.`
        : "No changes were made.",
      applied: changedKeys.length > 0,
      changedSections: changedKeys,
      newSha,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Failed to process: ${message}` }, { status: 500 });
  }
}
