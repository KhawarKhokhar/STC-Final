// app/components/FeaturedCategory.tsx
"use client";

import React from "react";
import { Dot } from "lucide-react";

type Teaser = {
  id: number;
  title: string;
  author: string;
  date: string;
  image?: string; // optional background image
};

const teasers: Teaser[] = [
  { id: 1, title: "Pop Culture Pulse Trends In Entertainment", author: "Your Name", date: "Nov 18, 2025" },
  { id: 2, title: "Pop Culture Pulse Trends In Entertainment", author: "Your Name", date: "Nov 18, 2025" },
  { id: 3, title: "Pop Culture Pulse Trends In Entertainment", author: "Your Name", date: "Nov 18, 2025" },
];

const FeaturedCategory: React.FC = () => {
  return (
    <section className="relative isolate">
      {/* gradient background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(75deg,#3dd3ce,#fff2d0)]" />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Label + Headline */}
        <div className="max-w-3xl">
          <div className="text-lg font-semibold uppercase tracking-wide text-white/90">
            Featured
          </div>
          <div className="text-lg -mt-1 font-semibold uppercase tracking-wide text-white/90">
            Category
          </div>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Future Tech Exploring The
            <br />
            Latest Gadgets
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teasers.map((t) => (
            <article
              key={t.id}
              className="group relative overflow-hidden bg-slate-700"
            >
              {/* image layer (optional) */}
              <div
                className="absolute inset-0 bg-center bg-cover opacity-30 group-hover:opacity-40 transition-opacity"
                style={{
                  backgroundImage: t.image
                    ? `url(${t.image})`
                    : "[linear-gradient(#6b7280,#374151)]", // placeholder gradient
                }}
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-[#5e5e5e]" />

              {/* content */}
              <div className="relative z-10 flex h-60 flex-col justify-end p-6 text-white">
                <h3 className="text-lg font-bold leading-snug">
                  {t.title}
                </h3>

                <div className="mt-3 flex items-center text-xs text-white/80">
                  <span>{t.author}</span>
                  <Dot className="mx-1 h-4 w-4 text-teal-400" />
                  <span>{t.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategory;
