"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
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

/* ─── Chat Interface ─── */
function ChatInterface({ token }: { token: string }) {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState("tilt-turn");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
        content: `Welcome to DECA Content Editor! Select a page and tell me what you want to change. Examples:\n\n• "Change the main heading to 'Premium European Windows'"\n• "Update the FAQ answer about energy savings"\n• "Replace the hero description with new text"\n• "Add a new FAQ question about installation time"`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || sending) return;

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg.content,
          slug: selectedPage,
        }),
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
  }, [input, sending, token, selectedPage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-end gap-3">
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
              disabled={!input.trim() || sending}
              className="w-10 h-10 bg-[#3854AA] hover:bg-[#2a3f7a] text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Changes are applied directly to the website via GitHub. Vercel redeploys in ~30-60 seconds.
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
