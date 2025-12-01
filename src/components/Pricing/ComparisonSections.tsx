"use client";

import React from "react";
import { CheckCircle2, SquareCheck, XCircle, XSquare } from "lucide-react";

// ------------------------------------------------------
// Types
// ------------------------------------------------------

type Point = string;

type Side = {
  labelPill: string; // e.g. "Nintendo Switch 2"
  verdict: string; // e.g. "More powerful"
  good?: boolean; // true -> green check, false -> red x
  points: Point[];
};

type Section = {
  heading: string;
  left: Side;
  right: Side;
};

// ------------------------------------------------------
// Demo Data (matching your screenshot)
// ------------------------------------------------------
const sections: Section[] = [
  {
    heading: "Performance and Hardware",
    left: {
      labelPill: "Nintendo Switch 2",
      verdict: "More powerful",
      good: true,
      points: [
        "Custom NVIDIA Ampere GPU (1536 CUDA cores) with 12GB LPDDR5X RAM, enabling 4K/60fps output and smoother performance in demanding titles like The Legend of Zelda: Tears of the Kingdom",
        "256GB UFS storage (8x more than the OLED) and microSD Express support (up to 2TB)",
      ],
    },
    right: {
      labelPill: "Nintendo Switch OLED",
      verdict: "Outdated",
      good: false,
      points: [
        "Custom NVIDIA Tegra X1+ GPU with 4GB RAM",
        "64GB storage (expandable via microSDXC)",
      ],
    },
  },
  {
    heading: "Design and Portability",
    left: {
      labelPill: "Nintendo Switch 2",
      verdict: "More powerful",
      good: true,
      points: [
        "Bulkier design: 116mm x 272mm x 13.9mm (with Joy-Con 2 attached) and 401g (console only)",
        "Dual USB-C ports (charging/accessories) and redesigned dock with Ethernet support",
      ],
    },
    right: {
      labelPill: "Nintendo Switch OLED",
      verdict: "Disjointe",
      good: false,
      points: [
        "Compact: 102mm x 242mm x 13.9mm (with Joy-Con attached) and 320g (console only)",
        "Single USB-C port and no built-in Ethernet",
      ],
    },
  },
  {
    heading: "Battery Life and Charging",
    left: {
      labelPill: "Nintendo Switch 2",
      verdict: "Good durability",
      good: true,
      points: [
        "5220mAh battery; 2–6.5 hours of playtime (shorter due to higher performance demands)",
        "3-hour charging tim",
      ],
    },
    right: {
      labelPill: "Nintendo Switch OLED",
      verdict: "Poor durability",
      good: false,
      points: [
        "4310mAh battery: 4.5–9 hours of playtime",
        "3-hour charging time",
      ],
    },
  },
];

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const Bullet: React.FC<{ good?: boolean }> = ({ good }) => (
<span
className={cn(
"mt-1 inline-block h-2.5 w-2.5 rounded-full shrink-0",
good ? "bg-emerald-500" : "bg-emerald-500"
)}
/>
);

// ------------------------------------------------------
// Components
// ------------------------------------------------------
const SideBlock: React.FC<{ side: Side }> = ({ side }) => {
  return (
    <div className="p-5">
      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
        {side.labelPill}
      </div>
      <div className="mt-3 flex items-start gap-3">
        {side.good ? (
          <SquareCheck  className="h-5 w-5 text-emerald-500" />
        ) : (
          <XSquare className="h-5 w-5 text-rose-500" />
        )}
        <div>
          <div className="font-semibold text-slate-800">{side.verdict}</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {side.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Bullet good={side.good} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Row: React.FC<{ section: Section }> = ({ section }) => (
  <div className="rounded-xl border border-slate-200 bg-white/80 shadow-sm overflow-hidden">
    <div className=" px-5 py-3 text-sm font-semibold text-slate-700 border-b border-slate-200">
      {section.heading}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
      <SideBlock side={section.left} />
      <SideBlock side={section.right} />
    </div>
  </div>
);

const ComparisonSections: React.FC<{ data?: Section[] }> = ({ data = sections }) => {
  return (
    <section className="relative isolate px-4 md:px-8 py-20 md:py-30">
      <div className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl space-y-6">
        {data.map((s) => (
          <Row key={s.heading} section={s} />
        ))}
      </div>
    </section>
  );
};

export default ComparisonSections;
