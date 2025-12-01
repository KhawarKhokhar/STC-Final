"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  FileText,
  Mail,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EditorState } from "draft-js";

// Draft.js Editor dynamically imported to avoid SSR issues
const DraftEditor = dynamic(
  () => import("draft-js").then((mod) => mod.Editor),
  { ssr: false }
);

const folderIconMap: Record<string, LucideIcon> = {
  inbox: Mail,
  send: Send,
  draft: FileText,
  archive: Archive,
  star: Star,
  spam: AlertTriangle,
  trash: Trash2,
};

/* ---------- Types (match emails.json) ---------- */

interface EmailStats {
  newEmails: number;
  unreadEmails: number;
  spam: number;
  important: number;
}

interface FolderItem {
  id: string;
  label: string;
  icon?: string;
  isDefault?: boolean;
}

interface FriendItem {
  id: string;
  name: string;
  email: string;
  online: boolean;
}

interface EmailItem {
  id: string;
  folderId: string;
  fromName: string;
  fromEmail: string;
  to: string[];
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachments: boolean;
  accent: string | null;
  badgeLetter: string | null;
}

interface EmailData {
  stats: EmailStats;
  folders: FolderItem[];
  friends: FriendItem[];
  emails: EmailItem[];
}

type Mode = "list" | "detail" | "compose";

const statCardConfig = (stats: EmailStats) =>
  [
    {
      key: "newEmails",
      label: "New Emails",
      value: stats.newEmails,
      colorFrom: "#F5D5FF",
      colorTo: "#FEE6F9",
      iconBg: "bg-[#A355FF]",
    },
    {
      key: "unreadEmails",
      label: "Unread Emails",
      value: stats.unreadEmails,
      colorFrom: "#FDE0FF",
      colorTo: "#FFE9F2",
      iconBg: "bg-[#FF4AC8]",
    },
    {
      key: "spam",
      label: "Spam",
      value: stats.spam,
      colorFrom: "#FFE3C4",
      colorTo: "#FFF0D9",
      iconBg: "bg-[#FF9F3C]",
    },
    {
      key: "important",
      label: "Important",
      value: stats.important,
      colorFrom: "#CDE9FF",
      colorTo: "#E5F3FF",
      iconBg: "bg-[#1E9FFF]",
    },
  ] as const;

