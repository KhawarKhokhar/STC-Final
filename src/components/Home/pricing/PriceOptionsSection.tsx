import React, { JSX } from "react";

export const PricingOptionsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative w-full">
      {/* Badge */}
      <span 
        className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-bold text-white bg-linear-to-r from-pink-700 to-purple-800 rounded-full tracking-widest mb-4 shadow-xl cursor-default"
      >
        PLAN PACKAGE
      </span>

      {/* Heading */}
      <h2 className="font-normal text-[#2a2a2a] text-2xl sm:text-4xl md:text-5xl lg:text-[56px] text-center tracking-tight leading-snug">
        Affordable Pricing Options
      </h2>

      {/* Paragraph */}
      <p className="max-w-4xl mx-auto font-normal text-[#2a2a2a] text-sm sm:text-lg md:text-xl text-center leading-relaxed px-2">
        ANASAEA is committed to art democratization, and we will always have a
        free-of-charge package with no obligation to sell. The below packages
        reflect <br className="hidden md:block"/> that commitment and give additional choices to artists whose Art
        is their livelihood.
      </p>
    </section>
  );
};
