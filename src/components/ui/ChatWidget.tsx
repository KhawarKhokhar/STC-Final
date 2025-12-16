"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, Tag, X, ArrowLeft } from "lucide-react";
import { rdb, auth } from "../../lib/firebase";
import {
  ref,
  push,
  onValue,
  get,
  query as rdbQuery,
  orderByChild,
  equalTo,
  limitToFirst,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

type QA = { id: string; question: string; answer: string; tags?: string[] };

function scoreQA(q: string, item: QA) {
  const hay = (item.question + " " + (item.tags || []).join(" ")).toLowerCase();
  const qw = q.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  qw.forEach((w) => {
    if (hay.includes(w)) score += 2;
  });
  if (item.question.toLowerCase().includes(q.toLowerCase())) score += 4;
  return score;
}

const gradientBG = "linear-gradient(180deg, #c9f0ee 0%, #f2fbfb 100%)";

export type ChatWidgetProProps = {
  faqUrl?: string;
  accent?: string;
};

export default function ChatWidget({
  faqUrl = "/data/chatbot-faq.json",
  accent = "#3DD3CE",
}: ChatWidgetProProps) {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<
    "welcome" | "compose" | "chat" | "history" | "history-empty"
  >("welcome");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [faqs, setFaqs] = useState<QA[]>([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<
    { from: "bot" | "me" | "admin"; text: string; timestamp?: number }[]
  >([]);
  const [askedFaqIds, setAskedFaqIds] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // ✅ NEW: chat status + faq lock flag
  const [chatStatus, setChatStatus] = useState<"bot" | "live" | "closed">("bot");
  const [faqsLocked, setFaqsLocked] = useState(false); 
  // faqsLocked becomes true once support/admin takes over

  useEffect(() => {
    const p = localStorage.getItem("stc-bot:profile");
    if (p) {
      const o = JSON.parse(p);
      setName(o.name || "");
      setEmail(o.email || "");
      setScreen("compose");
    }

    const storedAskedFaqs = localStorage.getItem("stc-bot:askedFaqIds");
    if (storedAskedFaqs) {
      try {
        const parsed = JSON.parse(storedAskedFaqs);
        if (Array.isArray(parsed)) {
          setAskedFaqIds(parsed);
        }
      } catch (e) {
        console.error("Failed to parse asked FAQ IDs", e);
      }
    }

    if (typeof window !== "undefined") {
      if (!auth.currentUser) {
        signInAnonymously(auth)
          .then((cred) => {
            console.log("[ChatWidget] Anonymous sign-in success", cred.user?.uid);
          })
          .catch((err) => {
            console.error("[ChatWidget] Anonymous sign-in error", err);
          });
      }
      console.log(
        "[ChatWidget] RTDB URL:",
        process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
      );
      const unsub = onAuthStateChanged(auth, (u) => {
        console.log("[ChatWidget] onAuthStateChanged ->", u && u.uid);
      });
      return () => unsub();
    }
  }, []);

  async function continueWithProfile() {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email to continue.");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("stc-bot:profile", JSON.stringify({ name, email }));
    setFormError(null);

    try {
      if (!auth.currentUser) {
        console.log("[ChatWidget] Waiting for anonymous authentication...");
        await signInAnonymously(auth);
        console.log("[ChatWidget] Anonymous authentication successful");
      }

      const chatId = await ensureChatDoc();

      try {
        await update(ref(rdb, `chats/${chatId}`), {
          name: name.trim(),
          email: email.trim(),
          lastUpdated: serverTimestamp(),
        });
        console.log("[ChatWidget] Profile updated successfully");
      } catch (err) {
        console.error("[ChatWidget] Failed to update profile:", err);
      }

      console.log("[ChatWidget] Chat doc created successfully");
    } catch (e) {
      console.error("[ChatWidget] Error in continueWithProfile:", e);
      setFormError(
        "We couldn't initialize the chat. Please try again in a moment."
      );
      alert("Failed to initialize chat. Please try again.");
      return;
    }

    setScreen("compose");
  }

  useEffect(() => {
    let mounted = true;
    fetch(faqUrl)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setFaqs((data.chatbotFaq || []) as QA[]);
      })
      .catch(() => setFaqs([]));
    return () => {
      mounted = false;
    };
  }, [faqUrl]);

  const suggestions = useMemo(() => {
    if (!search) return faqs.slice(0, 5);
    return [...faqs]
      .sort((a, b) => scoreQA(search, b) - scoreQA(search, a))
      .slice(0, 5);
  }, [faqs, search]);

  function validatedStartChat(greeting = true) {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email before starting chat.");
      setScreen("welcome");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      setScreen("welcome");
      return;
    }
    setFormError(null);
    startChat(greeting);
  }

  function startChat(greeting = true) {
    const previousProfile = localStorage.getItem("stc-bot:profile");
    if (previousProfile) {
      try {
        const prev = JSON.parse(previousProfile);
        if (prev.email && prev.email !== email) {
          localStorage.removeItem("stc-bot:chatId");
        }
      } catch (e) {}
    }

    localStorage.setItem("stc-bot:profile", JSON.stringify({ name, email }));
    setScreen("chat");

    ensureChatDoc()
      .then(async (chatId) => {
        if (greeting) {
          const msgsSnap = await get(ref(rdb, `chats/${chatId}/messages`));
          const hasMessages =
            msgsSnap.exists() &&
            Object.keys(msgsSnap.val() || {}).length > 0;

          if (!hasMessages) {
            try {
              await push(ref(rdb, `chats/${chatId}/messages`), {
                from: "bot",
                text: `Hi ${
                  name || "there"
                }! I'm STC Bot. Ask me anything about pricing, services, or integrations.`,
                createdAt: serverTimestamp(),
              });

              try {
                await update(ref(rdb, `chats/${chatId}`), {
                  lastMessage: `Hi ${
                    name || "there"
                  }! I'm STC Bot. Ask me anything...`,
                  lastUpdated: serverTimestamp(),
                  status: "bot",
                });
              } catch (err) {
                setFormError(
                  "We saved your greeting but couldn't refresh the chat preview. Please continue messaging."
                );
              }
            } catch (err: any) {
              console.error("[ChatWidget] failed to push greeting message", {
                chatId,
                err,
              });
            }
          }
        }
      })
      .catch((e) => {
        console.error("[ChatWidget] ensureChatDoc failed in startChat", e);
      });
  }

  // ✅ UPDATED: bot replies only when FAQs not locked and status bot
  function sendMessage(text: string) {
    if (!text.trim()) return;

    const history: string[] = JSON.parse(
      localStorage.getItem("stc-bot:history") || "[]"
    );
    history.unshift(text);
    localStorage.setItem(
      "stc-bot:history",
      JSON.stringify(history.slice(0, 30))
    );

    setMessages((prev) => [
      ...prev,
      { from: "me", text, timestamp: Date.now() },
    ]);

    const isRequestingHuman =
      text.toLowerCase().includes("human") ||
      text.toLowerCase().includes("support agent") ||
      text.toLowerCase().includes("talk to");

    ensureChatDoc()
      .then(async (chatId) => {
        try {
          await push(ref(rdb, `chats/${chatId}/messages`), {
            from: "me",
            text,
            createdAt: serverTimestamp(),
          });

          if (isRequestingHuman) {
            await update(ref(rdb, `chats/${chatId}`), {
              status: "live",
              lastMessage: text,
              lastUpdated: serverTimestamp(),
            });
          } else {
            await update(ref(rdb, `chats/${chatId}`), {
              lastMessage: text,
              lastUpdated: serverTimestamp(),
            });
          }
        } catch (err: any) {
          console.error("[ChatWidget] failed to push user message", {
            chatId,
            err,
          });
        }

        // ✅ STOP BOT FAQ replies if support started
        if (faqsLocked || chatStatus !== "bot" || isRequestingHuman) {
          return;
        }

        const top = [...faqs].sort(
          (a, b) => scoreQA(text, b) - scoreQA(text, a)
        )[0];
        const hasFaqMatch = top && scoreQA(text, top) > 0;

        if (hasFaqMatch) {
          const reply = top.answer;

          setAskedFaqIds((prev) => {
            const updated = [...prev, top.id];
            localStorage.setItem(
              "stc-bot:askedFaqIds",
              JSON.stringify(updated)
            );
            return updated;
          });

          setIsTyping(true);

          const baseDelay = 1000;
          const readingDelay = Math.min(reply.length * 10, 1500);
          const typingDelay = baseDelay + readingDelay;

          setTimeout(async () => {
            try {
              // ✅ double-check before replying (support might start during delay)
              if (faqsLocked || chatStatus !== "bot") {
                setIsTyping(false);
                return;
              }

              setIsTyping(false);
              await push(ref(rdb, `chats/${chatId}/messages`), {
                from: "bot",
                text: reply,
                createdAt: serverTimestamp(),
              });

              await update(ref(rdb, `chats/${chatId}`), {
                lastMessage: reply,
                lastUpdated: serverTimestamp(),
              });
            } catch (err: any) {
              console.error("[ChatWidget] failed to push bot reply", {
                chatId,
                err,
              });
            }
          }, typingDelay);
        } else {
          setIsTyping(true);
          setTimeout(async () => {
            try {
              setIsTyping(false);
              await update(ref(rdb, `chats/${chatId}`), {
                status: "live",
                lastMessage: text,
                lastUpdated: serverTimestamp(),
              });

              await push(ref(rdb, `chats/${chatId}/messages`), {
                from: "bot",
                text: "I couldn't find an exact answer in the FAQ. A support team member will respond shortly.",
                createdAt: serverTimestamp(),
              });
            } catch (err: any) {
              console.error("[ChatWidget] failed to mark chat as live", {
                chatId,
                err,
              });
            }
          }, 1200);
        }
      })
      .catch((e) => {
        console.error("[ChatWidget] ensureChatDoc failed in sendMessage", e);
      });
  }

  // ✅ UPDATED: FAQ click should still work only when NOT locked
  function askAndAnswer(q: string) {
    if (faqsLocked || chatStatus !== "bot") return;
    startChat(true);
    setTimeout(() => sendMessage(q), 50);
  }

  async function ensureChatDoc(): Promise<string> {
    let chatId = localStorage.getItem("stc-bot:chatId");
    if (chatId) return chatId;

    try {
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          setFormError(
            "We couldn't start a guest chat session. Please retry or check your connection."
          );
          throw e;
        }
      }

      const uid = auth?.currentUser?.uid;
      const chatsRef = ref(rdb, "chats");
      if (uid) {
        const qUid = rdbQuery(
          chatsRef,
          orderByChild("uid"),
          equalTo(uid),
          limitToFirst(1)
        );
        const snapUid = await get(qUid);
        const valUid = snapUid.val();
        if (valUid) {
          const keys = Object.keys(valUid);
          if (keys.length) {
            chatId = keys[0];
            localStorage.setItem("stc-bot:chatId", chatId);
            startListeningToMessages(chatId);
            startListeningToChatStatus(chatId); // ✅ NEW
            return chatId;
          }
        }
      }

      if (email) {
        const q = rdbQuery(
          chatsRef,
          orderByChild("email"),
          equalTo(email),
          limitToFirst(1)
        );
        const snap = await get(q);
        const val = snap.val();
        if (val) {
          const keys = Object.keys(val);
          if (keys.length) {
            chatId = keys[0];
            const existingChat = val[chatId];

            if (name && existingChat.name !== name) {
              await update(ref(rdb, `chats/${chatId}`), {
                name: name,
                lastUpdated: serverTimestamp(),
              });
            }

            if (uid && existingChat.uid !== uid) {
              await update(ref(rdb, `chats/${chatId}`), {
                uid: uid,
              });
            }

            localStorage.setItem("stc-bot:chatId", chatId);
            startListeningToMessages(chatId);
            startListeningToChatStatus(chatId); // ✅ NEW
            return chatId;
          }
        }
      }

      const newRef = push(ref(rdb, "chats"));
      const uidToStore = auth?.currentUser?.uid || null;
      await set(newRef, {
        name:
          name ||
          (uidToStore ? `Guest-${uidToStore.slice(0, 6)}` : "Guest"),
        email: email || "",
        uid: uidToStore,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        status: "bot",
      });
      chatId = newRef.key as string;
      localStorage.setItem("stc-bot:chatId", chatId);

      startListeningToMessages(chatId);
      startListeningToChatStatus(chatId); // ✅ NEW
      return chatId;
  } catch (err) {
    console.error("ensureChatDoc error", err);
    setFormError(
      "We couldn't start the chat session. Please refresh and try again."
    );
    throw err;
  }
}

  // ✅ NEW: Listen to /chats/{id}/status
  let unsubscribeChatStatus: (() => void) | null = null;
  function startListeningToChatStatus(chatId: string) {
    if (unsubscribeChatStatus) unsubscribeChatStatus();

    const chatRef = ref(rdb, `chats/${chatId}`);
    unsubscribeChatStatus = onValue(chatRef, (snap) => {
      const v = snap.val() || {};
      const status = (v.status || "bot") as "bot" | "live" | "closed";
      setChatStatus(status);

      // ✅ once status turns live → lock FAQs permanently for this session
      if (status === "live") setFaqsLocked(true);
    });
  }

  // listen for live message updates for the active chat (RTDB)
  let unsubscribeMessages: (() => void) | null = null;
  function startListeningToMessages(chatId: string) {
    if (unsubscribeMessages) unsubscribeMessages();

    const msgsRef = ref(rdb, `chats/${chatId}/messages`);
    unsubscribeMessages = onValue(msgsRef, (snap) => {
      const v = snap.val() || {};
      const msgs: {
        from: "bot" | "me" | "admin";
        text: string;
        timestamp?: number;
      }[] = Object.keys(v)
        .map((k) => v[k])
        .sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0))
        .map((m: any) => ({
          from: m.from === "me" ? "me" : m.from === "admin" ? "admin" : "bot",
          text: m.text,
          timestamp: m.createdAt,
        }));

      setMessages(msgs);

      // ✅ if admin message appears, lock FAQs too
      const hasAdmin = msgs.some((m) => m.from === "admin");
      if (hasAdmin) setFaqsLocked(true);
    });
  }

  useEffect(() => {
    if (screen === "chat") {
      const cid = localStorage.getItem("stc-bot:chatId");
      if (cid) {
        startListeningToMessages(cid);
        startListeningToChatStatus(cid); // ✅ NEW
      }
    }
    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
      if (unsubscribeChatStatus) unsubscribeChatStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const [historyList, setHistoryList] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(
        localStorage.getItem("stc-bot:history") || "[]"
      );
      setHistoryList(Array.isArray(stored) ? stored : []);
    } catch {
      setHistoryList([]);
    }
  }, [open, screen]);

  return (
    <div
      className="fixed bottom-6 right-4 z-50"
      style={{ transform: "scale(.92)", transformOrigin: "bottom right" }}
    >
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={() => {
              setFormError(null);
              setOpen(true);
            }}
            className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
            style={{ background: accent }}
          >
            <MessageCircle />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-80 sm:w-96 rounded-3xl shadow-xl overflow-hidden"
            style={{ background: gradientBG }}
          >
            <Header
              accent={accent}
              screen={screen}
              onClose={() => setOpen(false)}
              onHistory={() =>
                setScreen(historyList.length ? "history" : "history-empty")
              }
              onEdit={() => setScreen("welcome")}
              onBack={() => setScreen("compose")}
            />

            {formError && (
              <div className="mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 flex items-start gap-2">
                <span>{formError}</span>
                <button
                  className="ml-auto text-red-500 hover:text-red-700"
                  onClick={() => setFormError(null)}
                  aria-label="Dismiss error"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {screen === "welcome" && (
                <Welcome
                  key="welcome"
                  name={name}
                  email={email}
                  setName={setName}
                  setEmail={setEmail}
                  onContinue={continueWithProfile}
                />
              )}
              {screen === "compose" && (
                <Compose
                  key="compose"
                  faqs={faqs}
                  query={search}
                  setQuery={setSearch}
                  suggestions={suggestions}
                  onStart={() => validatedStartChat(true)}
                  onPick={(q) => setSearch(q)}
                  onAsk={askAndAnswer}
                />
              )}
              {screen === "chat" && (
                <Chat
                  key="chat"
                  messages={messages}
                  onSend={(t) => sendMessage(t)}
                  remainingFaqs={faqs.filter(
                    (f) => !askedFaqIds.includes(f.id)
                  )}
                  isTyping={isTyping}
                  faqsDisabled={faqsLocked || chatStatus !== "bot"} // ✅ NEW
                />
              )}
              {screen === "history" && (
                <History
                  key="history"
                  items={historyList}
                  onSelect={(q) => {
                    setSearch(q);
                    setScreen("compose");
                  }}
                />
              )}
              {screen === "history-empty" && (
                <HistoryEmpty
                  key="history-empty"
                  onStart={() => setScreen("compose")}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({
  accent,
  screen,
  onClose,
  onHistory,
  onEdit,
  onBack,
}: {
  accent: string;
  screen: string;
  onClose: () => void;
  onHistory: () => void;
  onEdit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="relative py-3 text-center text-slate-800">
      STC BOT
      {screen === "chat" ? (
        <button
          onClick={onBack}
          className="h-10 w-10 absolute left-3 top-3 text-slate-500 bg-white rounded-full hover:text-slate-700 flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
      ) : (
        <button
          onClick={onClose}
          className="h-10 w-10 absolute left-3 top-3 text-slate-500 bg-white rounded-full hover:text-slate-700"
        >
          ✕
        </button>
      )}
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          onClick={onEdit}
          className="rounded-full text-xs px-2 py-1 border"
          style={{ borderColor: accent, color: accent }}
        >
          Edit
        </button>
        <button
          onClick={onHistory}
          className="rounded-full text-xs px-2 py-1 border"
          style={{ borderColor: accent, color: accent }}
        >
          History
        </button>
      </div>
    </div>
  );
}

function Welcome({
  name,
  email,
  setName,
  setEmail,
  onContinue,
}: {
  name: string;
  email: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="px-6 pb-10"
    >
      <div className="flex flex-col items-center gap-2">
        <img src="/robot.png" alt="Robot" />
        <h1 className="flex justify-center items-center gap-2 absolute top-50 left-33 z-50 bg-white rounded-2xl px-5 py-2">
          <Tag size={20} color="#45D9D0" />
          STC BOT
        </h1>
        <h3 className="text-xl text-slate-800">Botloy Ready to Help!</h3>
        <span className="text-xs text-[#3DD3CE] bg-[#d4edf2] px-5 py-2 rounded-full mb-5">
          Welcome
        </span>
      </div>
      <div className="mt-5 space-y-3 bg-white/70 p-4 rounded-2xl shadow-sm">
        <span className="flex text-sm text-slate-600 justify-center">
          Enter Your Details
        </span>
        <label className="block">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full text-xs rounded-full border border-slate-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Name"
          />
        </label>
        <label className="block">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full text-xs rounded-full border border-slate-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Email"
          />
        </label>
        <button
          onClick={onContinue}
          className="w-full rounded-full bg-[#45D9D0] hover:bg-teal-500 text-white py-2"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}

function Compose({
  faqs,
  query,
  setQuery,
  suggestions,
  onStart,
  onPick,
  onAsk,
}: {
  faqs: QA[];
  query: string;
  setQuery: (v: string) => void;
  suggestions: QA[];
  onStart: () => void;
  onPick: (q: string) => void;
  onAsk: (q: string) => void;
}) {
  const [preview, setPreview] = useState<QA | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="px-5 pb-6"
    >
      <div className="flex flex-col items-center gap-2 ">
        <img src="/illustration.png" alt="" className="mt-3 h-30 w-30" />
      </div>
      <div className="bg-white/80 p-4 -mt-15 pt-20 rounded-2xl shadow-sm">
        <h3 className="text-md text-slate-900 text-center">
          Let's Start a Chat
          <br /> With STC Bot!
        </h3>

        <div className="mt-5 bg-white/80 p-3 rounded-2xl max-h-56 overflow-y-auto">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="border-b last:border-b-0 border-slate-200 py-2"
            >
              <button
                onClick={() => onAsk(f.question)}
                className="text-left w-full text-xs text-slate-800 hover:underline"
              >
                {f.question}
              </button>

              {preview?.id === f.id && (
                <div className="mt-2 text-sm text-slate-700">
                  {f.answer}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => onAsk(f.question)}
                      className="text-xs rounded-full px-3 py-1 bg-teal-400 text-white"
                    >
                      Send to chat
                    </button>
                    <button
                      onClick={() => setPreview(null)}
                      className="text-xs rounded-full px-3 py-1 border"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Any Question"
          className="w-full h-22 rounded-2xl mt-3 border border-slate-300 px-4 py-3 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="mt-4">
          <button
            onClick={onStart}
            className="w-full rounded-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3"
          >
            Start Chat
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Chat({
  messages,
  onSend,
  remainingFaqs,
  isTyping,
  faqsDisabled,
}: {
  messages: { from: "bot" | "me" | "admin"; text: string; timestamp?: number }[];
  onSend: (t: string) => void;
  remainingFaqs: QA[];
  isTyping?: boolean;
  faqsDisabled?: boolean; // ✅ NEW
}) {
  const [text, setText] = useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="flex flex-col h-154 m-4 rounded-2xl overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="space-y-1">
            <div
              className={`flex items-end gap-2 ${
                m.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {(m.from === "bot" || m.from === "admin") && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 shadow-sm">
                  {m.from === "admin" ? (
                    <span className="text-xs font-semibold">S</span>
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  m.from === "me"
                    ? "bg-linear-to-r from-[#45A3D9] to-[#45D9D0] text-white"
                    : m.from === "admin"
                    ? "bg-blue-50 text-slate-800 border border-blue-200"
                    : "bg-white text-slate-700"
                }`}
              >
                {m.from === "admin" && (
                  <div className="text-xs font-semibold text-blue-600 mb-1">
                    Support Team
                  </div>
                )}
                {m.text}
              </div>

              {m.from === "me" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-[#45A3D9] to-[#45D9D0] text-white text-xs font-semibold shadow-sm">
                  Me
                </div>
              )}
            </div>
            {m.timestamp && (
              <div
                className={`text-[10px] text-slate-400 px-10 ${
                  m.from === "me" ? "text-right" : "text-left"
                }`}
              >
                {formatTime(m.timestamp)}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-white text-slate-700 rounded-2xl px-4 py-2.5 text-sm shadow-sm border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
                <span className="text-xs text-slate-500">
                  STC Bot is typing...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ FAQs disabled automatically when support starts */}
      {remainingFaqs.length > 0 && (
        <div className="shrink-0 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-3 py-2 max-h-24 overflow-y-auto">
          <p className="text-[10px] text-slate-500 mb-1.5">
            Other questions you can ask:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {remainingFaqs.map((faq) => (
              <button
                key={faq.id}
                disabled={faqsDisabled}
                onClick={() => onSend(faq.question)}
                className={`text-[10px] rounded-full px-2.5 py-1 border border-slate-300 bg-white hover:bg-slate-50 text-left ${
                  faqsDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim() === "") return;
          onSend(text);
          setText("");
        }}
        className="shrink-0 border-t border-slate-200 p-3 flex items-center gap-2 bg-white"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="rounded-full bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 font-semibold text-sm"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
}

function History({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (q: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="px-4 pb-6"
    >
      <div className="bg-white/80 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-teal-300 grid place-items-center text-white">
            💬
          </div>
          <div className="font-semibold">Chat History</div>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(it)}
              className="w-full text-left rounded-xl border px-3 py-2 text-sm hover:bg-white"
            >
              {it}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HistoryEmpty({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="px-4 pb-6"
    >
      <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
        <div className="mx-auto h-24 w-24 rounded-full border-2 border-teal-300 bg-white/60 grid place-items-center text-3xl">
          💬
        </div>
        <h4 className="mt-4 text-xl font-semibold">
          Oops.. No Chat History with Botloy
        </h4>
        <p className="mt-2 text-sm text-slate-600">
          We noticed there is currently no chat history in your account. Start a
          new conversation with STC Bot to see it here.
        </p>
        <button
          onClick={onStart}
          className="mt-4 w-full rounded-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2"
        >
          Start Chat
        </button>
      </div>
    </motion.div>
  );
}
