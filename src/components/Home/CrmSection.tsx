import React, { JSX } from "react";
import { StatsSection } from "./CrmSection/StatsSection";
import { BenefitsSection } from "./CrmSection/BenefitsSection";


const CrmSection = (): JSX.Element => {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-12 bg-[#F3EFE8] px-6 py-12 sm:px-10 md:gap-[52px] md:py-16 lg:px-16">
      <StatsSection />
      <BenefitsSection />
    </section>
  );
};

export default CrmSection;
