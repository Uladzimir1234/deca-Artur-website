"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Attachment {
  name: string;
  base64: string;
  mediaType: string;
  preview: string;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  image?: string; // preview URL for user-attached image
  applied?: boolean;
  changedSections?: string[];
  timestamp: Date;
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
          <h1 className="text-xl font-bold text-gray-900">DECA Content Editor</h1>
          <p className="text-sm text-gray-500 mt-1">AI-powered page editing</p>
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

/* ─── Help Panel ─── */
function HelpPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">How to Use Content Editor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">1. Select the page</h3>
            <p>Use the dropdown in the header to choose which page you want to edit (Tilt Turn, Windows, Doors, etc.).</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">2. Describe the change</h3>
            <p>Type what you want to change in plain English. Be specific about which section and what the new text should be.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">3. Attach a screenshot (optional)</h3>
            <p>Click the 📎 button or paste an image (Ctrl+V) to attach a screenshot. This helps the AI understand exactly which part of the page you want to change.</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">Example requests:</h3>
            <ul className="space-y-1.5 text-gray-600">
              <li>• &quot;Change the main heading to &apos;Premium European Windows&apos;&quot;</li>
              <li>• &quot;Update the FAQ about energy savings — new answer: ...&quot;</li>
              <li>• &quot;In the hero section, replace the description with: ...&quot;</li>
              <li>• &quot;Change U-Factor spec from 0.14 to 0.12&quot;</li>
              <li>• &quot;Replace gallery image #3 with this URL: https://...&quot;</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-2">Limitations:</h3>
            <ul className="space-y-1.5 text-amber-700">
              <li>• Text and image URLs only — cannot upload photos directly</li>
              <li>• Cannot change page layout, colors, or design</li>
              <li>• Cannot add entirely new sections (only edit existing ones)</li>
              <li>• Changes take 30-60 seconds to appear on the live site</li>
              <li>• One edit at a time — wait for confirmation before next request</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">After making changes</h3>
            <p>When you see the green ✓ &quot;Changes applied to site&quot; message, your edit has been saved. Open the website in 30-60 seconds to verify the change looks correct.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Chat Interface ─── */
function ChatInterface({ token }: { token: string }) {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState("tilt-turn");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [sending, setSending] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load available pages
  useEffect(() => {
    fetch("/api/admin/pages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.pages) setPages(data.pages);
      })
      .catch(() => {});
  }, [token]);

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        role: "system",
        content: `Welcome to DECA Content Editor!\n\nSelect a page from the dropdown and describe what you want to change. You can also attach a screenshot to show exactly what needs editing.\n\nClick the ❓ button for detailed instructions and examples.`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Full = reader.result as string;
      const base64Data = base64Full.split(",")[1];
      const mediaType = file.type;
      setAttachment({
        name: file.name,
        base64: base64Data,
        mediaType,
        preview: base64Full,
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle paste (for screenshots)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) handleFileSelect(file);
          break;
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const sendMessage = useCallback(async () => {
    if ((!input.trim() && !attachment) || sending) return;

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      image: attachment?.preview,
      timestamp: new Date(),
    };

    const currentAttachment = attachment;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachment(null);
    setSending(true);

    try {
      const body: Record<string, unknown> = {
        message: userMsg.content,
        slug: selectedPage,
      };

      if (currentAttachment) {
        body.image = {
          base64: currentAttachment.base64,
          mediaType: currentAttachment.mediaType,
        };
      }

      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.reply || data.error || "Done.",
          applied: data.applied,
          changedSections: data.changedSections,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error || "Something went wrong"}`,
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    }

    setSending(false);
    inputRef.current?.focus();
  }, [input, attachment, sending, token, selectedPage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </a>
            <div className="w-8 h-8 bg-[#3854AA] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">Content Editor</h1>
              <p className="text-[11px] text-gray-500">AI-powered editing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelp(true)}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold transition-colors"
              title="Help & Instructions"
            >
              ?
            </button>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
            >
              {pages.length > 0 ? (
                pages.map((p) => (
                  <option key={p} value={p}>
                    {p.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))
              ) : (
                <option value="tilt-turn">Tilt Turn</option>
              )}
            </select>
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-gray-700">
              View Site
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("admin_token");
                window.location.reload();
              }}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#3854AA] text-white"
                    : msg.role === "system"
                    ? "bg-blue-50 text-gray-700 border border-blue-100"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Attached screenshot"
                    className="rounded-lg mb-2 max-h-48 w-auto border border-white/20"
                  />
                )}
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                {msg.applied && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-green-200">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">Changes applied to site</span>
                  </div>
                )}
                {msg.applied === false && msg.role === "assistant" && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-yellow-200">
                    <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span className="text-xs text-yellow-600 font-medium">No changes applied</span>
                  </div>
                )}
                <p className="text-[10px] opacity-50 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs">Editing page content...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Attachment preview */}
      {attachment && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-3">
            <img src={attachment.preview} alt="Preview" className="h-12 rounded-lg border border-gray-300" />
            <span className="text-xs text-gray-500 flex-1 truncate">{attachment.name}</span>
            <button
              onClick={() => setAttachment(null)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-end gap-2">
            {/* File upload button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl flex items-center justify-center transition-colors shrink-0"
              title="Attach screenshot"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </button>

            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Describe the change for "${selectedPage.replace(/-/g, " ")}" page...`}
                rows={1}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={(!input.trim() && !attachment) || sending}
              className="w-10 h-10 bg-[#3854AA] hover:bg-[#2a3f7a] text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Attach screenshots with 📎 or paste (Ctrl+V). Changes appear on the site in ~30-60 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function AdminChatPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  if (!token) return <LoginScreen onLogin={setToken} />;
  return <ChatInterface token={token} />;
}
