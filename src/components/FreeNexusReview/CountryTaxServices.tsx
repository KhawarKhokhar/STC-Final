// app/components/CountryTaxServices.tsx
"use client";

import React from "react";
import {
  Building2,
  ShieldCheck,
  UserSquare2,
  Globe2,
  BookText,
  CheckCircle2,
} from "lucide-react";

/* ---------------------- types & helpers ---------------------- */
type Service = {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  blurb: string;
  features: string[];
  icon: React.ReactNode;
};

const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* --------------------------- data ---------------------------- */
const services: Service[] = [
  {
    id: "inc",
    name: "Company Incorporation",
    price: 180,
    subtitle: "Register a new company with guided compliance.",
    blurb:
      "Smooth entity setup, articles drafting and filings handled by pros.",
    features: Array(9).fill(
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis"
    ),
    icon: <Building2 className="h-16 w-16" />,
  },
  {
    id: "corp-sec",
    name: "Corporate Security",
    price: 200,
    subtitle: "24/7 monitoring, audit trails and access control.",
    blurb:
      "It is a long established fact that a reader will be distracted by the readable",
    features: Array(9).fill(
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis"
    ),
    icon: <ShieldCheck className="h-16 w-16" />,
  },
  {
    id: "nominee",
    name: "Nominee Director",
    price: 260,
    subtitle: "Compliant nominee arrangements for local presence.",
    blurb: "Qualified directors to satisfy statutory requirements and banking.",
    features: Array(9).fill(
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis"
    ),
    icon: <UserSquare2 className="h-16 w-16" />,
  },
  {
    id: "mailcom",
    name: "Registered Address Mailcom",
    price: 120,
    subtitle: "Registered address & mail handling services.",
    blurb: "Mail scanning, forwarding and compliance reminders in one place.",
    features: Array(9).fill(
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis"
    ),
    icon: <Globe2 className="h-16 w-16" />,
  },
  {
    id: "acct",
    name: "Accounting & Bookkeeping",
    price: 220,
    subtitle: "Monthly books, GST/VAT and management reports.",
    blurb:
      "Automation-first bookkeeping with expert monthly review and filings.",
    features: Array(9).fill(
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis"
    ),
    icon: <BookText className="h-16 w-16" />,
  },
];

/* ----------------------- mini SVG art ------------------------ */
const TealBuildingArt = () => (
  <svg viewBox="0 0 160 120" className="w-full h-auto">
    <g fill="none" stroke="none">
      <rect
        x="10"
        y="40"
        width="60"
        height="60"
        rx="6"
        fill="#24c6b8"
        opacity=".25"
      />
      <rect x="50" y="20" width="60" height="80" rx="8" fill="#24c6b8" />
      <circle cx="110" cy="90" r="22" fill="white" />
      <path
        d="M110 70c10 0 18 8 18 18 0 12-18 32-18 32S92 100 92 88c0-10 8-18 18-18z"
        fill="#24c6b8"
      />
      <circle cx="110" cy="88" r="6" fill="white" />
      {[30, 44, 58, 72].map((x) => (
        <rect key={x} x="60" y={x} width="18" height="6" rx="2" fill="white" />
      ))}
    </g>
  </svg>
);

/* ------------------------- component ------------------------- */
const CountryTaxServices: React.FC = () => {
  const [activeId, setActiveId] = React.useState<string>(services[1].id); // default: Corporate Security
  const active = services.find((s) => s.id === activeId)!;
  const activeIndex = services.findIndex((s) => s.id === activeId);
  const goToService = (i: number) =>
    setActiveId(services[(i + services.length) % services.length].id);

  return (
    <section className="px-4 md:px-64 py-10">
      {/* Heading */}
      <div>
        <h2 className="text-2xl md:text-4xl font-serif text-slate-900">
          Country wise Tax services
        </h2>
        <p className="mt-2 max-w-3xl text-lg text-slate-600">
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment
        </p>
      </div>

      {/* Icons row */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {services.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-2xl p-20 transition",
                "hover:bg-slate-100",
                active && "bg-white shadow-md ring-1 ring-slate-200"
              )}
            >
              <div className={cn("text-slate-600", active && "text-teal-600")}>
                {s.icon}
              </div>
              <div className="text-center text-lg font-medium text-slate-800">
                {s.name.split(" ").slice(0, 2).join(" ")}
                <br />
                {s.name.split(" ").slice(2).join(" ")}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail cards */}
      <div className="mt-10 rounded-3xl ring-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left card */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-16 flex flex-col items-center justify-center text-center">
            <div className="flex justify-center items-centerw-48 md:w-56">
              <div className={cn("text-slate-600", active && "text-teal-600")}>
                {active.icon}
              </div>
            </div>
            <h3 className="mt-5 text-3xl font-serif text-slate-900">
              {active.name}
            </h3>
            <div className="mt-5 text-teal-600 font-semibold">
              ${active.price}
              <span className="ml-1 text-xs text-slate-500">/month</span>
            </div>
            <p className="mt-2 max-w-xs text-md text-slate-600">
              {active.blurb}
            </p>

            {/* tiny dots (carousel look) */}
            <div className="mt-16 flex items-center justify-center gap-3">
              {/* optional prev/next buttons
  <button onClick={prev} className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100">‹</button>
  */}
              {services.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToService(i)}
                  aria-label={`Show ${s.name}`}
                  className={cn(
                    "h-3 w-3 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "bg-teal-500 scale-110 shadow-sm"
                      : "bg-slate-300 hover:bg-slate-400"
                  )}
                />
              ))}
              {/* <button onClick={next} className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100">›</button> */}
            </div>
          </div>

          {/* Right card */}
          <div className="col-span-2 rounded-2xl bg-[#3DD3CE]/20 ring-slate-200 p-16">
            <div className="text-lg font-semibold text-slate-700">{active.subtitle}</div>
            <hr className="my-4" />

            <ul className="space-y-3">
              {active.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 text-teal-500" />
                  <span className="text-lg text-slate-600">{f}</span>
                </li>
              ))}
            </ul>

            <button className="mt-6 rounded-md bg-teal-500 text-white text-md font-semibold px-4 py-2 hover:bg-teal-600 transition">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryTaxServices;
