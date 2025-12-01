// app/components/StatsStrip.tsx
"use client";

import React from "react";

type Stat = {
  value: string;   // e.g. "11%", "800,000+"
  label: string;   // e.g. "High-intent Leads Generated"
};

const stats: Stat[] = [
  { value: "11%", label: "High-intent Leads Generated" },
  { value: "800,000+", label: "Home Owners" },
  { value: "11+", label: "Offer Types" },
];

const StatsStrip: React.FC<{ items?: Stat[] }> = ({ items = stats }) => {
  return (
    <section className="w-full my-20">
      <div className="mx-auto max-w-full">
        <div className="border-y border-teal-300/40 py-10">
          <div className="px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
              {items.map((s, i) => (
                <div
                  key={s.label}
                  className={[
                    "flex flex-col items-center justify-center",
                    // vertical divider for middle columns on wider screens
                    i !== 0 ? "sm:border-l sm:border-teal-300/60 sm:pl-6" : "",
                  ].join(" ")}
                >
                  <div className="text-3xl md:text-4xl text-teal-700 tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-slate-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
