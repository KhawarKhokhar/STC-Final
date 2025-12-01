"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Paperclip, Save } from "lucide-react";

/* ===================== Utilities ===================== */
const cn = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/* ===================== Types ===================== */
type Booking = {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM (24h)
  endTime: string;   // HH:MM (24h)
  title: string;
  notes?: string;
};

/* ===================== Calendar Helpers ===================== */
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}
function getMonthMatrix(anchor: Date) {
  // Monday-first grid (6 rows * 7 days)
  const first = startOfMonth(anchor);
  const last = endOfMonth(anchor);
  const startOffset = (first.getDay() + 6) % 7; // Monday=0
  const daysInMonth = last.getDate();

  const cells: Date[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(new Date(first.getFullYear(), first.getMonth(), 0 - (startOffset - 1 - i)));
  }
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(first.getFullYear(), first.getMonth(), i));
  while (cells.length % 7 !== 0) {
    const lastCell = cells[cells.length - 1];
    cells.push(new Date(lastCell.getFullYear(), lastCell.getMonth(), lastCell.getDate() + 1));
  }
  while (cells.length < 42) {
    const lastCell = cells[cells.length - 1];
    cells.push(new Date(lastCell.getFullYear(), lastCell.getMonth(), lastCell.getDate() + 1));
  }
  return cells;
}

