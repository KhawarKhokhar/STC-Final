"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  Code,
  Crown,
  FileText,
  Folder,
  FolderPlus,
  Image,
  LayoutGrid,
  LibraryBig,
  Lightbulb,
  LucideIcon,
  MessageCircleMore,
  MessageCirclePlus,
  MessageSquare,
  Mic,
  Paperclip,
  Settings2,
} from "lucide-react";
import Link from "next/link";

// Types
interface QA {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
}

interface CardProps {
  icon: LucideIcon;
  action: string;
  title: string;
  description: string;
}

// Cards
const cardsData = [
  {
    icon: Image,
    action: "Create image",
    title: "What is Nexus?",
    description: "Create high-quality images instantly from text.",
  },
  {
    icon: FileText,
    action: "Make Slides",
    title: "What is Sales Tax?",
    description: "Turn ideas into engaging, professional presentations.",
  },
  {
    icon: Code,
    action: "Generate Code",
    title: "Contact Real life Assistant",
    description: "Generate clean, production ready code in seconds.",
  },
];

// Scoring
function scoreQA(q: string, item: QA) {
  const hay = (item.question + " " + (item.tags || []).join(" ")).toLowerCase();
  const qw = q.toLowerCase().split(/\s+/).filter(Boolean);
  let s = 0;
  qw.forEach((w) => hay.includes(w) && (s += 2));
  if (item.question.toLowerCase().includes(q.toLowerCase())) s += 4;
  return s;
}

