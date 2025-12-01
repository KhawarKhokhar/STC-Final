"use client";

import {
  MoreHorizontal,
  Search,
  ChevronDown,
  MessageCircleMore,
} from "lucide-react";

// --- Data Interfaces (Unchanged) ---
interface UnreleasedBlog {
  id: number;
  title: string;
}

interface ScheduledBlog {
  id: number;
  title: string;
  category: string;
  volume: string;
}

interface ReadBlog {
  id: number;
  author: string;
  email: string;
}

interface UncompletedBlog {
  id: number;
  title: string;
  status: "Pending" | "Draft";
}

// --- Data (Unchanged) ---
const unreleasedBlogs: UnreleasedBlog[] = [
  { id: 1, title: "AI and Tax Automation" },
  { id: 2, title: "Top 10 Deductions" },
  { id: 3, title: "SMB Sales Tax Survival" },
  { id: 4, title: "Breaking Down Nexus" },
];

const scheduledBlogs: ScheduledBlog[] = [
  {
    id: 1,
    title: "Hacking Growth Break Problem",
    category: "Technology",
    volume: "4 Vol",
  },
  {
    id: 2,
    title: "Making Things Happen",
    category: "Technology",
    volume: "4 Vol",
  },
  {
    id: 3,
    title: "Light is behind the darkness",
    category: "Technology",
    volume: "4 Vol",
  },
  {
    id: 4,
    title: "Tax Changes in 2025",
    category: "Taxation",
    volume: "3 Vol",
  },
];

const readBlogs: ReadBlog[] = [
  {
    id: 1,
    author: "Darlene Robertson",
    email: "tim.jennings@example.com",
  },
  {
    id: 2,
    author: "Marvin McKinney",
    email: "debbie.baker@example.com",
  },
  {
    id: 3,
    author: "Esther Howard",
    email: "deanna.curtis@example.com",
  },
  {
    id: 4,
    author: "Esther Howard",
    email: "deanna.curtis@example.com",
  },
];

const uncompletedBlogs: UncompletedBlog[] = [
  { id: 1, title: "The little Dog", status: "Pending" },
  { id: 2, title: "Sprint: Solve, Test in 5 Days", status: "Pending" },
  { id: 3, title: "Catcher in the Rye", status: "Pending" },
];

// --- Component ---
export default function BlogsDashboardPage() {
  return (
    // Set padding and overall structure
    <div className="h-full w-full bg-[#f1f5f2] overflow-y-auto">
      <div className="max-w-full  py-5 px-6">
        <div className="flex gap-6 items-start">
          {/* LEFT MAIN CONTENT COLUMN (takes up available space) */}
          <div className="flex-1">
            {/* 1. TOP HERO ROW */}
            <div className="flex gap-6">
              {/* Left hero card */}
              <section className="flex-1 px-6 py-9 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Welcome, Manzoor Elahi
                  </h2>
                  <p className="mt-3 text-md text-slate-500 max-w-md">
                    Your most visited blogs are trending. Would
                    <br /> you like to add more blogs?
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 rounded-full bg-[#3DD3CE] text-white text-sm font-medium shadow-sm">
                    Add Blog
                  </button>
                  <button className="px-6 py-3 rounded-full border border-[#3DD3CE] text-[#3DD3CE] text-sm font-medium bg-white">
                    Review Blogs
                  </button>
                </div>
              </section>

              {/* Right hero slider placeholder */}
              <section className="w-[360px] flex flex-col items-center justify-center px-6 py-6">
                <div className="w-full h-42 rounded-2xl bg-[#D9D9D9]" />
                <div className="flex items-center gap-2 mt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                </div>
              </section>
            </div>

            {/* 2. MIDDLE CONTENT ROW (Unreleased and Scheduled Blogs) */}
            <div className="mt-8">
              {/* Unreleased Blogs */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Unreleased Blogs
                  </h3>
                  <button className="text-xs font-medium text-[#00B3AB]">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {unreleasedBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="h-70 rounded-2xl bg-[#D9D9D9]"
                    />
                  ))}
                </div>
              </section>

              {/* Scheduled Blogs */}
              <section className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Scheduled Blogs
                </h3>

                {/* Search + Filter */}
                <div className="w-100 flex items-center gap-3 mb-4">
                  <div className="flex-1 flex items-center rounded-sm bg-white border border-slate-200 px-3 py-2">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      placeholder="Search"
                      className="flex-1 bg-transparent text-xs text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                  <button className="flex items-center gap-1 rounded-sm bg-white border border-slate-200 px-4 py-2 text-xs text-slate-500">
                    Filter
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                {/* List of scheduled blogs */}
                <div className="bg-white rounded-sm shadow-sm divide-y divide-slate-100">
                  {scheduledBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center gap-5">
                        <div className="h-10 w-10 rounded-sm bg-[#D9D9D9]" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {blog.title}
                          </p>
                          <p className="mt-2 text-xs text-slate-400">
                            {blog.category}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        {blog.volume}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN (Starts at the top) */}
          {/* Note: Removed 'self-start h-full' as 'items-start' on the parent is sufficient */}
          <aside className="w-[320px] flex flex-col gap-6">
            {/* Read your blogs */}
            <h3 className="text-lg font-semibold text-slate-900">
              Read your blogs
            </h3>
            <section className="px-2">
              <div className="space-y-3">
                {readBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-sm bg-[#D9D9D9]" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.author}
                        </p>
                        <p className="text-[12px] text-slate-400">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center justify-center text-slate-400">
                      <MessageCircleMore className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Uncompleted Blogs */}
            <h3 className="text-lg font-semibold text-slate-900">
              Uncompleted Blogs
            </h3>
            <section className="px-2 flex-1">
              <div className="space-y-3">
                {uncompletedBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center gap-6 rounded-2xl px-3 py-1"
                  >
                    <div className="h-24 w-16 rounded-xl bg-[#D9D9D9] shrink-0" />
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-slate-900">
                        {blog.title}
                      </p>
                      <p className="mt-1 text-[20px] text-[#14213D]">
                        {blog.status}
                      </p>
                      <button className="px-6 py-2 rounded-full bg-[#3DD3CE] text-white text-[11px] font-medium self-start">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