/* ===================== Mini Calendar (popover) ===================== */
const MiniCalendar: React.FC<{
  value: Date;
  onChange: (d: Date) => void;
}> = ({ value, onChange }) => {
  const [view, setView] = React.useState(new Date(value.getFullYear(), value.getMonth(), 1));

  const monthLabel = view.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const WEEKDAYS_MIN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // build 6x7 grid (starts Sunday)
  const cells = React.useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const last = new Date(view.getFullYear(), view.getMonth() + 1, 0);
    const startOffset = first.getDay(); // Sun=0
    const daysInMonth = last.getDate();

    const arr: Date[] = [];
    // prev padding
    for (let i = 0; i < startOffset; i++) {
      arr.push(new Date(first.getFullYear(), first.getMonth(), -startOffset + i + 1));
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(new Date(first.getFullYear(), first.getMonth(), d));
    }
    // next padding to 42
    while (arr.length < 42) {
      const lastCell = arr[arr.length - 1];
      arr.push(new Date(lastCell.getFullYear(), lastCell.getMonth(), lastCell.getDate() + 1));
    }
    return arr;
  }, [view]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <div>
      {/* header */}
      <div className="mb-2 flex items-center justify-between">
        <button
          aria-label="Prev"
          onClick={() => setView((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-sm font-semibold text-slate-900">{monthLabel}</div>
        <button
          aria-label="Next"
          onClick={() => setView((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* weekdays */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-slate-500">
        {WEEKDAYS_MIN.map((w) => (
          <div key={w} className="py-2">{w}</div>
        ))}
      </div>

      {/* days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, idx) => {
          const inMonth = d.getMonth() === view.getMonth();
          const selected = isSameDay(d, value);
          return (
            <button
              key={idx}
              onClick={() => onChange(d)}
              className={cn(
                "h-9 w-9 place-self-center rounded-lg text-sm",
                inMonth ? "text-slate-900" : "text-slate-300",
                selected ? "bg-indigo-500 text-white font-semibold" : "hover:bg-slate-100"
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

/* ===================== Booking Modal (with date popover) ===================== */
const BookingModal: React.FC<{
  open: boolean;
  date: string; // YYYY-MM-DD
  onClose: () => void;
  onSubmit: (b: Booking) => void;
}> = ({ open, date, onClose, onSubmit }) => {
  const [startTime, setStartTime] = React.useState("10:00");
  const [endTime, setEndTime] = React.useState("10:30");
  const [title, setTitle] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // local date + popover state
  const [localDate, setLocalDate] = React.useState<Date>(new Date(date));
  const [openPicker, setOpenPicker] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (open) {
      setStartTime("10:00");
      setEndTime("10:30");
      setTitle("");
      setNotes("");
      setLocalDate(new Date(date));
      setOpenPicker(false);
    }
  }, [open, date]);

  // click outside closes popover
  React.useEffect(() => {
    if (!openPicker) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setOpenPicker(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [openPicker]);

  const longDate = React.useMemo(
    () => localDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    [localDate]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-medium text-slate-900">Add New Event</h2>
            <p className="text-sm pt-5 text-slate-500">Pick a date & time, add details, and save.</p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-16 w-16 place-items-center rounded-md text-slate-600 hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 my-10 gap-4 sm:grid-cols-3">
          {/* START DATE with popover calendar */}
          <label className="block sm:col-span-1 relative">
            <span className="mb-1 block text-sm font-medium text-slate-600">START DATE</span>
            <button
              type="button"
              onClick={() => setOpenPicker((v) => !v)}
              className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-800"
            >
              <span className="truncate">{longDate}</span>
              <span className="ml-auto">📅</span>
            </button>

            {openPicker && (
              <div ref={pickerRef} className="absolute z-50 mt-2 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                <MiniCalendar
                  value={localDate}
                  onChange={(d) => {
                    setLocalDate(d);
                    setOpenPicker(false);
                  }}
                />
              </div>
            )}
          </label>

          <label className="block sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600">START TIME</span>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600">END TIME</span>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </label>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-600">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Meeting with client"
              className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-600">Additional Summary</span>
            <textarea
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agenda, links, attachments, etc."
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <button className="flex items-center gap-3 rounded-xl border border-[#0099ff] px-4 py-2 text-sm font-semibold text-[#0099ff] hover:bg-indigo-50">
            <Paperclip size={16} />Add Attachment
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!title) return alert("Please enter a title");
                if (startTime >= endTime) return alert("End time must be after start time");
                onSubmit({
                  id: crypto.randomUUID(),
                  date: ymd(localDate), // <- use chosen date
                  startTime,
                  endTime,
                  title,
                  notes,
                });
                onClose();
              }}
              className="flex gap-2 rounded-xl bg-[#1b48bb] px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Save size={16} />Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== Full Width Calendar + Booking ===================== */
const FullWidthBookingCalendar: React.FC = () => {
  const today = new Date();
  const [viewDate, setViewDate] = React.useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [modalDate, setModalDate] = React.useState<string | null>(null);
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  const grid = React.useMemo(() => getMonthMatrix(viewDate), [viewDate]);

  function openModal(d: Date) {
    setModalDate(ymd(d));
  }
  function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }
  function overlaps(a: Booking, b: Booking) {
    return timeToMinutes(a.startTime) < timeToMinutes(b.endTime) && timeToMinutes(a.endTime) > timeToMinutes(b.startTime);
  }
  function addBooking(b: Booking) {
    const conflicts = bookings.filter((x) => x.date === b.date && overlaps(x, b));
    if (conflicts.length > 0) {
      alert("That time slot is already booked or overlaps an existing appointment.");
      return;
    }
    setBookings((prev) => [...prev, b]);
  }

  const bookingsByDay = React.useMemo(() => {
    const m = new Map<string, Booking[]>();
    for (const b of bookings) {
      if (!m.has(b.date)) m.set(b.date, []);
      m.get(b.date)!.push(b);
    }
    for (const [, arr] of m) arr.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
    return m;
  }, [bookings]);

  const monthLabel = viewDate.toLocaleDateString(undefined, { month: "long" });
  const yearLabel = viewDate.getFullYear();

  return (
    <section className="w-full rounded-2xl bg-[#F3EFE8] p-4 mb-24 sm:p-5">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-4 shadow ring-1 ring-slate-200 sm:p-6">
        {/* Top bar */}
        <div className="mb-4 flex flex-wrap items-center gap-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewDate((d) => addMonths(d, -1))}
              aria-label="Prev Month"
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-slate-50"
            >
              <span className="text-lg"><ChevronLeft /></span>
            </button>
            <div className="text-xl font-bold text-slate-900">{monthLabel}</div>
            <div className="text-xl font-bold text-slate-900">{yearLabel}</div>
            <button
              onClick={() => setViewDate((d) => addMonths(d, 1))}
              aria-label="Next Month"
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-slate-50"
            >
              <span className="text-lg"><ChevronRight /></span>
            </button>
          </div>
          <div className="flex items-center rounded-full bg-slate-100 p-1 text-lg font-semibold text-slate-600">
            <button className="rounded-full px-3 py-1 hover:text-slate-900">Year</button>
            <button className="rounded-full px-3 py-1 hover:text-slate-900">Month</button>
            <button className="rounded-full bg-white px-3 py-1 text-slate-900 shadow">Day</button>
          </div>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-slate-100 py-6 text-center text-[16px] font-medium text-slate-500">
          {WEEKDAYS.map((w) => (
            <div key={w} className="px-1">{w}</div>
          ))}
        </div>

        {/* Month grid */}
        <div className="mt-2 grid grid-cols-7 gap-2 sm:gap-3">
          {grid.map((d, i) => {
            const inMonth = d.getMonth() === viewDate.getMonth();
            const key = ymd(d);
            const dayBookings = bookingsByDay.get(key) || [];
            const isToday = key === ymd(new Date());

            return (
              <button
                key={i}
                onClick={() => openModal(d)}
                className={cn(
                  "relative min-h-[84px] rounded-sm border border-slate-200 bg-white p-2 text-left transition hover:shadow-sm",
                  !inMonth && "bg-slate-50 text-slate-400",
                  isToday && "ring-2 ring-indigo-500",
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={cn("text-sm font-semibold", !inMonth && "text-slate-400")}>{d.getDate()}</span>
                </div>

                {/* BOOKED indicator pills  */}
                {dayBookings.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(3, dayBookings.length) }).map((_, idx) => (
                        <span
                          key={idx}
                          className="inline-block h-4 w-4 rounded-full bg-slate-300 ring-2 ring-white"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span className="text-[12px] font-semibold text-slate-700">
                      {dayBookings.length > 1 ? `${dayBookings.length}+ Booked` : "Booked"}
                    </span>
                  </div>
                )}
                <span className="pointer-events-none absolute inset-0 rounded-xl focus-visible:outline focus-visible:outline-indigo-500" />
              </button>
            );
          })}
        </div>
      </div>

      <BookingModal
        open={modalDate !== null}
        date={modalDate ?? ymd(new Date())}
        onClose={() => setModalDate(null)}
        onSubmit={addBooking}
      />
    </section>
  );
};

export default FullWidthBookingCalendar;
