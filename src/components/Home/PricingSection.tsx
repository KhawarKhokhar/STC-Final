import React, { JSX } from "react";
import Image from "next/image"; // ✅ Next.js Image
import { PricingOptionsSection } from "./pricing/PriceOptionsSection";
import { SubscriptionPlansSection } from "./pricing/SubscriptionPlansSection";


const PricingSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center bg-[#F3EFE8] py-5 pb-5 px-5 relative">
      <PricingOptionsSection />
      <SubscriptionPlansSection />
    </div>
  );
};

export default PricingSection