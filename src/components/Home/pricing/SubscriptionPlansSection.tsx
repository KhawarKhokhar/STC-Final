"use client";

import React, { JSX, useState } from "react";
import { CheckCircle } from "lucide-react";

export const SubscriptionPlansSection = (): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const planData = [
    {
      name: "Basic",
      price: "9.9",
      features: [
        "Basic HR features to manage employee",
        "Suitable for organization with a limited number of employee",
        "Access to essential reporting and analytics tools",
      ],
      isRecommended: false,
      isDark: false,
    },
    {
      name: "Premium",
      price: "29.9",
      features: [
        "Advanced functionalities for employee performance tracking & goal setting",
        "Integration with popular HR software and tools for seamless data management",
        "Access to essential reporting and analytics tools",
      ],
      isRecommended: true,
      isDark: true,
    },
    {
      name: "Advanced",
      price: "89.9",
      features: [
        "Advanced HR analytics and predictive insight",
        "24/7 priority customer support and dedicated customer success manager",
        "Rebust security and compliance measures to protect sensitive HR data",
      ],
      isRecommended: false,
      isDark: false,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-16 md:gap-[100px] relative w-full px-4 sm:px-6 lg:px-8 pb-20 overflow-x-hidden">
      {/* Billing Period Toggle */}
      <div
        className="relative inline-flex items-center bg-[#e4e2df] rounded-[100px] p-2"
        role="tablist"
        aria-label="Billing period selection"
      >
        {/* Slider background */}
        <span
          className={`absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] rounded-[40px] bg-[#2B2B2B] transition-transform duration-300 ease-in-out`}
          style={{
            transform:
              selectedPlan === "yearly" ? "translateX(100%)" : "translateX(0%)",
          }}
        />

        {/* Monthly Button */}
        <button
          className={`relative z-10 inline-flex items-center justify-center w-[150px] sm:w-[180px] px-4 py-3 sm:px-10 sm:py-4 rounded-[40px] transition-colors duration-300 text-sm sm:text-base ${
            selectedPlan === "monthly" ? "text-white" : "text-[#2a2a2a]"
          }`}
          onClick={() => setSelectedPlan("monthly")}
          role="tab"
          aria-selected={selectedPlan === "monthly"}
          aria-controls="pricing-plans"
        >
          Monthly
        </button>

        {/* Yearly Button */}
        <button
          className={`relative z-10 inline-flex items-center justify-center w-[150px] sm:w-[180px] px-4 py-3 sm:px-10 sm:py-4 rounded-[40px] transition-colors duration-300 text-sm sm:text-base ${
            selectedPlan === "yearly" ? "text-white" : "text-[#2a2a2a]"
          }`}
          onClick={() => setSelectedPlan("yearly")}
          role="tab"
          aria-selected={selectedPlan === "yearly"}
          aria-controls="pricing-plans"
        >
          Yearly
        </button>

        {/* Promo Image (unchanged position) */}
        <img
          src="/assets/images/hero/save30.png"
          alt="Save 30% Promo"
          width={100}
          height={60}
          className="absolute -right-2.5 top-[-50px] sm:right-[-120px] sm:top-[80%] sm:translate-y-[-20%] w-24 sm:w-[147px]"
        />
      </div>

      {/* Pricing Plans Container */}
      <div
        className="relative w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-0"
        id="pricing-plans"
        role="tabpanel"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {planData.map((plan, index) => (
            <article
              key={plan.name}
              className={`flex flex-col items-start justify-start gap-9 px-6 py-8 sm:p-10 relative w-full 
                ${
                  plan.isRecommended
                    ? "bg-[#2B2B2B] h-auto lg:h-[592px] p-6 sm:p-10 border-4 border-transparent lg:z-10 rounded-3xl shadow-2xl"
                    : "bg-[#e4e2df] h-auto lg:h-[538px]"
                }
                
                ${
                  index === 0
                    ? // Basic Plan: Rounded on all sides on mobile, rounded only on left for desktop
                      "rounded-3xl lg:rounded-[24px_0px_0px_24px]"
                    : index === 1
                    ? // Premium Plan: Rounded on all sides on mobile, full square on desktop to "pop" out
                      "rounded-3xl lg:rounded-[20px] lg:mt-[-27px] lg:mb-[-27px]"
                    : // Advanced Plan: Rounded on all sides on mobile, rounded only on right for desktop
                      "rounded-3xl lg:rounded-[0px_24px_24px_0px]"
                }
              `}
            >
              <header className="flex flex-col items-start gap-6 relative w-full">
                <h3
                  className={`relative font-bold text-2xl tracking-[0] leading-8 ${
                    plan.isDark ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="flex items-end gap-0.5 relative w-full">
                  {/* Currency Symbol */}
                  <div className="relative w-4">
                    <span
                      className={`absolute top-[-60px] left-0 sm:left-auto sm:right-0 font-medium text-2xl tracking-[0] leading-8 whitespace-nowrap ${
                        plan.isDark ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      $
                    </span>
                  </div>

                  {/* Price */}
                  <span
                    className={`relative w-fit -mt-px font-medium text-5xl tracking-[0] leading-[60px] whitespace-nowrap ${
                      plan.isDark ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {plan.price}
                  </span>

                  {/* Period */}
                  <div className="inline-flex flex-col h-12 items-start justify-center px-0 py-6 relative shrink-0">
                    <span
                      className={`relative w-fit mt-[-15.00px] mb-[-13.00px] font-medium text-base tracking-[-0.50px] leading-6 whitespace-nowrap ${
                        plan.isDark ? "text-white/50" : "text-[#282828]"
                      }`}
                    >
                      /Month
                    </span>
                  </div>
                </div>

                {/* Trial Button */}
                <div className="relative w-full p-0.5 rounded-[20px] overflow-hidden">
                  {/* Spinning Border - Only for the Recommended Plan */}
                  <span
                    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
             bg-[conic-gradient(from_90deg_at_50%_50%,#6049F4_0%,#ED7454_50%,#6049F4_100%)]"
                  />

                  {/* Button */}
                  <button
                    className={`relative flex flex-col items-center justify-center gap-2.5 
    px-6 py-4 w-full rounded-[20px] 
    hover:scale-[1.02] hover:border-gray-400
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${index === 1 ? "bg-white" : "bg-black"}`}
                    aria-label={`Start free trial for ${plan.name} plan`}
                  >
                    <span
                      className={`relative w-fit font-normal text-lg leading-[27px] whitespace-nowrap
      ${index === 1 ? "text-black" : "text-white"}`}
                    >
                      Start Free Trial
                    </span>
                  </button>
                </div>
              </header>

              <hr
                className={`w-full ${
                  plan.isDark ? "border-white/20" : "border-black/20"
                }`}
              />

              {/* Features List */}
              <ul
                className="flex flex-col items-start gap-6 relative w-full"
                role="list"
              >
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 relative w-full"
                  >
                    <CheckCircle
                      className={`relative! w-5! h-5! shrink-0 ${
                        plan.isDark ? "text-white" : "text-[#282828]"
                      }`}
                      aria-hidden="true"
                    />

                    <p
                      className={`relative flex-1 font-medium text-sm tracking-[0] leading-6 ${
                        plan.isDark ? "text-white" : "text-[#282828]"
                      }`}
                    >
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Recommended Badge */}
              {plan.isRecommended && (
                <span
                  className="all-[unset] box-border inline-flex items-center gap-2.5 px-6 py-2 absolute top-4 right-4 lg:top-[9px] lg:right-[9px] rounded-full overflow-hidden bg-[linear-gradient(253deg,rgba(96,73,244,1)_0%,rgba(237,116,84,1)_100%)]"
                  aria-label="Recommended plan"
                >
                  <span className="relative w-fit font-medium text-sm text-white whitespace-nowrap">
                    Recommended
                  </span>
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
