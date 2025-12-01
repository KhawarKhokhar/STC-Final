"use client";

import { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  MailQuestion,
  MessageSquare,
  MoreHorizontal,
  Pin,
  Send,
  Search,
} from "lucide-react";
import { rdb, auth } from "@/lib/firebase";
import {
  ref,
  onValue,
  push,
  set,
  query as rdbQuery,
  orderByChild,
  limitToFirst,
  update,
  off,
} from "firebase/database";
import { signInAnonymously } from "firebase/auth";

// ✅ notification helper (RTDB)
import { createNotification } from "@/lib/notifications";

type ChatItem = {
  id: string;
  name?: string;
  email?: string;
  lastMessage?: string;
  lastUpdated?: number;
  unread?: number;
  tag?: string;
  status?: "live" | "bot" | "closed";
  createdAt?: number;
  pinned?: boolean;
};

function isUserOnline(lastUpdated?: number): boolean {
  if (!lastUpdated) return false;
  const now = Date.now();
  const twoMinutes = 2 * 60 * 1000;
  return now - lastUpdated < twoMinutes;
}

function playNotificationSound() {
  if (typeof window !== "undefined") {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiV1/LNei0GI3PD8N2YSA0UWqrs7KtZFgxRqOLitl8WCjiP0+7DdS4HI3TC8N2UQAoVXrXr7K5dGRBRp+LiuWQZCzyO0+7CcykGI3LB8N2VPwsVXrPo7KpbGBBQpuPjvWkaDz6P0+3AcScGJHHB8N6WQQwWXbPo7KlYGRBRqOPjvmwdEECP0+3AcSUGI3HB8N2UP"
    );
    audio.play().catch(() => {});
  }
}

