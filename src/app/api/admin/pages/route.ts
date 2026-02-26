import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = "agencybankai-hash/deca-website";
const PAGES_DIR = "src/data/pages";

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

/** GET — list all page slugs or fetch a specific page by ?slug=xxx */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  const slug = req.nextUrl.searchParams.get("slug");

  try {
    if (slug) {
      // Fetch specific page
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

      if (!res.ok) {
        return NextResponse.json({ error: `Page "${slug}" not found` }, { status: 404 });
      }

      const data = await res.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      const page = JSON.parse(content);

      return NextResponse.json({ page, sha: data.sha });
    } else {
      // List all pages
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${PAGES_DIR}`,
        {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return NextResponse.json({ error: "Failed to list pages" }, { status: res.status });
      }

      const files = await res.json();
      const pages = files
        .filter((f: { name: string }) => f.name.endsWith(".json"))
        .map((f: { name: string }) => f.name.replace(".json", ""));

      return NextResponse.json({ pages });
    }
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

/** PUT — update a page on GitHub (triggers Vercel redeploy) */
export async function PUT(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  try {
    const { slug, page, sha } = await req.json();

    if (!slug || !page || !sha) {
      return NextResponse.json({ error: "Missing slug, page, or sha" }, { status: 400 });
    }

    const filePath = `${PAGES_DIR}/${slug}.json`;
    const content = Buffer.from(
      JSON.stringify(page, null, 2),
      "utf-8"
    ).toString("base64");

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
          message: `update page "${slug}" via admin panel`,
          content,
          sha,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message || "GitHub update failed" }, { status: res.status });
    }

    const result = await res.json();
    return NextResponse.json({ ok: true, sha: result.content.sha });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}
