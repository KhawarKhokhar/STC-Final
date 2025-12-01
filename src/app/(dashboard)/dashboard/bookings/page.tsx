"use client";

import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Star,
  Upload,
} from "lucide-react";

type EventBlock = {
  id: number;
  start: string;
  end: string;
  title: string;
  subtitle?: string;
  color: "green" | "blue";
  durationLabel: string;
  position: "top" | "mid" | "bottom";
};

type Person = {
  id: number;
  name: string;
  email: string;
  hasAlert?: boolean;
};

type ScheduleItem = {
  id: number;
  title: string;
  type: "Task" | "Meeting";
  time: string;
  dateLabel: string;
  link?: string;
};

type NoteItem = {
  id: number;
  date: string;
  title: string;
  body: string;
  pinned?: boolean;
};

const people: Person[] = [
  { id: 1, name: "Penny Hale", email: "penny@hale.com", hasAlert: true },
  { id: 2, name: "Arnav Holcomb", email: "arnav215@email.com" },
  { id: 3, name: "Sultan Huerta", email: "huertasim@email.com", hasAlert: true },
  { id: 4, name: "Sultan Huerta", email: "huertasim@email.com" },
  { id: 5, name: "Sultan Huerta", email: "huertasim@email.com" },
];

const events: EventBlock[] = [
  {
    id: 1,
    start: "8.15 am",
    end: "9.15 am",
    title: "Briefing task valend company",
    durationLabel: "1 hours",
    color: "green",
    position: "top",
  },
  {
    id: 2,
    start: "9.30 am",
    end: "10.00 am",
    title: "Daily meeting sira agency",
    durationLabel: "30 minutes",
    color: "blue",
    position: "top",
  },
  {
    id: 3,
    start: "10.00 am",
    end: "11.00 am",
    title: "Meeting with simon alexander",
    durationLabel: "1 hours",
    color: "blue",
    position: "mid",
  },
  {
    id: 4,
    start: "12.00 am",
    end: "2.30 pm",
    title: "Design website for valend company",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus.",
    durationLabel: "2 hours 30 minutes",
    color: "green",
    position: "mid",
  },
  {
    id: 5,
    start: "3.00 pm",
    end: "3.30 pm",
    title: "Update progress",
    durationLabel: "30 minutes",
    color: "green",
    position: "bottom",
  },
  {
    id: 6,
    start: "4.00 pm",
    end: "4.30 pm",
    title: "Update progress",
    durationLabel: "30 minutes",
    color: "green",
    position: "bottom",
  },
];

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    title: "Create documentation project",
    type: "Task",
    time: "12.30 PM - 13.30 PM",
    dateLabel: "Mon, 7 January 2022",
  },
  {
    id: 2,
    title: "Meeting with clients",
    type: "Meeting",
    time: "12.30 PM - 13.30 PM",
    dateLabel: "www.zuxum.com/sbfjsaueygobalv",
    link: "https://www.zuxum.com/sbfjsaueygobalv",
  },
];

const notes: NoteItem[] = [
  {
    id: 1,
    date: "3 January 2022",
    title: "",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus iaculis tortor non molestie.",
    pinned: true,
  },
  {
    id: 2,
    date: "27 December 2021",
    title: "",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus iaculis tortor non molestie.",
  },
  {
    id: 3,
    date: "27 December 2021",
    title: "",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus iaculis tortor non molestie.",
  },
];

const timeSlots = [
  "8.00 am",
  "9.00 am",
  "10.00 am",
  "11.00 am",
  "12.00 am",
  "1.00 pm",
  "2.00 pm",
  "3.00 pm",
  "4.00 pm",
  "5.00 pm",
];

const badgeColor = {
  green: "bg-[#DDF5DE] text-[#1E7E34]",
  blue: "bg-[#E3EBFF] text-[#2643E9]",
};

const blockColor = {
  green: "bg-[#E9F9EB] border-[#C6E8CB]",
  blue: "bg-[#E5EBFF] border-[#C9D4FF]",
};

