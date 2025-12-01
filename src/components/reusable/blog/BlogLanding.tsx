// app/components/BlogLanding.tsx
"use client";

import React from "react";
import { Mail, Search } from "lucide-react";

/* ----------------------------- Types & Data ----------------------------- */
type Article = {
  id: number;
  category: string;
  title: string;
  excerpt?: string;
  img?: string; // optional
};

const recentLeft: Article = {
  id: 1,
  category: "Preventive Care",
  title: "The Importance of Regular Dental Check-ups",
  excerpt:
    "Discover why routine dental visits are crucial for maintaining oral health and preventing serious dental issues.",
};

const recentRight: Article[] = [
  {
    id: 2,
    category: "Oral Hygiene",
    title: "Top 10 Tips for Maintaining Oral Hygiene at Home",
  },
  {
    id: 3,
    category: "Dental Procedures",
    title: "Understanding the Different Types of Dental Fillings",
  },
];

// 24 demo articles for the bottom grid
const allArticles: Article[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 10,
  category: [
    "Gum Health",
    "Cosmetic Dentistry",
    "Dental Implants",
    "Root Canal",
    "Pediatric Dentistry",
    "Health and Wellness",
    "Patient Comfort",
    "Teeth Whitening",
    "Nutrition",
  ][i % 9],
  title: [
    "How to Prevent and Treat Gum Disease",
    "The Benefits of Cosmetic Dentistry: Enhancing Your Smile",
    "What to Expect During Your First Dental Implant Consultation",
    "Common Myths and Facts About Root Canal Treatment",
    "How to Care for Your Child’s Teeth: A Parent’s Guide",
    "The Connection Between Oral Health and Overall Wellness",
    "Managing Dental Anxiety: Tips for a Stress-Free Dental Visit",
    "Teeth Whitening: Professional Treatments vs. At-Home Kits",
    "The Role of Nutrition in Maintaining Healthy Teeth",
  ][i % 9],
}));

/* ----------------------------- Utilities ----------------------------- */
const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

const Checker = ({ className = "" }: { className?: string }) => (
  <div
    className={cn(
      "h-full w-full rounded-xl bg-[linear-gradient(45deg,#eee_25%,transparent_25%),linear-gradient(-45deg,#eee_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eee_75%),linear-gradient(-45deg,transparent_75%,#eee_75%)]",
      "bg-size-[24px_24px] bg-position-[0_0,0_12px,12px_-12px,-12px_0] bg-slate-200/50",
      className
    )}
  />
);

/* ----------------------------- Component ------------------------------ */
const BlogLanding: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 9;
  const totalPages = Math.ceil(allArticles.length / pageSize);

  const filtered = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    // reset to first page if search changes and the current page is now out of range
    if (page > pages) setPage(1);
  }, [query, pages, page]);

  return (
    <section className="bg-white px-4 py-16 rounded-t-[70px] sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Search */}
        <div className="rounded-full bg-white/90 ring-1 ring-slate-200 px-4 py-3 shadow-sm">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search article"
              className="w-full rounded-full border-none pl-3 pr-8 text-sm outline-none placeholder:text-slate-400"
            />
            <Search className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Most Recent */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            <span className="bg-linear-to-r from-indigo-500 via-teal-500 to-teal-400 bg-clip-text text-transparent">
              Most Recent
            </span>{" "}
            Articles
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Left big card */}
            <article className="col-span-2 rounded-2xl bg-white">
              <div className="h-64 w-full overflow-hidden rounded-xl sm:h-72 md:h-96">
                <Checker />
              </div>
              <div className="mt-2">
                <div className="text-[16px] font-semibold text-teal-600">
                  {recentLeft.category}
                </div>
                <h3 className="text-[20px] font-extrabold text-slate-900">
                  {recentLeft.title}
                </h3>
                <p className="mt-1 text-[14px] text-slate-600">
                  {recentLeft.excerpt}
                </p>
              </div>
            </article>

            {/* Right two small cards */}
            <div className="space-y-4">
              {recentRight.map((r) => (
                <article key={r.id} className="rounded-2xl bg-white">
                  <div className="h-44 w-full overflow-hidden rounded-xl">
                    <Checker />
                  </div>
                  <div className="mt-2">
                    <div className="text-[16px] font-semibold text-teal-600">
                      {r.category}
                    </div>
                    <h4 className="text-[14px] font-bold text-slate-900">
                      {r.title}
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Subscribe banner */}
          <div className="mt-16 rounded-2xl bg-[linear-gradient(to_right,#d2cee7,#c6ede1)] p-6 py-12 ring-1 ring-slate-200">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
              {/* Left side: Icon + text (aligned left) */}
              <div className="flex flex-col items-start text-left space-y-3">
                <span className="grid h-15 w-15 place-items-center rounded-full bg-[#3DD3CE]/50 text-2xl text-slate-700">
                  <Mail />
                </span>
                <h3 className="text-3xl font-bold text-slate-900">
                  Get our best content in your inbox
                </h3>
                <p className="text-sm text-slate-600 max-w-md">
                  All the tips, stories, and resources you could ever need or
                  want straight to your email.
                </p>
              </div>

              {/* Right side: Form + note (full width) */}
              <div className="flex flex-col items-stretch px-20 w-full space-y-3">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="h-10 w-full rounded-md border-0 px-3 text-sm outline-none bg-[#F3EFE8] ring-1 ring-slate-300 flex-1"
                  />
                </form>

                <button
                  type="submit"
                  className="h-10 w-full rounded-md bg-teal-500 px-4 text-md font-semibold text-white hover:bg-teal-600"
                >
                  Subscribe
                </button>

                <p className="text-[11px] text-slate-500">
                  Your privacy matters! We only use this info to send content
                  and updates. You may unsubscribe anytime. View our <a className="underline">privacy policy</a> for more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Discover Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            <span className="bg-linear-to-r from-indigo-500 via-teal-500 to-teal-400 bg-clip-text text-transparent">
              Discover
            </span>{" "}
            Our Articles
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((a) => (
              <article
                key={a.id}
                className="rounded-2xl bg-white"
              >
                <div className="h-48 w-full overflow-hidden rounded-xl">
                  <Checker />
                </div>
                <div className="mt-2">
                  <div className="text-[11px] font-semibold text-teal-600">
                    {a.category}
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">
                    {a.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={cn(
                "rounded-md px-3 py-1.5 ring-1 ring-slate-300",
                page === 1 && "opacity-40"
              )}
            >
              Previous
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => {
                const n = i + 1;
                const isActive = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "h-7 min-w-7 rounded-md px-2 text-sm ring-1 ring-slate-300",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-white hover:bg-slate-50"
                    )}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className={cn(
                "rounded-md px-3 py-1.5 ring-1 ring-slate-300",
                page === pages && "opacity-40"
              )}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogLanding;
