"use client";

import { useState, useEffect, useCallback } from "react";

interface Section {
  type: string;
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  variant?: string;
}

interface Article {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  sections: Section[];
  relatedSlugs: string[];
}

const CATEGORIES = ["Comparisons", "Buying Guides", "Energy Efficiency", "Costs & ROI", "Technical"];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function newArticle(): Article {
  return {
    slug: "",
    title: "",
    category: "Buying Guides",
    author: "DECA Technical Team",
    authorRole: "Technical Director",
    readTime: "5 min",
    date: new Date().toISOString().split("T")[0],
    image: "",
    excerpt: "",
    sections: [{ type: "paragraph", content: "" }],
    relatedSlugs: [],
  };
}

/* ─── Login Screen ─── */
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        onLogin(data.token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#3854AA] rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">DECA Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Content Management</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none mb-3"
          autoFocus
        />
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3854AA] hover:bg-[#2a3f7a] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

/* ─── Section Editor ─── */
function SectionEditor({
  section,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  section: Section;
  index: number;
  onChange: (s: Section) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const typeColors: Record<string, string> = {
    paragraph: "bg-gray-100",
    heading: "bg-blue-50",
    list: "bg-green-50",
    callout: "bg-amber-50",
    table: "bg-purple-50",
  };

  return (
    <div className={`rounded-lg border border-gray-200 p-4 ${typeColors[section.type] || "bg-gray-50"}`}>
      <div className="flex items-center gap-2 mb-3">
        <select
          value={section.type}
          onChange={(e) => onChange({ ...section, type: e.target.value })}
          className="text-xs font-medium border border-gray-300 rounded px-2 py-1 bg-white"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="list">List</option>
          <option value="callout">Callout</option>
          <option value="table">Table</option>
        </select>
        {section.type === "callout" && (
          <select
            value={section.variant || "info"}
            onChange={(e) => onChange({ ...section, variant: e.target.value })}
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
          >
            <option value="info">Info</option>
            <option value="tip">Tip</option>
            <option value="warning">Warning</option>
          </select>
        )}
        <span className="text-xs text-gray-400 ml-auto">#{index + 1}</span>
        <button onClick={onMoveUp} disabled={isFirst} className="text-gray-400 hover:text-gray-700 disabled:opacity-30" title="Move up">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
        </button>
        <button onClick={onMoveDown} disabled={isLast} className="text-gray-400 hover:text-gray-700 disabled:opacity-30" title="Move down">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
        <button onClick={onRemove} className="text-red-400 hover:text-red-600" title="Remove">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {(section.type === "paragraph" || section.type === "heading" || section.type === "callout") && (
        <textarea
          value={section.content || ""}
          onChange={(e) => onChange({ ...section, content: e.target.value })}
          rows={section.type === "heading" ? 1 : 4}
          placeholder={section.type === "heading" ? "Section heading..." : "Write content here..."}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-y focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none bg-white"
        />
      )}

      {section.type === "list" && (
        <div className="space-y-2">
          {(section.items || [""]).map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const items = [...(section.items || [""])];
                  items[i] = e.target.value;
                  onChange({ ...section, items });
                }}
                placeholder={`List item ${i + 1}`}
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              />
              <button
                onClick={() => {
                  const items = [...(section.items || [])];
                  items.splice(i, 1);
                  onChange({ ...section, items: items.length ? items : [""] });
                }}
                className="text-red-400 hover:text-red-600 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ ...section, items: [...(section.items || []), ""] })}
            className="text-xs text-[#3854AA] hover:underline"
          >
            + Add item
          </button>
        </div>
      )}

      {section.type === "table" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            {(section.headers || ["Column"]).map((h, i) => (
              <input
                key={i}
                value={h}
                onChange={(e) => {
                  const headers = [...(section.headers || [])];
                  headers[i] = e.target.value;
                  onChange({ ...section, headers });
                }}
                placeholder={`Header ${i + 1}`}
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              />
            ))}
            <button
              onClick={() => {
                const headers = [...(section.headers || []), ""];
                const rows = (section.rows || []).map((r) => [...r, ""]);
                onChange({ ...section, headers, rows });
              }}
              className="text-xs text-[#3854AA] shrink-0"
            >
              +Col
            </button>
          </div>
          {(section.rows || [[""]]).map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((cell, ci) => (
                <input
                  key={ci}
                  value={cell}
                  onChange={(e) => {
                    const rows = [...(section.rows || [])].map((r) => [...r]);
                    rows[ri][ci] = e.target.value;
                    onChange({ ...section, rows });
                  }}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs bg-white focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
                />
              ))}
              <button
                onClick={() => {
                  const rows = [...(section.rows || [])];
                  rows.splice(ri, 1);
                  onChange({ ...section, rows });
                }}
                className="text-red-400 hover:text-red-600 shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const cols = (section.headers || []).length || 1;
              const rows = [...(section.rows || []), Array(cols).fill("")];
              onChange({ ...section, rows });
            }}
            className="text-xs text-[#3854AA] hover:underline"
          >
            + Add row
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Article Editor ─── */
function ArticleEditor({
  article,
  allSlugs,
  onChange,
  onSave,
  onCancel,
  saving,
}: {
  article: Article;
  allSlugs: string[];
  onChange: (a: Article) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const updateField = (field: string, value: string | string[]) => {
    const updated = { ...article, [field]: value };
    if (field === "title" && !article.slug) {
      updated.slug = slugify(value as string);
    }
    onChange(updated);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {article.slug ? "Edit Article" : "New Article"}
        </h2>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving || !article.title || !article.slug}
            className="px-6 py-2 text-sm bg-[#3854AA] hover:bg-[#2a3f7a] text-white font-semibold rounded-lg disabled:opacity-50 transition-colors"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Basic Info</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
              <input
                value={article.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
                placeholder="Article title..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
              <input
                value={article.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
                placeholder="url-friendly-slug"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <select
                value={article.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Author</label>
              <input
                value={article.author}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Author Role</label>
              <input
                value={article.authorRole}
                onChange={(e) => updateField("authorRole", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Read Time</label>
              <input
                value={article.readTime}
                onChange={(e) => updateField("readTime", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
                placeholder="8 min"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={article.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Cover Image URL</label>
            <input
              value={article.image}
              onChange={(e) => updateField("image", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              placeholder="https://images.unsplash.com/..."
            />
            {article.image && (
              <img src={article.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt</label>
            <textarea
              value={article.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-y focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              placeholder="Short description for article cards..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Related Articles (slugs)</label>
            <input
              value={(article.relatedSlugs || []).join(", ")}
              onChange={(e) => updateField("relatedSlugs", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
              placeholder="slug-1, slug-2"
            />
            <p className="text-xs text-gray-400 mt-1">Available: {allSlugs.filter((s) => s !== article.slug).join(", ")}</p>
          </div>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Content Sections</h3>
            <span className="text-xs text-gray-400">{article.sections.length} sections</span>
          </div>

          <div className="space-y-3">
            {article.sections.map((section, i) => (
              <SectionEditor
                key={i}
                section={section}
                index={i}
                isFirst={i === 0}
                isLast={i === article.sections.length - 1}
                onChange={(s) => {
                  const sections = [...article.sections];
                  sections[i] = s;
                  onChange({ ...article, sections });
                }}
                onRemove={() => {
                  const sections = article.sections.filter((_, j) => j !== i);
                  onChange({ ...article, sections: sections.length ? sections : [{ type: "paragraph", content: "" }] });
                }}
                onMoveUp={() => {
                  if (i === 0) return;
                  const sections = [...article.sections];
                  [sections[i - 1], sections[i]] = [sections[i], sections[i - 1]];
                  onChange({ ...article, sections });
                }}
                onMoveDown={() => {
                  if (i === article.sections.length - 1) return;
                  const sections = [...article.sections];
                  [sections[i], sections[i + 1]] = [sections[i + 1], sections[i]];
                  onChange({ ...article, sections });
                }}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            {["paragraph", "heading", "list", "callout", "table"].map((type) => (
              <button
                key={type}
                onClick={() => onChange({ ...article, sections: [...article.sections, { type, content: "", items: type === "list" ? [""] : undefined, headers: type === "table" ? ["Column 1", "Column 2"] : undefined, rows: type === "table" ? [["", ""]] : undefined }] })}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors capitalize"
              >
                + {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Admin Panel ─── */
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<"hub" | "articles">("hub");
  const [articles, setArticles] = useState<Article[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const fetchArticles = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        setToken(null);
        return;
      }
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
        setSha(data.sha);
      }
    } catch {
      setMessage({ type: "error", text: "Failed to load articles" });
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (token && view === "articles") fetchArticles();
  }, [token, view, fetchArticles]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);

    const updated = [...articles];
    if (editIndex >= 0) {
      updated[editIndex] = editing;
    } else {
      updated.push(editing);
    }

    try {
      const res = await fetch("/api/admin/articles", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles: updated, sha }),
      });

      const data = await res.json();
      if (res.ok) {
        setArticles(updated);
        setSha(data.sha);
        setEditing(null);
        setEditIndex(-1);
        setMessage({ type: "success", text: "Published! Vercel will redeploy automatically." });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to publish" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setSaving(false);
  };

  const handleDelete = async (index: number) => {
    if (!confirm(`Delete "${articles[index].title}"?`)) return;
    setSaving(true);
    const updated = articles.filter((_, i) => i !== index);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles: updated, sha }),
      });
      const data = await res.json();
      if (res.ok) {
        setArticles(updated);
        setSha(data.sha);
        setMessage({ type: "success", text: "Article deleted" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete" });
    }
    setSaving(false);
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  if (editing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ArticleEditor
          article={editing}
          allSlugs={articles.map((a) => a.slug)}
          onChange={setEditing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setEditIndex(-1); }}
          saving={saving}
        />
      </div>
    );
  }

  /* ─── Shared Header ─── */
  const AdminHeader = ({ showBack }: { showBack?: boolean }) => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => setView("hub")} className="text-gray-400 hover:text-gray-600 mr-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          )}
          <div className="w-8 h-8 bg-[#3854AA] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">DECA Admin</h1>
            <p className="text-xs text-gray-500">Content Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-gray-700">View Site</a>
          <button
            onClick={() => { localStorage.removeItem("admin_token"); setToken(null); }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── Hub View ─── */
  if (view === "hub") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Status message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
              {message.text}
            </div>
          )}

          {/* Content Editor — big hero card */}
          <a
            href="/admin/chat"
            className="block mb-8 group"
          >
            <div className="bg-gradient-to-br from-[#3854AA] to-[#2a3f7a] rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">AI Content Editor</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Edit any page on the site using natural language. Attach a screenshot, describe the change — AI will update the content and deploy automatically.
                  </p>
                </div>
                <svg className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </a>

          {/* Section cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Blog Articles */}
            <button
              onClick={() => { setView("articles"); if (!articles.length && !loading) fetchArticles(); }}
              className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-[#3854AA]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6V7.5Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">Blog Articles</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Create and edit blog posts, guides, and comparison articles</p>
                  {articles.length > 0 && (
                    <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{articles.length} articles</span>
                  )}
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">View Live Site</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Open decawindows.com to see current state of the website</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Articles View ─── */
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader showBack />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Status message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Blog Articles ({articles.length})</h2>
          <button
            onClick={() => { setEditing(newArticle()); setEditIndex(-1); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#3854AA] hover:bg-[#2a3f7a] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Article
          </button>
        </div>

        {/* Loading */}
        {loading && <div className="text-center py-12 text-gray-500">Loading articles...</div>}

        {/* Articles list */}
        <div className="space-y-3">
          {articles.map((article, i) => (
            <div key={article.slug} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all">
              {article.image && (
                <img src={article.image} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{article.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{article.category}</span>
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/blog/${article.slug}`}
                  target="_blank"
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  title="View"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
                <button
                  onClick={() => { setEditing({ ...article }); setEditIndex(i); }}
                  className="p-2 text-gray-400 hover:text-[#3854AA] rounded-lg hover:bg-blue-50"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
