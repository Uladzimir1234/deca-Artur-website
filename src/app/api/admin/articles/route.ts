import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = "agencybankai-hash/deca-website";
const FILE_PATH = "src/data/articles.json";

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

/** GET — fetch current articles from GitHub */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: res.status });
    }

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const articles = JSON.parse(content);

    return NextResponse.json({ articles, sha: data.sha });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

/** PUT — update articles on GitHub (triggers redeploy) */
export async function PUT(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  try {
    const { articles, sha } = await req.json();

    const content = Buffer.from(
      JSON.stringify(articles, null, 2),
      "utf-8"
    ).toString("base64");

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "update articles via admin panel",
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
    return NextResponse.json({ error: "Failed to update articles" }, { status: 500 });
  }
}