// Component
export default function StcAIDashboard({
  faqUrl = "/Data/chatbot-faq.json",
}: {
  faqUrl?: string;
}) {
  const [faqs, setFaqs] = useState<QA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "bot" | "me"; text: string }[]
  >([{ from: "bot", text: "Ask me your tax-related query." }]);

  // Load FAQ
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const tries = [faqUrl, "/data/chatbot-faq.json"];
        let got: QA[] | null = null;

        for (const u of tries) {
          try {
            const r = await fetch(u);
            if (!r.ok) continue;
            const d = await r.json();
            const arr: QA[] = (d.chatbotFaq || d.faq || d) as QA[];
            if (Array.isArray(arr) && arr.length) {
              got = arr;
              break;
            }
          } catch {}
        }

        if (!mounted) return;
        if (got) setFaqs(got);
        else setError("FAQ file not found.");
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to load FAQ");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [faqUrl]);

  const suggestions = useMemo(
    () =>
      input
        ? [...faqs]
            .sort((a, b) => scoreQA(input, b) - scoreQA(input, a))
            .slice(0, 6)
        : faqs.slice(0, 6),
    [faqs, input]
  );

  function answerFromFaq(q: string) {
    const top = [...faqs].sort((a, b) => scoreQA(q, b) - scoreQA(q, a))[0];
    if (top && scoreQA(q, top) > 0) return top.answer;
    return "I couldn't find a match. Try rephrasing.";
  }

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "me", text },
      { from: "bot", text: answerFromFaq(text) },
    ]);
    setInput("");
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0b1111] text-[#e9ecec]">
      <div className="grid grid-cols-12 gap-4 h-full p-4 md:p-6 mx-auto">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3 h-full rounded-2xl bg-[#0c1212] p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="h-9 w-9 rounded-lg bg-[#162525] grid place-items-center">
              🤖
            </div>
            STC AI
          </div>

          <nav className="">
            <SidebarItem label="New Chat" icon={MessageCirclePlus} active />
          </nav>

          <div className="text-md uppercase tracking-wider text-[#92a3a3]">
            Features
          </div>
          <nav className="">
            <SidebarItem label="Chat" icon={MessageCircleMore} />
            <SidebarItem label="Archived" icon={Archive} />
            <SidebarItem label="Library" icon={LibraryBig}/>
          </nav>

          <div className="mt-4 text-md uppercase tracking-wider text-[#92a3a3]">
            Workspaces
          </div>
          <nav className="">
            <SidebarItem label="New Project" icon={FolderPlus} />
            <SidebarItem label="Nexys" icon={Folder}/>
            <SidebarItem label="Presentation" icon={Folder} />
            <SidebarItem label="Riset" icon={Folder} />
            <SidebarItem label="Sales Tax" icon={Folder}/>
          </nav>

          {/* Upgrade Box */}
          <div className="mt-6 h-60 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#123232] p-4 border border-[#1d3b3b]">
            <div className="bg-[#FFE9D2] rounded-full p-3">
              <Crown size={18} color="#6410CA" />
            </div>
            <div className="text-sm font-medium">Upgrade to premium</div>
            <p className="text-xs text-[#9eb0b0] text-center">
              Boost productivity with automation and responsive AI.
            </p>
            <button className="mt-3 w-60 rounded-xl bg-[#FFE9D2] text-black font-semibold py-2">
              Upgrade
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 lg:col-span-9 h-full rounded-3xl bg-[linear-gradient(25deg,#0D080E_0%,#0D080E_50%,#147976_100%)] border border-[#1a2323] p-5 md:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Drop label="ChatGPT v4.0" />
            <div className="flex items-center gap-2">
              <GhostButton>Configuration</GhostButton>
              <GhostButton>Export</GhostButton>
              <Link href="/">
                <GhostButton>Home</GhostButton>
              </Link>
            </div>
          </div>

          {/* Title */}
          <div className="mt-10 mb-8 grid place-items-center">
            <div className="h-20 w-20 rounded-full bg-[#C4C4C4] shadow-inner" />
            <h1 className="mt-6 text-center text-xl md:text-3xl text-[#e7f5f4]">
              Ask Me Your Tax Related Query?
            </h1>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-3 justify-start">
            <Chip>
              <Image className="w-5 h-5" />
              Create Image
            </Chip>
            <Chip>
              <Lightbulb className="w-5 h-5" />
              Brainstorm
            </Chip>
            <Chip>
              <FileText className="w-5 h-5" />
              Make a plan
            </Chip>
          </div>

          {/* Input Box */}
          <div
            className="relative w-full text-white bg-[#06201f] shadow-xl rounded-2xl overflow-hidden
            border-t-[2px] border-t-[#3DD3CE]
            border-b-[2px] border-b-[#292929]
            border-l-0 border-r-0
            before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-[2px]
            before:bg-gradient-to-b before:from-[#3DD3CE] before:to-[#292929]
            after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-[2px]
            after:bg-gradient-to-b after:from-[#3DD3CE] after:to-[#292929]"
          >
            <div className="rounded-xl m-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="✨ Ask Anything..."
                className="w-full h-20 bg-transparent outline-none text-[#e9f7f6] placeholder:text-[#7aa1a1] text-lg"
              />
            </div>

            <div className="flex items-center justify-between p-6 text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <Paperclip className="w-5 h-5" /> Attach
                </span>
                <span>|</span>
                <span className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5" /> Settings
                </span>
                <span>|</span>
                <span className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" /> Options
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button className="h-12 w-12 rounded-full bg-[#2D2930] grid place-items-center">
                  <Mic color="white" />
                </button>
                <button
                  onClick={() => send(input)}
                  className="h-12 w-12 rounded-full bg-linear-to-r from-[#072120] to-[#3DD3CE] text-white text-2xl grid place-items-center"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            {cardsData.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>

          
        </main>
      </div>
    </div>
  );
}

/* ————— UI Components ————— */

function SidebarItem({
  label,
  active,
  icon: Icon,   // 👈 add this
}: {
  label: string;
  active?: boolean;
  icon?: LucideIcon; // 👈 optional Lucide icon
}) {
  return (
    <div
      className={`w-full rounded-xl px-3 py-2 text-lg flex items-center gap-2
        ${
          active
            ? "bg-[#131d1d] text-[#e7f5f4] border border-[#1a2323]"
            : "text-[#a2b7b7] hover:text-[#e7f5f4]"
        }`}
    >
      {/* Only show icon if passed */}
      {Icon && <Icon className="w-4 h-4" />}

      {label}
    </div>
  );
}

function Drop({ label }: { label: string }) {
  return (
    <button className="rounded-full px-3 py-1.5 text-sm bg-[#0f1a1a] border border-[#1a2323] shadow-inner">
      {label} ▾
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-xl px-3 py-1.5 text-sm bg-[#0f1a1a] border border-[#1a2323] text-[#c4e1e1] cursor-pointer hover:border-[#254a4a]">
      {children}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex gap-2 items-center rounded-full px-5 py-3 text-sm bg-black border-2 border-[#242424] text-[#c4e1e1] mb-4">
      {children}
    </span>
  );
}

const Card: React.FC<CardProps> = ({ icon: Icon, action, title, description }) => (
  <div className="p-6 rounded-2xl bg-[#000000] border-2 border-[#292929] shadow-xl transition hover:border-[#3DD3CE]">
    <div className="flex items-center justify-between mb-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D2930]">
        <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
      </div>
      <button className="px-4 py-2.5 text-xs font-medium rounded-full bg-[rgba(255,255,255,0.1)] text-white hover:bg-white/20 transition">
        {action}
      </button>
    </div>

    <h3 className="text-lg text-white my-8">{title}</h3>
    <p className="text-md text-gray-400">{description}</p>
  </div>
);