export default function ChatsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "pinned">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ keep last notified msg per chat to avoid duplicates
  const lastNotifiedMsgRef = useRef<Record<string, string>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!auth.currentUser) signInAnonymously(auth).catch(() => {});

    const chatsRef = ref(rdb, "chats");
    const q = rdbQuery(chatsRef, orderByChild("lastUpdated"), limitToFirst(100));

    const cb = onValue(q, (snap) => {
      const v = snap.val() || {};
      const arr = Object.keys(v).map((k) => ({ id: k, ...(v[k] as any) }));
      arr.sort((a: any, b: any) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
      setChats(arr);
      if (!activeId && arr.length) setActiveId(arr[0].id);
    });

    return () => cb();
  }, []);

  useEffect(() => {
    if (!activeId) return;

    const msgsRef = ref(rdb, `chats/${activeId}/messages`);
    const q = rdbQuery(msgsRef, limitToFirst(500));

    const cb = onValue(q, async (snap) => {
      const v = snap.val() || {};
      const arr = Object.keys(v).map((k) => ({ id: k, ...(v[k] as any) }));
      arr.sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0));

      // ✅ detect new message
      if (arr.length > prevMessageCount && prevMessageCount > 0) {
        const lastMessage = arr[arr.length - 1];

        // only if message from user/bot (not admin)
        if (lastMessage.from !== "admin") {
          playNotificationSound();

          // ✅ RTDB Notification (guarded)
          const notifiedKey = `lastNotifiedMsg-${activeId}`;
          const storedLast = localStorage.getItem(notifiedKey);
          const currentMsgId = lastMessage.id;

          if (currentMsgId && storedLast !== currentMsgId) {
            try {
              await createNotification({
                type: "chat",
                title: "New chat message",
                desc: (lastMessage.text || "New message").slice(0, 80),
                refPath: `/chats/${activeId}`,
              });

              localStorage.setItem(notifiedKey, currentMsgId);
              lastNotifiedMsgRef.current[activeId] = currentMsgId;
            } catch (e) {
              console.error("Failed to create chat notification:", e);
            }
          }
        }
      }

      setPrevMessageCount(arr.length);
      setMessages(arr);
    });

    return () => cb();
  }, [activeId, prevMessageCount]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ SUPPORT STARTS CHAT => set status live (bot/FAQ should stop)
  async function sendReply() {
    if (!activeId || !reply.trim()) return;

    const chat = chats.find((c) => c.id === activeId);
    const wasBotOrNull = !chat?.status || chat.status === "bot";

    const msgsRef = ref(rdb, `chats/${activeId}/messages`);
    await push(msgsRef, {
      from: "admin",
      text: reply.trim(),
      createdAt: Date.now(),
    });

    // ✅ update chat root
    await update(ref(rdb, `chats/${activeId}`), {
      lastMessage: reply.trim(),
      lastUpdated: Date.now(),
      // if support talking first time, flip to live
      ...(wasBotOrNull ? { status: "live" } : {}),
    });

    setReply("");
  }

  function fmt(ts?: number) {
    if (!ts) return "";
    const d = new Date(ts);
    return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  }

  function formatMessageTime(ts?: number) {
    if (!ts) return "";
    const date = new Date(ts);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function togglePin(chatId: string) {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    await update(ref(rdb, `chats/${chatId}`), {
      pinned: !chat.pinned,
    });
  }

  const filteredChats = chats
    .filter((chat) => {
      if (searchQuery.trim()) {
        const queryStr = searchQuery.toLowerCase();
        const nameMatch = chat.name?.toLowerCase().includes(queryStr);
        const emailMatch = chat.email?.toLowerCase().includes(queryStr);
        if (!nameMatch && !emailMatch) return false;
      }

      if (filter === "all") return true;
      if (filter === "unread") return (chat.unread || 0) > 0;
      if (filter === "pinned") return chat.pinned === true;
      return true;
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (b.lastUpdated || 0) - (a.lastUpdated || 0);
    });

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Chats title and filter tabs */}
      <div className="shrink-0 px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div>
          <h2 className="text-lg font-semibold">Chats</h2>
          <p className="text-xs text-slate-400">
            Date:{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 text-xs rounded-2xl border border-[#E4EAF3] bg-slate-50/70 backdrop-blur-md p-1">
          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              filter === "all"
                ? "bg-white shadow-sm border border-[#E4EAF3]"
                : "bg-transparent hover:bg-slate-50"
            }`}
          >
            <MessageSquare
              className={`w-3.5 h-3.5 ${
                filter === "all" ? "text-[#2563eb]" : "text-[#94A3B8]"
              }`}
              strokeWidth={2}
            />
            <span
              className={`${
                filter === "all" ? "font-medium text-black" : "text-[#94A3B8]"
              }`}
            >
              All
            </span>
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              filter === "unread"
                ? "bg-white shadow-sm border border-[#E4EAF3]"
                : "bg-transparent hover:bg-slate-50"
            }`}
          >
            <MailQuestion
              className={`w-3.5 h-3.5 ${
                filter === "unread" ? "text-[#2563eb]" : "text-[#94A3B8]"
              }`}
              strokeWidth={2}
            />
            <span
              className={`${
                filter === "unread"
                  ? "font-medium text-black"
                  : "text-[#94A3B8]"
              }`}
            >
              Unread
            </span>
          </button>

          <button
            onClick={() => setFilter("pinned")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              filter === "pinned"
                ? "bg-white shadow-sm border border-[#E4EAF3]"
                : "bg-transparent hover:bg-slate-50"
            }`}
          >
            <Pin
              className={`w-3.5 h-3.5 ${
                filter === "pinned" ? "text-[#2563eb]" : "text-[#94A3B8]"
              }`}
              strokeWidth={2}
            />
            <span
              className={`${
                filter === "pinned"
                  ? "font-medium text-black"
                  : "text-[#94A3B8]"
              }`}
            >
              Pinned
            </span>
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 min-h-0 flex px-4 gap-4">
        {/* LEFT COLUMN */}
        <section className="w-80 flex flex-col bg-slate-50/70 rounded-2xl border border-slate-100">
          {/* Search */}
          <div className="shrink-0 p-3 border-b border-slate-100">
            <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-400">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-700"
                placeholder="Search message"
              />
              <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium">
                /
              </span>
            </div>
          </div>

          {/* Chats list */}
          <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
            {filteredChats.map((chat) => {
              const active = chat.id === activeId;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveId(chat.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 text-left text-xs border-b border-slate-100 cursor-pointer
                    ${active ? "bg-white" : "bg-transparent hover:bg-white/60"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`h-8 w-8 rounded-full ${
                          chat.status === "live"
                            ? "bg-green-200"
                            : "bg-pink-200"
                        }`}
                      />
                      {isUserOnline(chat.lastUpdated) && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[13px]">
                          {chat.name || chat.email}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-[10px] text-green-600 font-medium">
                          Customer
                        </span>
                        {chat.pinned && (
                          <Pin className="w-3 h-3 text-blue-500 fill-blue-500" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                        {chat.lastMessage || chat.email || "New chat"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">12:00</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(chat.id);
                        }}
                        className={`p-1 rounded-full hover:bg-slate-100 transition ${
                          chat.pinned ? "text-blue-500" : "text-slate-300"
                        }`}
                        title={chat.pinned ? "Unpin chat" : "Pin chat"}
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                    </div>
                    {(chat.unread || 0) > 0 && (
                      <span className="h-5 min-w-5 px-1 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Conversation */}
        <section className="flex-1 flex flex-col bg-slate-50/50 rounded-2xl border border-slate-100">
          {/* Header */}
          <div className="shrink-0 h-16 px-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`h-9 w-9 rounded-full ${
                    chats.find((c) => c.id === activeId)?.status === "live"
                      ? "bg-green-200"
                      : "bg-pink-200"
                  }`}
                />
                {isUserOnline(
                  chats.find((c) => c.id === activeId)?.lastUpdated
                ) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {chats.find((c) => c.id === activeId)?.name ||
                      "No chat selected"}
                  </span>
                  {chats.find((c) => c.id === activeId)?.status === "live" && (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-[10px] text-green-700 font-semibold">
                      🔴 LIVE
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-[10px] text-green-600 font-medium">
                    Customer
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {chats.find((c) => c.id === activeId)?.email || ""}
                  {isUserOnline(
                    chats.find((c) => c.id === activeId)?.lastUpdated
                  ) && <span className="ml-2 text-green-500">• Online</span>}
                </p>
              </div>
            </div>
            <button className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 px-6 py-4 overflow-y-auto text-xs space-y-6"
            style={{ minHeight: 0 }}
          >
            {messages.length === 0 && (
              <div className="text-center text-slate-500">No messages yet</div>
            )}

            {messages.map((m, idx) => (
              <div key={m.id || idx} className="space-y-1">
                <div
                  className={`flex items-end gap-2 ${
                    m.from === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.from !== "admin" && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 shadow-sm">
                      {m.from === "bot" ? "🤖" : "U"}
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      m.from === "admin"
                        ? "bg-linear-to-r from-[#45A3D9] to-[#45D9D0] text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.from === "admin" && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-[#45A3D9] to-[#45D9D0] text-white text-xs font-semibold shadow-sm">
                      Me
                    </div>
                  )}
                </div>
                {m.createdAt && (
                  <div
                    className={`text-[10px] text-slate-400 px-10 ${
                      m.from === "admin" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatMessageTime(m.createdAt)}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-slate-100 px-6 py-3 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 text-[11px] text-blue-600">
              {[
                "Certainly! The product is available.",
                "Great news! We can help with that.",
                "I'm here to help you.",
                "Sure! Let me assist you.",
                "+",
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setReply(chip === "+" ? reply : chip)}
                  className="rounded-full border border-blue-200 px-3 py-1 bg-blue-50 hover:bg-blue-100 transition"
                >
                  {chip === "+"
                    ? chip
                    : chip.substring(0, chip.indexOf("!") + 1) + "..."}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ">
              <div className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 flex items-center gap-2 text-[13px] text-slate-500">
                <span className="text-lg">⌨️</span>
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Write message..."
                />
              </div>
              <button
                onClick={sendReply}
                className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
