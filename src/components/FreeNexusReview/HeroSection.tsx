// app/components/FinancialOverview.tsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- helpers ---------------- */
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthMatrix(year: number, month: number) {
  // returns a 6x7 grid with numbers or null
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(42).fill(null);
  for (let i = 0; i < daysInMonth; i++) cells[startDay + i] = i + 1;
  const rows: (number | null)[][] = [];
  for (let r = 0; r < 6; r++) rows.push(cells.slice(r * 7, r * 7 + 7));
  return rows;
}

/* ---------------- components ---------------- */
const Chip: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      "rounded-full px-5 py-3 text-sm md:text-base whitespace-nowrap transition",
      "border border-dashed border-slate-300",
      active
        ? "bg-teal-500 text-white border-transparent shadow-sm"
        : "bg-white text-slate-800 hover:bg-slate-50",
    ].join(" ")}
  >
    {label}
  </button>
);

/* ---------------- main section ---------------- */
const HeroSection: React.FC = () => {
  const today = new Date();
  const [year, setYear] = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth());

  // Demo: “active” days
  const activeDays = new Set([1, 2, 4, 6, 7, 8, 9, 10, 11, 14]);

  const grid = getMonthMatrix(year, month);

  const allGoals = [
    "Paying off high cost debt",
    "Build savings",
    "Save for retirement",
    "Move to a new home",
    "Accelerate my mortgage paydown",
    "Purchase an investment property",
    "Accelerate mortgage pay",
    "Other",
  ];

  const [selected, setSelected] = React.useState<string[]>([
    "Paying off high cost debt",
  ]);

  const toggleGoal = (g: string) => {
    setSelected((prev) => {
      const has = prev.includes(g);
      if (has) return prev.filter((x) => x !== g);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, g];
    });
  };

  const changeMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  return (
    <section className="relative isolate px-4 md:px-8 py-24">
      {/* soft gradient + subtle lines */}
      <div className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-60 mask-[radial-gradient(white,transparent_75%)]">
        <svg className="h-full w-full" viewBox="0 0 1200 600">
          <defs>
            <pattern
              id="wavy"
              width="1200"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 30 Q 300 0 600 30 T 1200 30"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#wavy)" />
        </svg>
      </div>

      {/* header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900">
          Free Nexus Review
        </h2>
        <p className="mt-8 text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
      </div>

      {/* content grid */}
      <div className="flex justify-center w-full">
        <div className="mt-10 grid grid-cols-1 items-center gap-4 md:gap-8 lg:grid-cols-2 max-w-6xl">
          {/* calendar card */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-slate-900">Active Calendar</div>
              <div className="text-xs text-slate-500">You're active days</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md p-2 hover:bg-slate-50"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="rounded-md border border-slate-200 px-3 py-1.5 text-sm">
                {monthNames[month]}
              </div>
              <button
                className="rounded-md p-2 hover:bg-slate-50"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* weekdays */}
          <div className="grid grid-cols-7 text-center text-xs text-slate-500 mb-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
              <div key={`${d}-${idx}`} className="py-2">
                {d}
              </div>
            ))}
          </div>

          {/* days grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {grid.flat().map((day, idx) => {
              if (!day) return <div key={idx} className="h-10 sm:h-11" />;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              const isActive = activeDays.has(day);
              return (
                <div
                  key={idx}
                  className={[
                    "h-10 sm:h-11 grid place-items-center rounded-full text-sm",
                    isActive ? "bg-amber-100 text-amber-900" : "text-slate-700",
                    isToday && "bg-teal-400 text-white",
                  ].join(" ")}
                >
                  {String(day).padStart(2, "0")}
                </div>
              );
            })}
          </div>
        </div>

          {/* goals card */}
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 p-5 md:p-7">
            <h3 className="text-xl md:text-2xl font-serif text-slate-900">
              What are your top 3 financial goals this year?
            </h3>

            <div className="mt-4 flex flex-wrap gap-3 md:gap-4">
              {allGoals.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  active={selected.includes(g)}
                  onClick={() => toggleGoal(g)}
                />
              ))}
            </div>

            <div className="mt-5 text-sm text-slate-500">
              Selected:{" "}
              <span className="font-medium text-slate-700">
                {selected.length ? selected.join(", ") : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
