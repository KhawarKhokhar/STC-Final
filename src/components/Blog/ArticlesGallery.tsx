// app/components/ArticlesGallery.tsx
"use client";

import React from "react";
import {
  Search,
  Grid3X3,
  List as ListIcon,
  Camera,
  ChevronRight,
} from "lucide-react";

/* ------------ background ---------------- */
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(61, 211, 206, 0.3) 1px, transparent 2px),
    linear-gradient(to bottom, rgba(6, 211, 206, 0.3) 1px, transparent 2px)
  `,
  backgroundSize: "180px 180px",
  backgroundColor: "#F3EFE8",
} as const;

/* ------------------------------- data ------------------------------- */
type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  time: string;
};

const CATEGORIES = ["All", "Technology", "Education", "Lifestyle", "Healthcare", "Sport", "Food"];

const demoText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam, purus sit amet luctus venenatis, lectus";

const ARTICLES: Article[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: "Changing people’s lifestyles for the better",
  excerpt: demoText,
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1], // rotate (skip "All")
  time: "2 hours ago",
}));

/* ---------------------------- utilities ---------------------------- */
const cn = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

/* ----------------------------- component --------------------------- */
const ArticlesGallery: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<string>("All");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = active === "All" ? true : a.category === active;
    const matchQuery = query.trim()
      ? a.title.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchCat && matchQuery;
  });

  return (
    <section style={gridBackgroundStyle} className="px-4 md:px-64 py-24">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Courses"
            className="h-9 w-[300px] rounded-md bg-slate-900 text-slate-100 placeholder:text-slate-400 pl-9 pr-3 outline-none"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setView("list")}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-md bg-slate-900 text-white",
              view === "list" && "ring-2 ring-slate-300"
            )}
            aria-label="List view"
          >
            <ListIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-md bg-teal-400 text-white",
              view === "grid" && "ring-2 ring-teal-200"
            )}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* chips */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              active === c
                ? "bg-teal-400 text-black"
                : "bg-slate-900 text-slate-100 hover:bg-slate-800"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* cards */}
      <div
        className={cn(
          "mt-6 gap-6",
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        )}
      >
        {filtered.map((a) => (
          <article
            key={a.id}
            className={cn(
              "rounded-xl border border-slate-500 bg-white overflow-hidden",
              view === "list" && "grid grid-cols-3"
            )}
          >
            {/* image placeholder */}
            <div className={cn("bg-[#C4C4C4] grid place-items-center", view === "list" ? "h-48 col-span-1" : "h-48")}>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-400/60 text-white">
                <Camera className="h-4 w-4" />
              </div>
            </div>

            {/* content */}
            <div
              className={cn(
                "relative",
                view === "list" ? "col-span-2" : ""
              )}
            >
              {/* top meta bar */}
              <div className="bg-[linear-gradient(180deg,#3dd3ce,#fff2d0)]">
              <div className="flex items-center justify-between border-t border-slate-500 px-8 py-3">
                <span className="tracking-[0.35em] text-lg font-bold text-slate-700">
                  LIFE&STYLE
                </span>
                <span className="flex items-center gap-1 text-md text-slate-500">
                  {a.time}
                </span>
              </div>

              {/* body */}
              <div className="px-8 pb-5 pt-3">
                <h3 className="text-[20px] font-extrabold text-slate-900 leading-snug">
                  {a.title}
                </h3>
                <p className="mt-2 text-md text-slate-600 line-clamp-2">{a.excerpt}</p>

                <button className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                  Read More <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ArticlesGallery;
