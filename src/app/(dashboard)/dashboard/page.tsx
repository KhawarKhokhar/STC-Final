"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BarChart3,
  Calendar,
  CheckCircle2,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { loadTasksBoardV2 } from "@/lib/tasks";
import { listBlogs } from "@/lib/blogs";
import { get, ref } from "firebase/database";
import { rdb } from "@/lib/firebase";

type AgendaItem = { time: string; title: string; owner: string };
type NotificationItem = { title: string; meta: string };

export default function DashboardHomePage() {
  const [loading, setLoading] = useState(true);
  const [tasksCount, setTasksCount] = useState(0);
  const [inReview, setInReview] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [publishedBlogs, setPublishedBlogs] = useState(0);
  const [alerts, setAlerts] = useState<NotificationItem[]>([]);
  const notifications: NotificationItem[] = alerts;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [board, blogsSnap, notifSnap] = await Promise.all([
          loadTasksBoardV2().catch(() => null),
          listBlogs(true).catch(() => []),
          get(ref(rdb, "notifications")).catch(() => null),
        ]);

        if (!mounted) return;

        if (board) {
          const total = Object.values(board).reduce(
            (acc, arr: any) => acc + (Array.isArray(arr) ? arr.length : 0),
            0
          );
          setTasksCount(total);
          setInReview((board as any)?.review?.length || 0);
        }

        if (blogsSnap) {
          setBlogsCount(blogsSnap.length);
          setPublishedBlogs(blogsSnap.filter((b: any) => b.published).length);
        }

        if (notifSnap?.exists()) {
          const val = notifSnap.val() as Record<string, any>;
          const mapped = Object.values(val)
            .map((n: any) => ({
              title: n.title || n.type || "Notification",
              meta: n.createdAt
                ? new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "",
            }))
            .slice(-5)
            .reverse();
          setAlerts(mapped);
        }
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const kpis = useMemo(
    () => [
      {
        title: "Open Tasks",
        value: loading ? "…" : tasksCount.toString(),
        delta: loading ? "loading" : `${inReview} in review`,
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
      {
        title: "Published Blogs",
        value: loading ? "…" : publishedBlogs.toString(),
        delta: loading ? "loading" : `${blogsCount} total`,
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Team Members",
        value: "18",
        delta: "active",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "New Messages",
        value: "9",
        delta: "2 unread",
        icon: <MessageSquare className="h-5 w-5" />,
      },
    ],
    [loading, tasksCount, inReview, blogsCount, publishedBlogs]
  );

  const agenda: AgendaItem[] = [
    { time: "09:30 AM", title: "Sprint stand-up", owner: "Product" },
    { time: "11:00 AM", title: "Client review — Atlas", owner: "Sales" },
    { time: "02:00 PM", title: "Design handoff", owner: "Design" },
    { time: "04:30 PM", title: "Billing review", owner: "Finance" },
  ];

  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full px-6 py-8 space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[260px]">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-[0.2em]">
                Welcome back
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                Monday overview
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Track KPIs, tasks, and team signals in one glance. Keep momentum by pinning today’s priorities.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                  Create Task
                </button>
                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  View Calendar
                </button>
              </div>
            </div>
            <div className="relative hidden min-w-[240px] flex-1 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-6 text-white md:block">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.15em] text-white/80">Focus</p>
                  <p className="mt-2 text-3xl font-semibold">Ship the dashboard</p>
                  <p className="mt-2 text-sm text-white/80">Align design + dev for Wednesday’s demo.</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-white/70">Completion</p>
                  <p className="text-lg font-semibold">68%</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-white/70">ETA</p>
                  <p className="text-lg font-semibold">2d</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <article
              key={k.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
                {k.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k.title}</p>
                <p className="text-xl font-semibold text-slate-900">{k.value}</p>
                <p className="text-xs text-teal-600">{k.delta}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Charts + Agenda */}
        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Performance</p>
                <h3 className="text-lg font-semibold text-slate-900">Pipeline & Velocity</h3>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <BarChart3 className="h-4 w-4" /> Export
              </button>
            </div>
            <div className="mt-4 h-64 w-full rounded-xl bg-gradient-to-b from-slate-50 to-white border border-dashed border-slate-200 grid place-items-center text-slate-400 text-sm">
              Chart placeholder (connect your analytics)
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today</p>
                <h3 className="text-lg font-semibold text-slate-900">Agenda</h3>
              </div>
            </div>
            <div className="space-y-3">
              {agenda.map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-900">
                    {item.time}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.owner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications + Actions */}
        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Alerts</p>
                <h3 className="text-lg font-semibold text-slate-900">Recent activity</h3>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-500">No recent alerts.</p>
              ) : (
                notifications.map((n: NotificationItem, idx: number) => (
                  <div key={`${n.title}-${idx}`} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.meta}</p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <FileText className="h-5 w-5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
                  <h3 className="text-base font-semibold text-slate-900">Jump to</h3>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a href="/dashboard/tasks" className="block rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50">
                  View Tasks
                </a>
                <a href="/dashboard/blogs" className="block rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50">
                  Manage Blogs
                </a>
                <a href="/dashboard/notifications" className="block rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50">
                  Notifications
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reminders</p>
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-white">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="text-sm font-semibold">Status meeting tomorrow</p>
                  <p className="text-xs text-white/70">Add agenda items before 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
