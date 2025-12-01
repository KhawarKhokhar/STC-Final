"use client";

import React from "react";

/* ------------ util ---------------- */
const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

/* ------------ SimpleCalendar ---------------- */
type SimpleCalendarProps = {
  title?: string;
  value?: Date;
  onChange?: (d: Date) => void;
  className?: string;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

function getMonthMatrix(anchor: Date) {
  const y = anchor.getFullYear();
  const m = anchor.getMonth();
  const first = new Date(y, m, 1);
  const startIdx = first.getDay(); // Sun=0
  const days = daysInMonth(y, m);

  const cells: Date[] = [];
  // prev month padding
  for (let i = startIdx - 1; i >= 0; i--) cells.push(new Date(y, m, -i));
  // current month
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));
  // next padding up to a full 6x7 grid
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1];
    cells.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1];
    cells.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return cells;
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({
  title = "Schedule Date",
  value,
  onChange,
  className,
}) => {
  const today = startOfDay(new Date());
  const [selected, setSelected] = React.useState<Date>(startOfDay(value ?? today));
  const [viewDate, setViewDate] = React.useState<Date>(startOfDay(value ?? today));

  const grid = React.useMemo(() => getMonthMatrix(viewDate), [viewDate]);

  function gotoPrevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function gotoNextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function selectDate(d: Date) {
    const day = startOfDay(d);
    setSelected(day);
    onChange?.(day);
  }

  const monthLabel = viewDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200",
        "backdrop-blur supports-backdrop-filter:bg-white/90",
        className
      )}
    >
      {/* header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        
      </div>
      <div className="flex items-center justify-center mb-5 gap-5.5">
          <button
            type="button"
            onClick={gotoPrevMonth}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-50 ring-1 ring-slate-200"
          >
            {/* left chevron */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="px-2 text-xs font-semibold text-slate-800 select-none">
            {monthLabel}
          </div>
          <button
            type="button"
            onClick={gotoNextMonth}
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-50 ring-1 ring-slate-200"
          >
            {/* right chevron */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      {/* weekday row */}
      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-slate-500">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => {
          const inMonth = d.getMonth() === viewDate.getMonth();
          const isSel = selected && isSameDay(d, selected);
          const isToday = isSameDay(d, today);
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectDate(d)}
              className={cn(
                "aspect-square rounded-lg text-sm transition",
                "flex items-center justify-center",
                inMonth ? "bg-white" : "bg-slate-50 text-slate-400",
                isSel && "bg-indigo-500 text-white ring-indigo-500",
                !isSel && isToday && "text-indigo-600 font-semibold"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------ background ---------------- */
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 2px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 2px)
  `,
  backgroundSize: "50px 50px",
  backgroundColor: "#F3EFE8",
} as const;

/* ------------ page/section that uses it ---------------- */
const HeroSection: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <section style={gridBackgroundStyle} className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:items-stretch lg:gap-16 xl:px-10">
        {/* Left (unchanged) */}
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
              Book Your Free
              <br />
              Consultation
            </h1>
            <p className="max-w-xl -mt-1 text-lg text-gray-700 sm:text-xl">
              Weekly posts on everything branding, tech, design, and digital culture.
            </p>
          </div>
        </div>

        {/* Right: simple calendar card */}
        <div className="mt-6 w-full max-w-md lg:mt-0 lg:w-2/5 lg:max-w-none xl:w-4/12">
          <SimpleCalendar
            title="Schedule Date"
            value={date}
            onChange={(d) => setDate(d)}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
