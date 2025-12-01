// components/SalesTaxPricingPlans.tsx
"use client";

import React from "react";

type Plan = {
  id: string;
  name: string;
  statesRange: string;
  price: string;
  shortStates: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    statesRange: "Less than 5 states",
    price: "$200",
    shortStates: "Less than 5 states",
    features: [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Returns & Payments",
      "Regular ongoing support",
    ],
  },
  {
    id: "essentials",
    name: "Esentials",
    statesRange: "5–10 states",
    price: "$300",
    shortStates: "5–10 states",
    features: [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Returns & Payments",
      "Regular ongoing support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    statesRange: "10–15 states",
    price: "$400",
    shortStates: "10–15 states",
    features: [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Returns & Payments",
      "Regular ongoing support",
    ],
  },
  {
    id: "pro2",
    name: "Pro2",
    statesRange: "15–20 states",
    price: "$500",
    shortStates: "15–20 states",
    features: [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Returns & Payments",
      "Regular ongoing support",
    ],
  },{
    "id": "pro3",
    "name": "Pro3",
    "statesRange": "20-30 states",
    "price": "$600",
    "shortStates": "20-30 states",
    "features": [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Retrns & Payments",
      "Regular ongoing support"
    ]
  },
  {
    "id": "pro4",
    "name": "Pro4",
    "statesRange": "30-40 states",
    "price": "$700",
    "shortStates": "30-40 states",
    "features": [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Retrns & Payments",
      "Regular ongoing support"
    ]
  },
  {
    "id": "proplus",
    "name": "ProPlus",
    "statesRange": "40+ states",
    "price": "$800",
    "shortStates": "40+ states",
    "features": [
      "Filing Sales Tax Returns",
      "New Registrations",
      "Acquiring Exemption Certificates",
      "Handling State’s Notices",
      "Regular Online accounts review",
      "Responding to state queries",
      "Handling sales tax Audits",
      "Saved copies of Returns & Payments",
      "Regular ongoing support"
    ]
  }
];

const gradientBg =
  "bg-[radial-gradient(circle_at_top_left,rgba(252,211,77,0.45)_0,transparent_55%)_,_radial-gradient(circle_at_center,rgba(45,212,191,0.45)_0,transparent_55%)_,_radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.4)_0,transparent_55%)]";

  const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgb(236,237,244) 1px, transparent 2px),
    linear-gradient(to bottom, rgb(236,237,244) 1px, transparent 2px)
  `,
  backgroundSize: "440px 200px", // ← Border visible always
} as React.CSSProperties;


const SalesTaxPricingPlans: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
    style={gridBackgroundStyle}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="px-5 py-6 sm:px-8">
          <h2 className="text-2xl font-mediumnt- text-slate-900 sm:text-4xl">
            SalesTaxService Pricing Plans
          </h2>
          <p className="mt-2 text-md text-slate-600 leading-relaxed">
            Our fees scale based on the number of registered states, reflecting
            the complexity of multi-state management. All plans include up to
            20,000 orders per month, with no hidden charges—pay only for what
            you need.
          </p>
        </div>

        {/* Plans */}
       <div className="border border-[#FF9831]">


          {plans.map((plan) => (
            <article
              key={plan.id}
              className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-6 lg:flex-row lg:items-stretch 
              hover:bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.35)_0%,rgba(253,230,138,0.35)_40%,transparent_75%)] transition-colors duration-300"
            >
              {/* Left: icon + name + range */}
              <div className="flex w-full max-w-[140px] flex-col items-start gap-4 lg:w-1/5">
                <div className="mt-1 h-10 w-10 rounded-sm bg-[#ECEDF4] shadow-inner" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-md text-slate-500">
                    {plan.statesRange}
                  </p>
                </div>
              </div>

              {/* Middle: includes + gradient feature area */}
              <div className="flex-1 lg:w-3/5 ml-10">
                <p className="mb-5 text-md font-semibold uppercase tracking-wide text-slate-500">
                  Includes
                </p>

                
                  <ul className="space-y-2 text-xs text-slate-700 sm:text-base">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-[5px] h-4 w-4 flex-none rounded-sm bg-[#ECEDF4]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              

              {/* Right: price + CTA */}
              <div className="flex w-full flex-row items-start  gap-3 lg:w-1/5 lg:flex-col lg:items-end">
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-900 sm:text-3xl">
                    {plan.price}
                    <span className="ml-1 text-base font-normal text-slate-500">
                      /month
                    </span>
                  </p>
                  <p className="mt-1 text-base text-slate-500">
                    {plan.shortStates}
                  </p>
                </div>
                <button className="mt-3 rounded-full bg-slate-900 px-10 py-4 text-xs font-semibold text-white shadow-sm hover:bg-slate-800">
                  Start free trial
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesTaxPricingPlans;
