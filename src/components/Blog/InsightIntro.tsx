// app/components/InsightIntro.tsx
"use client";

import React from "react";

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[#3DD3CE]">{children}</span>
);

const InsightIntro: React.FC = () => {
  return (
    <section className="relative isolate px-6 py-12 sm:px-10 md:py-16">
      {/* Headline */}
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl leading-snug text-slate-400 sm:text-4xl md:text-5xl">
          Understanding <H>Tax</H> services doesn’t have to be complicated.
          Through expert written <H>tax insights</H> and practical <H>guides</H>
          , readers can learn how to navigate compliance, <H>optimize</H>{" "}
          <H>deductions</H>, and strengthen their financial strategy with
          confidence.
        </h2>
      </div>

      {/* “Document” box */}
      <div className="mx-auto mt-10 max-w-7xl bg-[url('/assets/images/bg_image.png')] bg-no-repeat bg-cover bg-center rounded-2xl">
        <div className="relative">
          {/* main card */}
          <div className="rounded-4xl h-[360px] md:h-[600px]" />

          {/* bottom-right cutout note */}
          <div className="absolute bottom-0 right-0">
            <div className="px-6 py-4">
              <p className="max-w-xs text-xl text-slate-600">
                Freely handle, suspend, and,<br/> consider the bibendum
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightIntro;
