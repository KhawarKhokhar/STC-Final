"use client";

import React from "react";

/* ------------ background ---------------- */
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 2px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 2px)
  `,
  backgroundSize: "50px 50px",
  backgroundColor: "#F3EFE8",
} as const;

/* ------------ types ---------------- */
type ArticleItem = {
  id: string | number;
  author: string;
  category: string;
  title: string;
  thumbUrl?: string; // optional thumbnail
};

type TrendingArticlesProps = {
  title?: string;
  items: ArticleItem[];
  onSeeMore?: () => void;
  className?: string;
};

/* ------------ demo data ---------------- */
const demoItems: ArticleItem[] = [
  {
    id: 1,
    author: "Robert Pattinson",
    category: "Game",
    title: "E-Sports Revolution: The Future of Competitive Gaming",
  },
  {
    id: 2,
    author: "Lucas White",
    category: "Food",
    title: "The Zesty World of Oranges: Benefits, Varieties, and Fun Facts!",
  },
  {
    id: 3,
    author: "Budiono Siregar",
    category: "Motivation",
    title: "Chasing Dreams: Turning Your Cita-Cita into Reality",
  },
];

/* ------------ util ---------------- */
const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

/* ------------ subcomponent ---------------- */
const TrendingArticles: React.FC<TrendingArticlesProps> = ({
  title = "Top Trending Articles",
  items,
  onSeeMore,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#3DD3CE]/30 p-3 sm:p-4 shadow-sm ring-1 ring-slate-200",
        className
      )}
    >
      {/* subtle grid bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <svg className="h-full w-full" viewBox="0 0 400 240">
          <defs>
            <pattern id="cells" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#e9f6f2" />
              <path d="M40 0H0V40" fill="none" stroke="#cceae4" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cells)" />
        </svg>
      </div>

      {/* header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button
          type="button"
          onClick={onSeeMore}
          className="text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          See more
        </button>
      </div>

      {/* list */}
      <ul className="space-y-3">
        {items.map((it) => (
          <li
            key={it.id}
            className="rounded-xl bg-white px-3 py-3 ring-1 ring-slate-200 sm:px-4 sm:py-3"
          >
            <div className="flex items-start gap-3">
              {/* author dot */}
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-200" />
              {/* text */}
              <div className="min-w-0 flex-1">
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-600">{it.author}</span>
                  <span className="mx-1">—</span>
                  <span>{it.category}</span>
                </div>
                <div className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
                  {it.title}
                </div>
              </div>
              {/* thumb */}
              <div className="shrink-0">
                {it.thumbUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.thumbUrl}
                    alt=""
                    className="h-16 w-20 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="h-16 w-20 rounded-lg bg-slate-400/70 ring-1 ring-slate-200" />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

/* ------------ page/section that uses it ---------------- */
const HeroSection: React.FC = () => {
  return (
    <section style={gridBackgroundStyle} className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:items-stretch lg:gap-16 xl:px-10">
        {/* Left */}
        <div className="flex w-full flex-col items-center space-y-8 text-center lg:w-1/2 lg:items-start lg:text-left">
          <div className="space-y-4">
            {/* Replace with next/image if desired */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/three-lines.svg"
              className="relative right-12 top-3 mx-auto h-10 w-10 sm:h-12 sm:w-12 lg:top-6 lg:mx-3"
              alt="icon"
            />
            <h1 className="font-serif text-4xl font-extrabold leading-tight text-[#363435] sm:text-5xl md:text-6xl">
              Gains Insights
              <br />
              From Our Blogs
            </h1>
            <p className="max-w-xl -mt-1 text-lg text-gray-700 sm:text-xl">
              Weekly posts on everything branding, tech, design, and digital culture.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="mt-6 w-full max-w-md lg:mt-0 lg:w-2/5 lg:max-w-none xl:w-4/12">
          <TrendingArticles
            items={demoItems}
            onSeeMore={() => console.log("See more clicked")}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
