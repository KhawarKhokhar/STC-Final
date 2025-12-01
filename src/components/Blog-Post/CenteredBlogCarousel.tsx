// app/components/CenteredBlogCarousel.tsx
"use client";

import React from "react";

type Slide = {
  id: number | string;
  title: string;
  author: string;
  category: string;
  image?: string; // optional bg image
};

const slides: Slide[] = [
  {
    id: 1,
    title: "You Are Wasting 70% Of Your Life By Doing This!",
    author: "Steven Gambardella",
    category: "lifestyle",
  },
  {
    id: 2,
    title: "Why Your Morning Routine Isn’t Working (Yet)",
    author: "Maya Vincent",
    category: "lifestyle",
  },
  {
    id: 3,
    title: "Stop Multitasking: A Mini-Guide To Focus",
    author: "Chris H.",
    category: "productivity",
  },
  {
    id: 4,
    title: "How To Learn Faster — Scientifically",
    author: "Noah Ren",
    category: "learning",
  },
];

const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

const CenteredBlogCarousel: React.FC<{ items?: Slide[] }> = ({ items = slides }) => {
  const [idx, setIdx] = React.useState(0);

  const go = (i: number) =>
    setIdx(((i % items.length) + items.length) % items.length);

  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // autoplay (optional) – comment out if not desired
  React.useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [idx]);

  return (
    <section className="select-none bg-[#f5efe6] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* track */}
        <div className="relative overflow-hidden">
          {/* invisible arrows for keyboard/assistive control (optional) */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/10 p-2 text-white hover:bg-black/20 md:block"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/10 p-2 text-white hover:bg-black/20 md:block"
          >
            ›
          </button>

          {/* three cards layout – we render prev, active, next */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            {[idx - 1, idx, idx + 1].map((k, pos) => {
              const slide = items[((k % items.length) + items.length) % items.length];
              const isCenter = pos === 1;

              return (
                <article
                  key={`${slide.id}-${pos}`}
                  className={cn(
                    "relative rounded-2xl ring-1 ring-white/50",
                    "bg-linear-to-b from-slate-300 to-slate-400",
                    "transition-all duration-500",
                    isCenter
                      ? "h-[200px] w-[360px] sm:h-[220px] sm:w-[420px] md:h-60 md:w-[520px] shadow-[0_20px_50px_rgba(0,0,0,.25)]"
                      : "h-[165px] w-[260px] opacity-60 blur-[1px]"
                  )}
                  onClick={() => !isCenter && go(k)}
                >
                  {/* custom background if provided */}
                  {slide.image && (
                    <div
                      className="absolute inset-0 rounded-2xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    />
                  )}
                  {/* frosted white outline on center like screenshot */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-2xl",
                      isCenter && "ring-4 ring-white/70"
                    )}
                  />

                  {/* bottom gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_top,rgba(0,0,0,.35),rgba(0,0,0,0)_55%)]" />

                  {/* content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    {/* author line */}
                    <div className="mb-2 flex items-center gap-2 text-[12px] text-white/80">
                      <span className="inline-block h-3 w-3 rounded-full bg-white/50" />
                      <span className="truncate">
                        {slide.author} — {slide.category}
                      </span>
                    </div>
                    {/* title */}
                    <h3 className="line-clamp-2 text-[15px] font-semibold sm:text-[16px]">
                      {slide.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* dots */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {items.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  active ? "w-6 bg-slate-400" : "w-3 bg-slate-300/80 hover:bg-slate-400"
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CenteredBlogCarousel;
