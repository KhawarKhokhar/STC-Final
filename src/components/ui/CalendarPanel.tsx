import * as React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

/* ------------ util ---------------- */
const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

/* ------------ types ---------------- */
export type CalendarEvent = {
  id: string;
  date: Date | string; // if string, must be ISO or parseable by Date
  title: string;
  color?: string; // tailwind color token or hex, used for dot
};

export type CalendarProps = {
  title?: string;
  className?: string;
  /** The currently selected date */
  value?: Date;
  /** Called when the user selects a date */
  onChange?: (date: Date) => void;
  /** Optional events to visualize on days */
  events?: CalendarEvent[];
  /** Called when the user clicks the "+" or double-clicks a day */
  onAddEvent?: (date: Date) => void;
};

/* ------------ helpers ---------------- */
function startOfDay(d: Date) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getMonthMatrix(anchor: Date) {
  // returns 6 weeks x 7 days matrix (42 days) covering the month grid
  const y = anchor.getFullYear();
  const m = anchor.getMonth();
  const firstOfMonth = new Date(y, m, 1);
  const startWeekDay = (firstOfMonth.getDay() + 6) % 7; // make Monday=0
  const days = daysInMonth(y, m);

  const matrix: Date[] = [];

  // days from previous month to fill before the 1st
  for (let i = startWeekDay - 1; i >= 0; i--) {
    matrix.push(new Date(y, m, -i));
  }
  // current month
  for (let d = 1; d <= days; d++) {
    matrix.push(new Date(y, m, d));
  }
  // next month padding
  while (matrix.length % 7 !== 0) {
    const last = matrix[matrix.length - 1];
    matrix.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  // ensure 6 rows for consistent height
  while (matrix.length < 42) {
    const last = matrix[matrix.length - 1];
    matrix.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }

  return matrix;
}

function monthLabel(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ------------ component ---------------- */
const CalendarPanel: React.FC<CalendarProps> = ({
  title = "Calendar",
  className,
  value,
  onChange,
  events = [],
  onAddEvent,
}) => {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = React.useState<Date>(startOfDay(value ?? today));

  // normalize events by day string (YYYY-MM-DD)
  const eventsByDay = React.useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const d = new Date(ev.date);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [events]);

  const grid = React.useMemo(() => getMonthMatrix(viewDate), [viewDate]);

  function gotoPrevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function gotoNextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }
  function gotoToday() {
    setViewDate(startOfDay(new Date()));
  }

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
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={gotoToday}
            className="hidden rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 sm:inline"
          >
            Today
          </button>
          <div className="flex items-center rounded-md bg-white ring-1 ring-slate-200">
            <button
              type="button"
              onClick={gotoPrevMonth}
              className="grid h-8 w-8 place-items-center hover:bg-slate-50"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-slate-700" />
            </button>
            <div className="px-2 text-xs font-semibold text-slate-800">
              {monthLabel(viewDate)}
            </div>
            <button
              type="button"
              onClick={gotoNextMonth}
              className="grid h-8 w-8 place-items-center hover:bg-slate-50"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-slate-700" />
            </button>
          </div>
          {onAddEvent && (
            <button
              type="button"
              onClick={() => onAddEvent(startOfDay(value ?? today))}
              className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>
      </div>

      {/* weekdays */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-[11px] font-semibold text-slate-500">
        {WEEKDAYS.map((w) => (
          <div key={w} className="px-1 text-center">{w}</div>
        ))}
      </div>

      {/* days grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => {
          const inMonth = d.getMonth() === viewDate.getMonth();
          const isToday = isSameDay(d, today);
          const isSelected = value ? isSameDay(d, value) : false;
          const key = startOfDay(d).toISOString().slice(0, 10);
          const evs = eventsByDay.get(key) ?? [];

          return (
            <button
              key={i}
              type="button"
              onDoubleClick={() => onAddEvent?.(d)}
              onClick={() => onChange?.(d)}
              className={cn(
                "group relative aspect-square rounded-lg bg-white p-1 text-left ring-1 ring-slate-200 transition",
                "hover:shadow-sm",
                !inMonth && "opacity-50",
                isSelected && "ring-2 ring-slate-900",
              )}
            >
              {/* date number */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold",
                    isToday ? "bg-slate-900 text-white" : "text-slate-700"
                  )}
                >
                  {d.getDate()}
                </div>
                {evs.length > 0 && (
                  <span className="rounded-full px-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">
                    {evs.length}
                  </span>
                )}
              </div>

              {/* events preview */}
              <ul className="mt-1 space-y-1">
                {evs.slice(0, 2).map((ev) => (
                  <li
                    key={ev.id}
                    className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-200"
                    title={ev.title}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ev.color ?? "#0ea5e9" }}
                    />
                    <span className="block truncate">{ev.title}</span>
                  </li>
                ))}
                {evs.length > 2 && (
                  <li className="text-[10px] font-medium text-slate-500">+{evs.length - 2} more</li>
                )}
              </ul>

              {/* focus ring overlay for a11y */}
              <span className="pointer-events-none absolute inset-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900" />
            </button>
          );
        })}
      </div>

      {/* legend */}
      {events.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="text-[11px] font-semibold text-slate-600">Legend</div>
          {Array.from(
            events.reduce((acc, ev) => acc.add(ev.color ?? "#0ea5e9"), new Set<string>())
          ).map((color, idx) => (
            <div key={idx} className="flex items-center gap-1 text-[11px] text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              <span>Event</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CalendarPanel;