export default function EmailDashboardPage() {
  const [data, setData] = useState<EmailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState<string>("inbox");
  const [openedEmailId, setOpenedEmailId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("list");

  // compose state
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  // draft-js editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Load JSON once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/emails.json");
        const json = (await res.json()) as EmailData;
        setData(json);
        const defaultFolder =
          json.folders.find((f) => f.isDefault)?.id || "inbox";
        setActiveFolder(defaultFolder);
      } catch (err) {
        console.error("Failed to load emails.json", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helper to update emails array
  function updateEmail(id: string, updates: Partial<EmailItem>) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            emails: prev.emails.map((e) =>
              e.id === id ? { ...e, ...updates } : e
            ),
          }
        : prev
    );
  }

  // Helper to add email (for send / draft)
  function addEmail(newEmail: EmailItem) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            emails: [newEmail, ...prev.emails],
          }
        : prev
    );
  }

  const visibleEmails =
    data?.emails.filter((e) => e.folderId === activeFolder) ?? [];

  const openedEmail = data?.emails.find((e) => e.id === openedEmailId) ?? null;

  /* ---------- Handlers ---------- */

  function handleFolderClick(folderId: string) {
    setActiveFolder(folderId);
    setOpenedEmailId(null);
    setMode("list");
  }

  function handleEmailClick(email: EmailItem) {
    setOpenedEmailId(email.id);
    setMode("detail");
    if (!email.isRead) {
      updateEmail(email.id, { isRead: true });
    }
  }

  function toggleStar(email: EmailItem) {
    updateEmail(email.id, { isStarred: !email.isStarred });
  }

  function openCompose() {
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    setEditorState(EditorState.createEmpty());
    setMode("compose");
    setOpenedEmailId(null);
  }

  function goBackToList() {
    setMode("list");
    setOpenedEmailId(null);
  }

  function handleSend(isDraft: boolean) {
    if (!data) return;

    // derive current body text from the editorState
    const currentContent = editorState.getCurrentContent();
    const bodyText = currentContent.getPlainText();
    const finalBody = bodyText || composeBody; // fallback to composeBody if needed

    const id = `local-${Date.now()}`;
    const now = new Date().toISOString();

    const newEmail: EmailItem = {
      id,
      folderId: isDraft ? "draft" : "sent",
      fromName: "You",
      fromEmail: "you@salescorp.com",
      to: composeTo
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      subject: composeSubject || "(no subject)",
      preview: finalBody.slice(0, 120),
      body: finalBody,
      receivedAt: now,
      isRead: true,
      isStarred: false,
      isImportant: !isDraft,
      hasAttachments: false,
      accent: null,
      badgeLetter: null,
    };

    addEmail(newEmail);

    setActiveFolder(isDraft ? "draft" : "sent");
    setOpenedEmailId(newEmail.id);
    setMode("detail");
  }

  // keep composeBody in sync when typing in Draft.js editor
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    setComposeBody(content.getPlainText());
  };

  if (loading || !data) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#F7F7FB]">
        <div className="text-sm text-slate-500">Loading emails…</div>
      </div>
    );
  }

  const statCards = statCardConfig(data.stats);

  return (
    <div className="max-w-full w-full flex flex-col gap-6">
      {/* Top stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-3xl bg-white p-4 flex items-center gap-4"
          >
            <div
              className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white ${card.iconBg}`}
            >
              <Mail className="w-10 h-10" />
            </div>
            <div
              className="flex-1 h-16 rounded-2xl flex flex-col justify-center px-4"
              style={{}}
            >
              <p className="text-2xl font-semibold text-[#25213B]">
                {card.value}
              </p>
              <p className="text-sm text-[#7E7A9A]">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main row: left sidebar + right content */}
      <div className="flex gap-4 h-[620px]">
        {/* LEFT: email sidebar */}
        <aside className="w-64 p-4 bg-white rounded-2xl flex flex-col">
          <button
            onClick={openCompose}
            className="w-full mt-3 mb-3 rounded-sm bg-[#3DD3CE] text-white text-sm font-semibold py-3 shadow-md"
          >
            + Compose Email
          </button>

          {/* FOLDERS */}
          <div>
            <p className="text-[11px] font-semibold text-[#B0AEC5] tracking-wide mb-3">
              FOLDERS
            </p>
            <nav className="space-y-1">
              {data.folders.map((folder) => {
                const active = folder.id === activeFolder;

                const IconComponent =
                  folder.icon && folderIconMap[folder.icon]
                    ? folderIconMap[folder.icon]
                    : Mail;

                return (
                  <button
                    key={folder.id}
                    onClick={() => handleFolderClick(folder.id)}
                    className={`w-full flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-bold transition ${
                      active
                        ? "bg-[#ffeef0] text-[#08B5A9]"
                        : "text-[#7E7A9A] hover:bg-[#F6F6FB]"
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center">
                      <IconComponent className="w-4 h-4 text-[#5B5678]" />
                    </span>
                    <span>{folder.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Recent friends */}
          {/* <div className="mt-8">
              <p className="text-[11px] font-semibold text-[#B0AEC5] tracking-wide mb-3">
                RECENT FRIENDS
              </p>
              <div className="space-y-3">
                {data.friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 text-xs"
                  >
                    <div className="h-8 w-8 rounded-md bg-[#D8D8E8]" />
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            friend.online ? "bg-[#24C18F]" : "bg-[#C7C5DD]"
                          }`}
                        />
                        <span className="text-[10px] text-[#B0AEC5]">
                          {friend.online ? "Online" : "Offline"}
                        </span>
                      </div>
                      <span className="text-xs text-[#4C4766]">
                        {friend.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
        </aside>

        {/* RIGHT: email area (mode-based) */}
        <section className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
          {/* LIST MODE */}
          {mode === "list" && (
            <>
              {/* Toolbar */}
              <div className="px-5 py-3 border-b border-[#F0EFF7] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#7E7A9A]">
                  <input type="checkbox" className="h-4 w-4 rounded border" />
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-3 text-[#C1BEDA]">
                  <FileText className="w-4 h-4 cursor-pointer" />
                  <Send className="w-4 h-4 cursor-pointer" />
                  <Archive className="w-4 h-4 cursor-pointer" />
                  <Trash2 className="w-4 h-4 cursor-pointer" />
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {visibleEmails.map((mail) => {
                  const accentBorder = mail.accent === "";

                  return (
                    <button
                      key={mail.id}
                      onClick={() => handleEmailClick(mail)}
                      className={`w-full text-left flex items-start gap-3 px-5 py-4 border-b border-[#F3F2FC] ${accentBorder} ${
                        mail.isRead ? "bg-white" : "bg-[#FFFDFE]"
                      } hover:bg-[#F6F6FB] transition`}
                    >
                      {/* Checkbox + avatar square */}
                      <div className="flex items-center gap-6 mt-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer absolute left-0 top-0 h-4 w-4 opacity-0 z-10 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="h-4 w-4 rounded border border-[#D4D2EC] transition-colors duration-150 peer-checked:bg-[#3DD3CE]" />
                          <svg
                            className="absolute left-0.5 top-0.5 h-3 w-3 text-white hidden peer-checked:block z-20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </label>

                        <div className="h-6 w-6 rounded-sm bg-[#D5D4E8]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[12px] text-[#8A88A8]">
                          <div className="flex items-center gap-2">
                            <span>{mail.fromName}</span>
                            <span className="h-1 w-1 rounded-full bg-[#C8C7E2]" />
                            <span>
                              {new Date(mail.receivedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <p
                            className={`text-base font-semibold ${
                              mail.isRead ? "text-[#4B4469]" : "text-[#262046]"
                            }`}
                          >
                            {mail.subject}
                          </p>
                        </div>

                        <p className="mt-1 text-[13px] text-[#9C99B5] line-clamp-2">
                          {mail.preview}
                        </p>
                      </div>

                      {/* Right side icons */}
                      <div className="flex flex-col items-end gap-3 mt-1 text-[#C1BEDA]">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(mail);
                          }}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              mail.isStarred
                                ? "fill-[#FFC138] text-[#FFC138]"
                                : ""
                            }`}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {mail.hasAttachments && (
                            <Paperclip className="w-4 h-4" />
                          )}
                          <MoreVertical className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  );
                })}

                {visibleEmails.length === 0 && (
                  <div className="h-full flex items-center justify-center text-xs text-[#9C99B5]">
                    No emails in this folder.
                  </div>
                )}
              </div>
            </>
          )}

          {/* DETAIL MODE */}
          {mode === "detail" && (
            <div className="flex-1 flex flex-col">
              <div className="px-5 py-3 border-b border-[#F0EFF7] flex items-center justify-between">
                <button
                  onClick={goBackToList}
                  className="flex items-center gap-2 text-xs text-[#7E7A9A] hover:text-[#4C4766]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to emails</span>
                </button>
                <div className="flex items-center gap-3 text-[#C1BEDA]">
                  <Archive className="w-4 h-4 cursor-pointer" />
                  <Trash2 className="w-4 h-4 cursor-pointer" />
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {openedEmail ? (
                  <div className="max-w-2xl">
                    <p className="text-xs text-[#8A88A8] mb-1">
                      From:{" "}
                      <span className="font-medium text-[#3B365C]">
                        {openedEmail.fromName}
                      </span>{" "}
                      &lt;{openedEmail.fromEmail}&gt;
                    </p>
                    <p className="text-xs text-[#8A88A8] mb-1">
                      To: {openedEmail.to.join(", ")}
                    </p>
                    <p className="text-[11px] text-[#B0AEC5] mb-4">
                      {new Date(openedEmail.receivedAt).toLocaleString()}
                    </p>

                    <h2 className="text-lg font-semibold text-[#262046] mb-3">
                      {openedEmail.subject}
                    </h2>

                    <pre className="text-[12px] text-[#5B5678] whitespace-pre-wrap font-sans leading-relaxed">
                      {openedEmail.body}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-[#9C99B5]">
                    No email selected.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COMPOSE MODE */}
          {/* {mode === "compose" && (
              <div className="flex-1 flex flex-col">
                <div className="px-5 py-3 border-b border-[#F0EFF7] flex items-center justify-between">
                  <button
                    onClick={goBackToList}
                    className="flex items-center gap-2 text-xs text-[#7E7A9A] hover:text-[#4C4766]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to emails</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => handleSend(true)}
                      className="px-3 py-1.5 rounded-full border border-[#06C1AE] text-[#06C1AE] hover:bg-[#E6FFFA]"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => handleSend(false)}
                      className="px-4 py-1.5 rounded-full bg-linear-to-r from-[#06C1AE] to-[#05D6C1] text-white flex items-center gap-1 text-xs font-medium"
                    >
                      <Send className="w-3 h-3" />
                      Send
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <div className="max-w-full space-y-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-[#9C99B5]">To</span>
                      <input
                        value={composeTo}
                        onChange={(e) => setComposeTo(e.target.value)}
                        className="flex-1 border-b border-[#E5E4F5] outline-none py-1 text-[#262046] bg-transparent"
                        placeholder="recipient@example.com, another@example.com"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-[#9C99B5]">Subject</span>
                      <input
                        value={composeSubject}
                        onChange={(e) => setComposeSubject(e.target.value)}
                        className="flex-1 border-b border-[#E5E4F5] outline-none py-1 text-[#262046] bg-transparent"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="mt-4">
                        <div className="min-h-[430px] border border-[#E5E4F5] rounded-2xl bg-[#FBFBFF] p-3">
                          <DraftEditor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            placeholder="Write your email…"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
        </section>
      </div>
    </div>
  );
}
