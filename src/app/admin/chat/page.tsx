"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const globalStyles = `
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-dot {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}
`;

interface Attachment {
  name: string;
  base64: string;
  mediaType: string;
  preview: string;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  image?: string;
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
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="animate-[fadeUp_0.4s_ease-out]">
        <form onSubmit={handleSubmit} className="bg-[#1a1d27] rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-white/[0.06]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3854AA] to-[#5b7bd5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#3854AA]/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">DECA Content Editor</h1>
            <p className="text-sm text-gray-400 mt-1.5">Sign in to edit your website</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-[#0f1117] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3854AA] focus:border-transparent outline-none mb-3 transition-all"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#3854AA] to-[#4a67c0] hover:from-[#2a3f7a] hover:to-[#3854AA] text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-[#3854AA]/20"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Help Panel ─── */
function HelpPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#1a1d27] rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 border border-white/[0.06] animate-[scaleIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">How to Use</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-[#3854AA]/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#5b7bd5]">1</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-0.5">Select a page</h3>
              <p className="text-gray-400 leading-relaxed">Choose which page to edit from the dropdown at the top.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-[#3854AA]/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#5b7bd5]">2</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-0.5">Describe the change</h3>
              <p className="text-gray-400 leading-relaxed">Type in natural language what you want to change. Be specific about which section.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-[#3854AA]/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#5b7bd5]">3</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-0.5">Attach a screenshot (optional)</h3>
              <p className="text-gray-400 leading-relaxed">Drag & drop, paste (Ctrl+V), or click the image icon to show exactly what needs changing.</p>
            </div>
          </div>

          <div className="bg-[#3854AA]/10 rounded-xl p-4 border border-[#3854AA]/20 mt-2">
            <h3 className="font-medium text-[#5b7bd5] mb-2 text-xs uppercase tracking-wider">Example requests</h3>
            <ul className="space-y-1.5 text-gray-300 text-[13px]">
              <li>&quot;Change the main heading to Premium European Windows&quot;</li>
              <li>&quot;Update the FAQ about energy savings&quot;</li>
              <li>&quot;Change U-Factor spec from 0.14 to 0.12&quot;</li>
            </ul>
          </div>

          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
            <h3 className="font-medium text-amber-400 mb-2 text-xs uppercase tracking-wider">Limitations</h3>
            <ul className="space-y-1.5 text-gray-400 text-[13px]">
              <li>Text content and image URLs only</li>
              <li>Cannot change layout, colors, or add new sections</li>
              <li>Changes deploy in 30-60 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ pageName }: { pageName: string }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-[fadeUp_0.4s_ease-out]">
        <div className="w-20 h-20 bg-gradient-to-br from-[#3854AA]/20 to-[#5b7bd5]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#3854AA]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Edit <span className="text-[#5b7bd5]">{pageName}</span>
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Describe what you want to change, or attach a screenshot and point out the area to edit. AI will update the content and deploy it automatically.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Change heading text", "Update phone number", "Edit FAQ answer"].map((hint) => (
            <span key={hint} className="px-3.5 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-xs text-gray-400 hover:bg-white/[0.08] hover:text-gray-300 transition-all cursor-default">
              {hint}
            </span>
          ))}
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragCounterRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pageName = selectedPage.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
      setAttachment({
        name: file.name,
        base64: base64Full.split(",")[1],
        mediaType: file.type,
        preview: base64Full,
      });
    };
    reader.readAsDataURL(file);
  };

  // Paste handler
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

  // Drag & drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.types.includes("Files")) setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) { dragCounterRef.current = 0; setIsDraggingOver(false); }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) handleFileSelect(files[0]);
  }, []);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

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

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";

    try {
      const body: Record<string, unknown> = { message: userMsg.content, slug: selectedPage };
      if (currentAttachment) {
        body.image = { base64: currentAttachment.base64, mediaType: currentAttachment.mediaType };
      }

      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: data.reply || data.error || "Done.",
          applied: data.applied,
          changedSections: data.changedSections,
          timestamp: new Date(),
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: `Error: ${data.error || "Something went wrong"}`,
          timestamp: new Date(),
        }]);
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Network error. Please try again.",
        timestamp: new Date(),
      }]);
    }

    setSending(false);
    inputRef.current?.focus();
  }, [input, attachment, sending, token, selectedPage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className="h-screen bg-[#0f1117] flex flex-col relative overflow-hidden"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Drag overlay */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ backgroundColor: "rgba(56, 84, 170, 0.15)" }}>
          <div className="border-2 border-dashed border-[#5b7bd5] rounded-3xl px-16 py-12 bg-[#1a1d27]/95 backdrop-blur-md shadow-2xl flex flex-col items-center gap-4 animate-[scaleIn_0.15s_ease-out]">
            <div className="w-16 h-16 rounded-2xl bg-[#3854AA]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5b7bd5]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white">Drop screenshot here</p>
              <p className="text-sm text-gray-400 mt-1">Image will be attached to your message</p>
            </div>
          </div>
        </div>
      )}

      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

      {/* ─── Header ─── */}
      <div className="bg-[#1a1d27]/80 backdrop-blur-xl border-b border-white/[0.06] z-10">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </a>
            <div className="w-px h-5 bg-white/[0.08]" />
            <select
              value={selectedPage}
              onChange={(e) => { setSelectedPage(e.target.value); setMessages([]); }}
              className="bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer hover:text-[#5b7bd5] transition-colors appearance-none pr-5"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right center", backgroundSize: "16px" }}
            >
              {pages.length > 0 ? (
                pages.map((p) => (
                  <option key={p} value={p} className="bg-[#1a1d27] text-white">
                    {p.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))
              ) : (
                <option value="tilt-turn" className="bg-[#1a1d27]">Tilt Turn</option>
              )}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-all ${showSidebar ? "text-[#5b7bd5]" : "text-gray-500 hover:text-gray-300"}`}
              title="Toggle guide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </button>
            <a
              href={`/${selectedPage === "home" ? "" : selectedPage}`}
              target="_blank"
              className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-500 hover:text-gray-300 transition-all"
              title="View page"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <button
              onClick={() => { localStorage.removeItem("admin_token"); window.location.reload(); }}
              className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-500 hover:text-red-400 transition-all"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ─── Chat Column ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages / Empty State */}
          {!hasMessages ? (
            <EmptyState pageName={pageName} />
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-[fadeUp_0.2s_ease-out]`}
                  >
                    {msg.role !== "user" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3854AA] to-[#5b7bd5] rounded-xl flex items-center justify-center shrink-0 mr-3 mt-0.5 shadow-lg shadow-[#3854AA]/10">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-[#3854AA] text-white"
                          : "bg-[#1a1d27] text-gray-200 border border-white/[0.06]"
                      }`}
                    >
                      {msg.image && (
                        <img src={msg.image} alt="Screenshot" className="rounded-xl mb-3 max-h-52 w-auto border border-white/10" />
                      )}
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      {msg.applied && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-500/20">
                          <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </div>
                          <span className="text-xs text-green-400 font-medium">Changes deployed to site</span>
                        </div>
                      )}
                      {msg.applied === false && msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-yellow-500/20">
                          <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-yellow-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                          </div>
                          <span className="text-xs text-yellow-400 font-medium">No changes applied</span>
                        </div>
                      )}
                      <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/40" : "text-gray-600"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {sending && (
                  <div className="flex justify-start animate-[fadeUp_0.2s_ease-out]">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3854AA] to-[#5b7bd5] rounded-xl flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                      </svg>
                    </div>
                    <div className="bg-[#1a1d27] rounded-2xl px-5 py-4 border border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-[#5b7bd5] rounded-full" style={{ animation: "pulse-dot 1.4s ease-in-out infinite", animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-[#5b7bd5] rounded-full" style={{ animation: "pulse-dot 1.4s ease-in-out infinite", animationDelay: "200ms" }} />
                          <div className="w-2 h-2 bg-[#5b7bd5] rounded-full" style={{ animation: "pulse-dot 1.4s ease-in-out infinite", animationDelay: "400ms" }} />
                        </div>
                        <span className="text-xs text-gray-500">Applying changes...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-white/[0.06] bg-[#0f1117]">
            <div className="max-w-3xl mx-auto px-4 py-3">
              {attachment && (
                <div className="mb-3 flex items-center gap-3 bg-[#1a1d27] rounded-xl p-2.5 border border-white/[0.06]">
                  <img src={attachment.preview} alt="Preview" className="h-14 rounded-lg" />
                  <span className="text-xs text-gray-400 flex-1 truncate">{attachment.name}</span>
                  <button onClick={() => setAttachment(null)} className="w-7 h-7 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-500 hover:text-red-400 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }} />
                <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 rounded-xl hover:bg-white/[0.06] flex items-center justify-center text-gray-500 hover:text-gray-300 transition-all shrink-0" title="Attach screenshot">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
                </button>
                <div className="flex-1 relative">
                  <textarea ref={inputRef} value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder={`Describe changes for ${pageName}...`} rows={1} className="w-full bg-[#1a1d27] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:ring-1 focus:ring-[#3854AA]/50 focus:border-[#3854AA]/30 outline-none transition-all" style={{ minHeight: "44px", maxHeight: "160px" }} />
                </div>
                <button onClick={sendMessage} disabled={(!input.trim() && !attachment) || sending} className="w-10 h-10 bg-[#3854AA] hover:bg-[#4a67c0] text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-[#3854AA] shrink-0 shadow-lg shadow-[#3854AA]/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar: Guide ─── */}
        {showSidebar && (
          <div className="w-80 border-l border-white/[0.06] bg-[#13151c] overflow-y-auto hidden lg:block shrink-0">
            <div className="p-5 space-y-6">
              {/* What you can do */}
              <div>
                <h3 className="text-xs font-semibold text-[#5b7bd5] uppercase tracking-wider mb-3">What you can do</h3>
                <ul className="space-y-2.5 text-[13px] text-gray-300">
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Edit any text — headings, descriptions, buttons, FAQ answers, specs</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Replace image URLs (provide a direct link)</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Rewrite text to sound better — say &quot;improve hero section&quot;</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Attach a screenshot and describe what to change</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Ask questions — &quot;what sections does this page have?&quot;</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>Write in Russian or English — AI understands both</span>
                  </li>
                </ul>
              </div>

              {/* Limitations */}
              <div>
                <h3 className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider mb-3">Limitations</h3>
                <ul className="space-y-2.5 text-[13px] text-gray-400">
                  <li className="flex gap-2.5">
                    <span className="text-gray-600 mt-0.5 shrink-0">&#10007;</span>
                    <span>Cannot change page layout or design</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-gray-600 mt-0.5 shrink-0">&#10007;</span>
                    <span>Cannot add new page sections</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-gray-600 mt-0.5 shrink-0">&#10007;</span>
                    <span>Cannot upload photos — only replace URLs</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-gray-600 mt-0.5 shrink-0">&#10007;</span>
                    <span>One edit at a time — wait for response</span>
                  </li>
                </ul>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Examples</h3>
                <div className="space-y-2">
                  {[
                    "Change the main heading to 'Premium European Windows'",
                    "Improve the hero description — make it more compelling",
                    "Update U-Factor spec from 0.14 to 0.12",
                    "Replace the hero image with this URL: https://...",
                    "What sections can I edit on this page?",
                  ].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => { setInput(ex); inputRef.current?.focus(); }}
                      className="block w-full text-left text-[12px] text-gray-500 hover:text-gray-300 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg px-3 py-2.5 transition-all border border-white/[0.04] hover:border-white/[0.08]"
                    >
                      &quot;{ex}&quot;
                    </button>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How it works</h3>
                <div className="space-y-3 text-[12px] text-gray-500">
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 bg-[#3854AA]/20 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold text-[#5b7bd5]">1</div>
                    <span>You describe the change in chat</span>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 bg-[#3854AA]/20 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold text-[#5b7bd5]">2</div>
                    <span>AI updates the page data on GitHub</span>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 bg-[#3854AA]/20 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold text-[#5b7bd5]">3</div>
                    <span>Vercel auto-deploys in 30-60 sec</span>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 bg-[#3854AA]/20 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold text-[#5b7bd5]">4</div>
                    <span>Changes appear on the live site</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
