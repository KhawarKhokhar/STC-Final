// app/components/DigitalIncorporation.tsx
"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";

type Step = { id: number; label: string; href?: string };

const steps: Step[] = [
  { id: 1, label: "Submit your information" },
  { id: 2, label: "Sign all formation business banking documents" },
  { id: 3, label: "Receive a company ID number from AORA" },
  { id: 4, label: "Start your Singapore company here" },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const BadgeNum: React.FC<{ n: number }> = ({ n }) => (
  <span className="grid h-7 w-7 place-items-center rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
    {n}
  </span>
);

const DigitalIncorporation: React.FC = () => {
  return (
    <section className="relative isolate px-4 sm:px-6 lg:px-20 py-10">
      {/* BG: mint gradient + wavy lines */}
      <div className="bg-[#3DD3CE]/30 rounded-2xl pt-20 pb-5">
        {/* container */}
        <div className="mx-auto max-w-6xl ">
          {/* Top title bar */}
          <div className="text-center text-3xl font-serif text-teal-700 font-medium">
            Tax Calculator
          </div>

          {/* Heading & subtitle */}
          <div className="mt-8">
            <h2 className="text-2xl md:text-4xl text-slate-900">
              100% Digital Incorporation
            </h2>
            <p className="mt-5 text-sm text-slate-600 max-w-2xl">
              It is a long established fact that a reader will be distracted by
              the readable
            </p>
          </div>

          {/* Main cards */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Left: steps */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 sm:p-5">
              <div className="text-2xl font-semibold text-slate-900">
                Home Finance Overview
              </div>
              <p className="mt-1 text-md text-slate-500">
                Digital incorporation, corporate secretary and accounting
                services at your fingertips
              </p>

              <div className="mt-8 space-y-5">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-left hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <BadgeNum n={s.id} />
                      <span className="text-sm font-medium text-slate-800">
                        {s.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right column: loan panel + review section */}
            <div className="flex flex-col gap-5">
              {/* Loan panel */}
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 sm:p-5 flex-1">
                <div className="text-2xl font-semibold text-slate-900">
                  Home Co. Monalisa
                </div>
                <p className="mt-1 text-md text-slate-500">
                  To manage your payment, see statements or update your info
                  continue to Home Co.
                </p>

                {/* Mini account tile */}
                <div className="mt-8 rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-100 text-teal-700">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Loan 10290
                      </div>
                      <div className="text-xs text-slate-500">
                        Monthly payment:{" "}
                        <span className="text-teal-600 font-medium">
                          $380,000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button className="mt-4 w-full rounded-md bg-teal-500 text-white py-2.5 text-sm font-semibold hover:bg-teal-600 transition">
                  Make a Payment
                </button>
                <button className="mt-3 w-full rounded-md border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Manage My Mortgage
                </button>
              </div>
              <div className="text-slate-800 text-xl font-semibold">
                Review home finance topics
              </div>
              {/* Review section */}
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-3 sm:p-4">
                <div className="rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-500 text-white text-sm">
                      ▶
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900">
                        Simulate home value changes
                      </div>
                      <div className="text-xs text-slate-500">
                        Current estimate:{" "}
                        <span className="text-teal-600 font-medium">
                          $454,000
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalIncorporation;
