"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  MessageSquare,
  ArrowLeft,
  Search,
  Clock,
  Building2,
  AtSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { ref, onValue } from "firebase/database";
import { rdb } from "@/lib/firebase";

// ---------- Types ----------
type TabKey = "get-quote" | "contact-us";

interface GetQuoteItem {
  id: string;
  name: string;
  email: string;
  company: string;
  inquiry: string;
  privacyAccepted?: boolean;
  createdAt?: number;
}

interface ContactUsItem {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string; // or "inquiry" depending on your form
  createdAt?: number;
}

// ---------- Small UI helpers ----------
const initials = (name = "") =>
  name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "U";

const formatTime = (ms?: number) =>
  ms ? new Date(ms).toLocaleString() : "";

export default function LeadsDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("get-quote");
  const [openedId, setOpenedId] = useState<string | null>(null);

  const [quotes, setQuotes] = useState<GetQuoteItem[]>([]);
  const [contacts, setContacts] = useState<ContactUsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------- RTDB listeners ----------
  useEffect(() => {
    const qRef = ref(rdb, "get_quote");
    const unsub = onValue(qRef, (snap) => {
      const val = snap.val();
      if (!val) return setQuotes([]);

      const rows: GetQuoteItem[] = Object.entries(val).map(
        ([id, item]: any) => ({ id, ...item })
      );
      rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setQuotes(rows);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const cRef = ref(rdb, "contact_us");
    const unsub = onValue(cRef, (snap) => {
      const val = snap.val();
      if (!val) return setContacts([]);

      const rows: ContactUsItem[] = Object.entries(val).map(
        ([id, item]: any) => ({ id, ...item })
      );
      rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setContacts(rows);
    });

    return () => unsub();
  }, []);

  // ---------- Derived data ----------
  const activeList = activeTab === "get-quote" ? quotes : contacts;

  const filteredList = useMemo(() => {
    const t = searchTerm.toLowerCase().trim();
    if (!t) return activeList;

    return activeList.filter((item: any) => {
      const hay =
        `${item.name} ${item.email} ${item.company || ""} ${item.subject || ""} ${item.inquiry || item.message || ""}`.toLowerCase();
      return hay.includes(t);
    });
  }, [activeList, searchTerm]);

  const openedItem =
    activeList.find((x) => x.id === openedId) || null;

  function openDetail(id: string) {
    setOpenedId(id);
  }

  function goBack() {
    setOpenedId(null);
  }

  // ---------- UI ----------
  return (
    <div className="w-full flex h-full gap-4">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 shrink-0 p-4 flex flex-col ">
        <h2 className="text-lg font-semibold text-[#1f1b3a] mb-4">
          Leads Inbox
        </h2>
        <div className="my-5 relative">
          <Search className="w-4 h-4 text-[#9c99b5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === "get-quote" ? "quotes" : "contacts"}...`}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#ebeaf6] bg-[#fbfbff] outline-none focus:ring-2 focus:ring-[#c8c3ff]"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              setActiveTab("get-quote");
              setOpenedId(null);
            }}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold transition
              ${
                activeTab === "get-quote"
                  ? "bg-[#f3f0ff] text-[#3DD3CE] shadow-[inset_0_0_0_1px_rgba(91,61,245,0.15)]"
                  : "hover:bg-[#f7f7fb] text-[#5b5678]"
              }
            `}
          >
            <Mail className="w-3 h-3" />
            Get Quote
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-black/5">
              {quotes.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("contact-us");
              setOpenedId(null);
            }}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold transition
              ${
                activeTab === "contact-us"
                  ? "bg-[#e8fbf9] text-[#0a9c93] shadow-[inset_0_0_0_1px_rgba(10,156,147,0.15)]"
                  : "hover:bg-[#f7f7fb] text-[#5b5678]"
              }
            `}
          >
            <MessageSquare className="w-3 h-3" />
            Contact Us
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-black/5">
              {contacts.length}
            </span>
          </button>
        </div>

        
      </aside>

      {/* RIGHT PANEL */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#f1f0f7] flex items-center ">
           <div className="px-6 py-4 flex items-center gap-2">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-md text-[#7E7A9A] hover:text-[#262046]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          
          <div>
            <h3 className="text-base font-semibold text-[#1f1b3a]">
              {activeTab === "get-quote" ? "Get Quote Requests" : "Contact Us Messages"}
            </h3>
            <p className="text-xs text-[#8a88a8] mt-0.5">
              {filteredList.length} results
            </p>
          </div>
        </div>

        {/* Content */}
        {openedId === null ? (
          // -------- LIST VIEW --------
          <div className="flex-1 overflow-y-auto">
            {filteredList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="h-12 w-12 rounded-2xl bg-[#f3f2fc] flex items-center justify-center mb-3">
                  {activeTab === "get-quote" ? (
                    <Mail className="w-6 h-6 text-[#7e7a9a]" />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-[#7e7a9a]" />
                  )}
                </div>
                <p className="text-sm font-semibold text-[#262046]">
                  No submissions yet
                </p>
                <p className="text-xs text-[#9c99b5] mt-1">
                  New responses will appear here automatically.
                </p>
              </div>
            ) : (
              filteredList.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => openDetail(item.id)}
                  className="w-full text-left px-6 py-4 border-b border-[#f5f4fb] hover:bg-[#fafafe] transition"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-[#ecebff] text-[#3DD3CE] font-bold flex items-center justify-center">
                      {initials(item.name)}
                    </div>

                    {/* Main */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#262046] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#8a88a8] truncate">
                            {item.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#8a88a8] shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(item.createdAt)}
                        </div>
                      </div>

                      {/* Meta line */}
                      {activeTab === "get-quote" && item.company && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-[#5b5678]">
                          <Building2 className="w-3.5 h-3.5" />
                          <span className="truncate">{item.company}</span>
                        </div>
                      )}

                      {/* Preview */}
                      <p className="mt-2 text-[13px] text-[#9c99b5] line-clamp-2">
                        {item.inquiry || item.message}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          // -------- DETAIL VIEW --------
          <div className="flex-1 overflow-y-auto">
            

            {!openedItem ? (
              <div className="p-6 text-sm text-[#9c99b5]">
                No item selected.
              </div>
            ) : (
              <div className="p-6 max-w-full space-y-5">
                {/* Header Card */}
                <div className="rounded-2xl border border-[#f1f0f7] p-5 flex items-start gap-4">
                  {/* <div className="h-14 w-14 rounded-2xl bg-[#ecebff] text-[#4a38ef] font-bold flex items-center justify-center text-lg">
                    {initials(openedItem.name)}
                  </div> */}

                  <div className="flex-1">
                    <p className="text-xl capitalize font-semibold text-[#262046]">
                      {openedItem.name}
                    </p>
                    <div className="mt-1 flex flex-col gap-3 text-xs text-[#6f6a8a]">
                      <span className="inline-flex items-center gap-1">
                        <ChevronLeft className="w-3.5 h-3.5" />
                        {openedItem.email}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      {activeTab === "get-quote" && (openedItem as any).company && (
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {(openedItem as any).company}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(openedItem.createdAt)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2 py-1 rounded-full ${
                      activeTab === "get-quote"
                        ? "bg-[#f3f0ff] text-[#5b3df5]"
                        : "bg-[#e8fbf9] text-[#0a9c93]"
                    }`}
                  >
                    {activeTab === "get-quote" ? "Quote Request" : "Contact Message"}
                  </span>
                </div>

                {/* Message Card */}
                <div className="rounded-2xl p-5">
                  <h4 className="text-2xl font-semibold text-[#262046] mb-2">
                    {activeTab === "get-quote" ? "Inquiry" : "Message"}
                  </h4>

                  <div className="text-xl text-[#4b4469] leading-relaxed whitespace-pre-wrap">
                    {(openedItem as any).inquiry || (openedItem as any).message}
                  </div>

                  {/* {(openedItem as any).privacyAccepted !== undefined && (
                    <div className="mt-8 text-sm text-[#8a88a8]">
                      Privacy Accepted:{" "}
                      <span className="font-semibold text-[#262046]">
                        {(openedItem as any).privacyAccepted ? "Yes" : "No"}
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