export default function SchedulePage() {
  return (
    <div className="h-full w-full flex justify-center">
      <div className="max-w-full w-full h-full px-2">
        <div className="h-full w-full rounded-3xl flex gap-6">
          {/* LEFT COLUMN: Calendar + People */}
          <div className="w-72 flex flex-col gap-6">
            {/* Month / Calendar */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  February 2022
                </h2>
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calendar grid (static mock) */}
              <div className="rounded-2xl bg-white p-4">
                <div className="grid grid-cols-7 text-[11px] mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <span key={d} className="text-center">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1 text-xs">
                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = day === 24;
                    const isAccent = day === 7;
                    return (
                      <button
                        key={day}
                        className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center ${
                          isSelected
                            ? "bg-white text-slate-900 font-semibold"
                            : isAccent
                            ? "border border-slate-300"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* People list */}
            <section className="flex-1 flex flex-col">
              <div className="rounded-3xl bg-white h-full flex flex-col p-4">
                {/* Search */}
                <div className="my-3 ">
                  <div className="flex items-center gap-2 bg-[#F5F6F8] rounded-sm px-3 py-2 text-xs text-slate-400">
                    <span className="text-sm">🔍</span>
                    <input
                      placeholder="Search people"
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* People */}
                <div className="space-y-4 overflow-y-auto">
                  {people.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-2xl bg-white px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#E4E4E4]" />
                        <div>
                          <p className="text-xs font-medium text-slate-900">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {p.email}
                          </p>
                        </div>
                      </div>
                      {p.hasAlert && (
                        <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* MIDDLE COLUMN: Timeline */}
          <div className="flex-1 flex flex-col">
            {/* Day / range tabs + actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {["Day", "Week", "Month", "Year"].map((tab) => {
                  const active = tab === "Day";
                  return (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-md text-xs font-medium ${
                        active
                          ? "bg-[#0F172A] text-white"
                          : "border text-slate-500"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded- border border-slate-200 flex items-center justify-center text-slate-500">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 rounded-md border border-slate-200 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Timeline card */}
            <div className="flex-1 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex overflow-hidden">
              {/* Time column */}
              <div className="w-24 border-r border-slate-100 text-[11px] text-slate-400 py-4">
                <div className="h-8 px-4 flex items-center font-semibold text-slate-500">
                  Time
                </div>
                {timeSlots.map((t) => (
                  <div
                    key={t}
                    className="h-14 px-4 flex items-start pt-2 border-t border-slate-100"
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Day timeline */}
              <div className="flex-1 relative py-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 h-8 mb-2">
                  <div className="text-[11px] text-slate-400">Thursday</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    24
                  </div>
                </div>

                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 top-8 bottom-0">
                  {timeSlots.map((_, idx) => (
                    <div
                      key={idx}
                      className="border-t border-slate-100 h-14"
                    />
                  ))}
                </div>

                {/* Events */}
                <div className="relative h-full px-4 space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="relative">
                      <div
                        className={`mt-2 rounded-2xl border px-4 py-2 text-xs shadow-sm ${
                          blockColor[event.color]
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {event.position === "mid" && (
                              <span className="h-7 w-7 rounded-full bg-[#0F172A] text-[11px] text-white flex items-center justify-center">
                                V
                              </span>
                            )}
                            <p className="font-medium text-slate-900">
                              {event.title}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] ${badgeColor[event.color]}`}
                          >
                            {event.durationLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {event.start} - {event.end}
                        </p>
                        {event.subtitle && (
                          <p className="mt-2 text-[11px] text-slate-500">
                            {event.subtitle}
                          </p>
                        )}
                        {event.position === "mid" && (
                          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Team</span>
                            <div className="flex -space-x-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className="h-5 w-5 rounded-full border-2 border-[#E9F9EB] bg-slate-300"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Schedule + Notes */}
          <div className="w-80 flex flex-col gap-6">
            {/* Schedule header */}
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-slate-900">
                Schedule
              </h3>
              <button className="flex items-center border px-3 py-1.5 rounded-md gap-1 text-xs text-slate-500">
                <Plus className="w-3 h-3" />
                Create
              </button>
            </div>

            {/* Schedule cards */}
            <section className="space-y-3">
              {scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md bg-white px-6 py-4 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-[#DDF5DE] text-[10px] text-[#1E7E34]">
                      {item.type === "Task" ? "Task" : "Meeting"}
                    </span>
                    <button className="text-slate-400">
                      <span className="text-lg leading-none">⋯</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-900 mt-1">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-6">
                    {item.time}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.dateLabel}
                  </p>
                </div>
              ))}
            </section>

            {/* Notes header */}
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-md text-slate-900">Notes</h3>
              <button className="text-slate-400 text-lg leading-none">
                ⋯
              </button>
            </div>

            {/* Notes list */}
            <section className="space-y-3 flex-1 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-md bg-white px-6 py-4 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold">
                      {note.date}
                    </p>
                    {note.pinned && (
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-600 mt-3">
                    {note.body}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
