// components/AdditionalAddOns.tsx
"use client";

import React from "react";

const addOns = [
  {
    title: "Initial Registration fee",
    desc: "Only applies if initial bulk registrations are required.",
  },
  {
    title: "Additional sales channels",
    desc: "Applies if you have more other sales channels (beyond Shopify).",
  },
  {
    title: "High-volume adjustment",
    desc: "Apply only for additional 10,000 orders processed per month (if exceeding 20,000).",
  },
];

const AdditionalAddOns: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left column – text + list */}
        <div className="w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Additional Add-Ons &
            <br />
            Notes
          </h2>

          <div className="space-y-5">
            {addOns.map((item) => (
              <div key={item.title} className="flex gap-3">
                {/* colored square bullet */}
                <span className="mt-1 h-6 w-6 flex-none rounded-sm bg-[#CDFFFB]" />
                <div>
                  <p className="text-md font-semibold text-black">
                    {item.title}
                  </p>
                  <p className="mt-4 text-base text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 inline-flex items-center rounded-full bg-black px-8 py-4 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800">
            Request demo
          </button>
        </div>

        {/* Right column – light placeholder card */}
        <div className="w-full ">
          <div className="mt-15 h-72 w-full rounded-3xl bg-[#F3F3F3]" />
        </div>
      </div>
    </section>
  );
};

export default AdditionalAddOns;
