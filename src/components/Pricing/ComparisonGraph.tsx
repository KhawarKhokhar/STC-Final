"use client";

import React from "react";
import { CheckCircle2, XCircle, MoreHorizontal, Feather, XSquare, SquareCheck } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ------------------------------------------------------
// Types & Data
// ------------------------------------------------------

type Feature = { text: string };

type Column = {
  id: string;
  title: string;
  good?: boolean; // good == green check; otherwise red x
  subtitle?: string;
  features: Feature[];
};

const left: Column = {
  id: "switch2",
  title: "Nintendo Switch 2",
  good: true,
  subtitle: "Larger Monitor",
  features: [
    { text: "7.9-inch LCD screen with 1920x1080 resolution (1080p), HDR10 support, and up to 120Hz refresh rate for smoother gameplay" },
    { text: "Variable Refresh Rate (VRR) up to 120Hz in handheld/tabletop modes, reducing motion blur" },
    { text: "4K output (3840x2160 at 60fps) via HDMI in TV mode" },
  ],
};

const right: Column = {
  id: "oled",
  title: "Nintendo Switch OLED",
  good: false,
  subtitle: "Smaller Monitor",
  features: [
    { text: "7-inch OLED screen with 1280x720 resolution (720p) and superior contrast ratios" },
    { text: "1080p output via HDMI in TV mode" },
  ],
};

const chartData = [
  { name: "Nintendo Switch 2", resolution: 2160, refresh: 120 },
  { name: "Nintendo Switch OLED", resolution: 1080, refresh: 60 },
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
      "mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full",
      good ? "bg-emerald-500" : "bg-rose-500"
    )}
  />
);



// ------------------------------------------------------
// Component
// ------------------------------------------------------
const ComparisonPanel: React.FC = () => {
  return (
    <section className="relative isolate px-4 md:px-8 py-12 md:py-16">
      <div className="absolute inset-0 -z-10" />
        
      <div className="mx-auto mt-8 md:mt-10 max-w-6xl rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        {/* top two-column comparison */}
         <div className="p-6 bg-[#f1f4f8]">Display and Screen Technology</div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-0">
          <ColumnCard column={left} />
          <ColumnCard column={right} />
        </div>

        {/* chart area */}
        <div className="border-t border-slate-200 p-4 md:p-6 min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Feather className="h-4 w-4 text-slate-400" />
              Comparison of screen resolution and refresh rate between Switch 2 and OLED models
            </div>
            <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-50">
              <MoreHorizontal />
            </button>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Resolution
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-sky-400" /> Max refresh
            </div>
          </div>

        <div className="mt-8 h-72 w-full md:h-88 min-h-0">
  <ResponsiveContainer
    width="100%"
    height={288}     // explicit px height
    minWidth={0}
    minHeight={240}  // fallback minimum
    // or: aspect={2} height={undefined} minHeight={240}
  >
    <BarChart data={chartData} barCategoryGap={48}>
                <defs>
                  <linearGradient id="gradRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="gradRef" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", dy: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Legend wrapperStyle={{ display: "none" }} />
                <Bar dataKey="resolution" fill="url(#gradRes)" radius={[12, 12, 0, 0]} />
                <Bar dataKey="refresh" fill="url(#gradRef)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

// Column sub-component
const ColumnCard: React.FC<{ column: Column }> = ({ column }) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {column.title}
        </span>
      </div>
      <div className="mt-4 flex items-start gap-3">
        {column.good ? (
          <SquareCheck  className="h-8 w-8 text-emerald-500" />
        ) : (
          <XSquare className="h-5 w-5 text-rose-500" />
        )}
        <div>
          <div className="font-semibold text-slate-800">{column.subtitle}</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {column.features.map((f) => (
              <li key={f.text} className="flex items-start gap-3">
                <Bullet good={column.good} />
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
