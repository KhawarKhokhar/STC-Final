"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck, Loader2, RefreshCw } from "lucide-react";
import { get, ref, update } from "firebase/database";
import { rdb } from "@/lib/firebase";

type NotificationItem = {
  id: string;
  title: string;
  desc?: string;
  type?: string;
  imageUrl?: string;
  createdAt?: number;
  unread?: boolean;
};

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const snap = await get(ref(rdb, "notifications"));
      if (!snap.exists()) {
        setItems([]);
        return;
      }
      const val = snap.val() as Record<string, any>;
      const list = Object.entries(val).map(([id, n]) => ({
        id,
        title: n.title || n.type || "Notification",
        desc: n.desc,
        type: n.type,
        imageUrl: n.imageUrl,
        createdAt: n.createdAt,
        unread: n.unread,
      }));
      // Newest first
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setItems(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const unreadCount = useMemo(() => items.filter((n) => n.unread).length, [items]);

  async function markRead(id: string) {
    try {
      setUpdating(true);
      await update(ref(rdb, `notifications/${id}`), { unread: false });
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    } catch (err) {
      console.error(err);
      setError("Failed to mark as read");
    } finally {
      setUpdating(false);
    }
  }

  async function markAllRead() {
    try {
      setUpdating(true);
      const updates: Record<string, any> = {};
      items.forEach((n) => {
        updates[`${n.id}/unread`] = false;
      });
      await update(ref(rdb, "notifications"), updates);
      setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    } catch (err) {
      console.error(err);
      setError("Failed to mark all as read");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full px-6 py-8 space-y-6">
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">All Activity</h1>
            <p className="text-sm text-slate-500">
              {loading ? "Loading…" : `${items.length} total • ${unreadCount} unread`}
            </p>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={() => markAllRead()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
              disabled={updating || items.length === 0}
            >
              {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
              Mark all read
            </button>
          </div>
        </section>

        <section className="grid gap-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-16 rounded-2xl border border-slate-200 bg-white animate-pulse" />
            ))
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              No notifications yet.
            </div>
          ) : (
            items.map((n) => (
              <article
                key={n.id}
                className={`flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
                  n.unread ? "border-teal-200" : ""
                }`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-white">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">{n.title}</p>
                    {n.unread && (
                      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                        Unread
                      </span>
                    )}
                  </div>
                  {n.desc && <p className="text-xs text-slate-500 line-clamp-2">{n.desc}</p>}
                  <p className="text-[11px] text-slate-400 mt-1">
                    {n.type ? `${n.type} • ` : ""}
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {n.imageUrl ? (
                    <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={n.imageUrl} alt="notif" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  {n.unread && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900"
                      disabled={updating}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
