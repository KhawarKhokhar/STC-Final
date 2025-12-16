import React from "react";

export type BlogDetailProps = {
  tag?: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string; // e.g. "12 Nov 2024"
  readTime?: string; // e.g. "8 min Read"
  // Optional cover image url; if omitted a neutral placeholder renders
  coverUrl?: string;
};

export default function BlogDetail({
  tag = "Blog Detail",
  title,
  subtitle = "",
  author = "James Smith",
  date = "12 Nov 2024",
  readTime = "8 min Read",
  coverUrl,
}: BlogDetailProps) {
  return (
    <section className="w-full text-neutral-900">
      <div className="mx-auto flex flex-col items-center justify-center  max-w-6xl px-6 pb-16 pt-8 sm:pt-12">
        {/* Tag */}
        <div className="inline-flex select-none items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-[#a5a5a5] shadow-sm">
          {tag}
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle ? (
          <p className="mt-4 max-w-3xl text-sm text-[#a5a5a5] sm:text-base">
            {subtitle}
          </p>
        ) : null}

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap bg-white rounded-2xl items-center text-sm text-[#a5a5a5]">
          <span className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-[#a5a5a5]">
            {author}
          </span>
          <span className="text-neutral-300">|</span>
          <span className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-[#a5a5a5]">
            {date}
          </span>
          <span className="text-neutral-300">|</span>
          <span className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-[#a5a5a5]">
            {readTime}
          </span>
        </div>

        {/* Cover image / placeholder */}
        <div className="mt-8 h-124 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200/80 shadow-inner">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
