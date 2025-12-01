"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Mail,
  MessageCircle,
  CreditCard,
  Clock,
  Bell,
  HelpCircle,
  HeadphonesIcon,
  ChevronDown,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, rdb } from "@/lib/firebase";
import { ref, onValue, update } from "firebase/database";
import Loader from "@/components/ui/Loader";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Blogs", href: "/dashboard/blogs", icon: FileText },
  { label: "Bookings", href: "/dashboard/bookings", icon: FileText },
  { label: "Tasks", href: "/dashboard/tasks", icon: ListChecks },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Leads", href: "/dashboard/leads", icon: Mail },
  { label: "Chats", href: "/dashboard/chats", icon: MessageCircle },
  { label: "Billing", href: "#", icon: CreditCard },
  { label: "History", href: "#", icon: Clock },
  { label: "Notification", href: "#", icon: Bell },
];

type Notif = {
  id: string;
  title: string;
  desc: string;
  createdAt?: number;
  unread: boolean;
  type?: "chat" | "get_quote" | "contact_us";
  refPath?: string;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();

  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // ✅ Notifications from RTDB
  const [notifications, setNotifications] = useState<Notif[]>([]);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (notifRef.current && !notifRef.current.contains(target)) {
        setOpenNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setOpenProfile(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenNotif(false);
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // ✅ Listen to /notifications
  useEffect(() => {
    const nRef = ref(rdb, "notifications");

    const unsub = onValue(nRef, (snap) => {
      const val = snap.val() as Record<string, any> | null;

      if (!val) {
        setNotifications([]);
        return;
      }

      const rows: Notif[] = Object.entries(val).map(([id, item]) => ({
        id,
        ...item,
      }));

      rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setNotifications(rows);
    });

    return () => unsub();
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // ✅ NEW: sidebar badge counts
  const unreadChatsCount = notifications.filter(
    (n) => n.unread && n.type === "chat"
  ).length;

  const unreadLeadsCount = notifications.filter(
    (n) => n.unread && (n.type === "get_quote" || n.type === "contact_us")
  ).length;

  return (
    <ProtectedRoute>
      <div className="h-screen w-screen overflow-hidden bg-[#F3F3F3] text-slate-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#F3F3F3] border-r border-slate-200 flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100">
            <img src="/assets/images/logo/logo.png" alt="" className="h-10" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-[#3DD3CE]">
                SalesTaxCorp
              </span>
            </div>
          </div>

          {/* Main menu */}
          <nav className="bg-[#F3F3F3] mt-4 flex-1 px-3 space-y-1 overflow-y-auto">
            {menuItems.map(({ label, href, icon: Icon }) => {
              // ✅ attach badge only for Chats + Leads
              const badge =
                label === "Chats"
                  ? unreadChatsCount
                  : label === "Leads"
                  ? unreadLeadsCount
                  : 0;

              return (
                <Link key={label} href={href}>
                  <div
                    className={`
                      flex items-center justify-between rounded-xl px-3 py-3 text-sm cursor-pointer
                      hover:bg-emerald-50 hover:text-emerald-700 transition
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{label}</span>
                    </div>

                    {/* ✅ BADGE (same UI you had commented out) */}
                    {badge > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center min-w-8 h-8 text-[11px] text-[#737376] rounded-full border border-[#737376]">
                        {badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Support section */}
          <div className="px-4 py-4 border-t border-slate-100 space-y-2">
            <p className="text-[11px] font-medium text-slate-400">SUPPORT</p>
            <button className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-slate-50 text-slate-600">
              <HelpCircle className="w-4 h-4" />
              Q&amp;A
            </button>
            <button className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-slate-50 text-slate-600">
              <HeadphonesIcon className="w-4 h-4" />
              Support
            </button>
          </div>
        </aside>

        {/* Right side */}
        <div className="mt-5 flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-20 flex items-center justify-between px-8">
            {/* Search */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center justify-between w-full max-w-full rounded-xl bg-white px-5 py-2 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 text-slate-700"
                    placeholder="Search Chats"
                  />
                </div>
                <div className="flex items-center gap-3 pl-4 ml-4 border-l border-slate-200">
                  <span className="text-xs text-slate-400 cursor-pointer">
                    Filter
                  </span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6 ml-6 relative">
              {/* Notifications */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => {
                    setOpenNotif((v) => !v);
                    setOpenProfile(false);
                  }}
                  className="relative p-1 rounded-full hover:bg-white/70 transition"
                  aria-haspopup="menu"
                  aria-expanded={openNotif}
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {unreadCount > 0 && (
                    <>
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-white" />
                      <span className="sr-only">
                        {unreadCount} unread notifications
                      </span>
                    </>
                  )}
                </button>

                {openNotif && (
                  <div
                    className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        Notifications
                      </p>
                      <button
                        className="text-xs text-emerald-600 hover:underline"
                        onClick={async () => {
                          const updatesObj: any = {};
                          notifications.forEach((n) => {
                            if (n.unread) {
                              updatesObj[`notifications/${n.id}/unread`] =
                                false;
                            }
                          });
                          await update(ref(rdb), updatesObj);
                        }}
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 flex gap-3 border-b border-slate-50 hover:bg-slate-50 transition ${
                            n.unread ? "bg-emerald-50/40" : ""
                          }`}
                          role="menuitem"
                        >
                          <div
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                              n.unread ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-500">{n.desc}</p>
                            <p className="text-[11px] text-slate-400 mt-1">
                              {n.createdAt
                                ? new Date(n.createdAt).toLocaleString()
                                : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/dashboard/notifications"
                      className="block px-4 py-3 text-center text-sm text-emerald-700 hover:bg-slate-50"
                    >
                      View all
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => {
                    setOpenProfile((v) => !v);
                    setOpenNotif(false);
                  }}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/70 transition"
                  aria-haspopup="menu"
                  aria-expanded={openProfile}
                >
                  <div className="h-9 w-9 rounded-full bg-slate-200" />
                  <span className="text-sm font-medium text-slate-800">
                    Manzoor Elahi
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {openProfile && (
                  <div
                    className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden"
                    role="menu"
                  >
                    <div className="px-4 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-slate-200" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Manzoor Elahi
                          </p>
                          <p className="text-xs text-slate-500">
                            manzoor@salescorp.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard/profile"
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        role="menuitem"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        role="menuitem"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 py-2">
                      <button
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        role="menuitem"
                        onClick={async () => {
                          await signOut(auth);
                          router.replace("/login");
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          {/* Main content */}
          <main className="flex-1 px-4 pt-3 min-h-0">
            <div className="w-full h-full overflow-hidden flex flex-col">
              <Suspense
                fallback={
                  <div className="flex-1 flex items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
