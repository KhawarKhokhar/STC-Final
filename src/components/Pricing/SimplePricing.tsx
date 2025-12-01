// components/SimplePricing.tsx
"use client";

import React from "react";

// Data for bars / labels
const salesData = [
  { label: "Lec", height: 35 },
  { label: "Sed", height: 55 },
  { label: "Molestee", height: 75 },
  { label: "Cursus", height: 90 },
  { label: "Exit", height: 100 },
];

const SimplePricing: React.FC = () => {
  return (
    <section className="w-full bg-[#F3EFE8] px-6 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left copy */}
        <div className="w-full max-w-xl space-y-6 lg:w-1/2">
          <h2 className="text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl lg:text-[52px] lg:leading-[1.1]">
            Simple pricing
            <br />
            for your Business
          </h2>

          <p className="text-sm leading-relaxed text-[#6B7280] sm:text-lg">
            Our pricing covers complete U.S. sales tax compliance, monthly/
            quarterly filings, including ongoing state registrations, notices
            management, audit defense, and general compliance support.
          </p>
        </div>

        {/* Right visual panel */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="w-full max-w-md rounded-4xl bg-[#FFFBED] p-8 sm:p-10 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
            {/* Inner card */}
            <div className="w-full rounded-3xl bg-white p-5 sm:p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] border border-gray-100 flex flex-col space-y-6">
              {/* Card Header */}
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-500">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8H11V7h2v2z" />
                  </svg>
                </div>
                <p className="text-xl font-medium ">Sales Report</p>
              </div>

              {/* Sales value */}
              <p className="pl-1 text-2xl text-gray-900 sm:text-3xl">
                $132,3212
              </p>

              {/* Graph Area */}
              <div className="relative w-full h-40 pt-2">
                {/* baseline */}
                <div className="absolute inset-x-4 bottom-0 h-px bg-gray-200" />

                {/* Bars */}
                <div className="absolute inset-x-4 bottom-0 flex h-full items-end justify-between gap-2">
                  {salesData.map((data, index) => {
                    const opacities = [0.25, 0.4, 0.6, 0.8, 1];
                    return (
                      <div
                        key={data.label}
                        className="w-8 sm:w-13 rounded-xl bg-[#3DD3CE] transition-all duration-700"
                        style={{
                          height: `${data.height}%`,
                          opacity: opacities[index % opacities.length],
                        }}
                      />
                    );
                  })}
                </div>

                {/* Line overlay */}
                <div className="absolute inset-x-4 top-10 bottom-6 pointer-events-none">
                  <img
                    src="/assets/icons/graph-line.svg"
                    className="h-full w-full object-contain"
                    alt="Trend line"
                  />
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-xs font-semibold text-gray-500 pt-1">
                {salesData.map((data) => (
                  <span
                    key={data.label}
                    className={
                      data.label === "Molestee" ? "text-teal-600" : undefined
                    }
                  >
                    {data.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplePricing;
