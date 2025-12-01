"use client";

import React from "react";
import { Check, Minus, Shield, ChevronDown } from "lucide-react";

/* ---------------- Types ---------------- */
type Billing = "monthly" | "yearly";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly?: number; // if omitted, auto-calc 2 months free
  highlight?: boolean;
};

type FeatureRow = {
  label: string;
  values: (boolean | string | number)[];
};

/* ---------------- Data ---------------- */
const plans: Plan[] = [
  { id: "promax", name: "Pro Max", tagline: "First Priority Support", priceMonthly: 99.49 },
  { id: "pro", name: "Pro", tagline: "First Priority Support", priceMonthly: 59.49, highlight: true },
  { id: "lite", name: "Lite", tagline: "First Priority Support", priceMonthly: 29.49 },
];

const features: FeatureRow[] = [
  { label: "Custom Domain", values: [true, true, true] },
  { label: "Free 1 Year Domain", values: [true, true, true] },
  { label: "SSL", values: [true, true, true] },
  { label: "Bandwith", values: ["Unlimited", "Unlimited", "2 GB"] },
  { label: "Storage Space", values: ["35 GB", "25 GB", "10 GB"] },
  { label: "Email Account", values: ["Unlimited", 50, 20] },
  { label: "Site Booster", values: [true, true, false] },
];

/* ---------------- Helpers ---------------- */
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const Price: React.FC<{ amount: number }> = ({ amount }) => (
  <div>
    <div className="text-slate-800 text-xl md:text-2xl font-bold tracking-tight">
      US$ {amount.toFixed(2)}
    </div>
    <div className="text-[10px] uppercase tracking-wide text-slate-400 mt-1">Per Month</div>
  </div>
);

const ValueCell: React.FC<{ v: FeatureRow["values"][number] }> = ({ v }) => {
  if (typeof v === "boolean") {
    return (
      <div className="flex items-center justify-center">
        {v ? <Check className="h-4 w-4 text-emerald-600" /> : <Minus className="h-4 w-4 text-rose-500" />}
      </div>
    );
  }
  return <div className="text-center text-slate-700 text-sm">{v}</div>;
};

/* ---------------- Component ---------------- */
const PlanComparisonTable: React.FC = () => {
  const [billing, setBilling] = React.useState<Billing>("monthly");

  const computed = (p: Plan) => {
    if (billing === "monthly") return p.priceMonthly;
    const yearly = p.priceYearly ?? p.priceMonthly * 10; // 2 months free default
    return yearly / 12; // show monthly equivalent
  };

  return (
    <section className="relative isolate mt-8 px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900">
          Find the <span className="text-[#86dfd9]">Smartest</span> Tax
          <br />
          <span className="text-[#86dfd9]">Strategy</span> for Your Business
        </h2>
        <p className="mt-3 text-base sm:text-lg max-w-2xl mx-auto text-slate-600">
          Ohorat gives you 1000s of templates, unlimited pages & top grade hosting FREE. Upgrade to Premium and get
          even more.
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto mt-8 md:mt-20 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-md backdrop-blur">
        {/* top controls & columns prices */}
        <div className="grid grid-cols-12 mt-5 p-8">
          {/* left sidebar */}
          <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-slate-200 p-4 sm:p-5 space-y-5">
            <div>
              <div className="text-xs font-semibold text-slate-600">Select Plan</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-sm">
                <span>{billing === "monthly" ? "Monthly Plan" : "Yearly Plan"}</span>
                <button
                  onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                  className="grid h-6 w-6 place-items-center rounded-md bg-slate-50 text-slate-700"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#86dfd9] text-emerald-700">
                <Shield />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Fast, Secure</div>
                <div className="-mt-0.5">and Affordable</div>
              </div>
            </div>
          </div>

          {/* plan headers */}
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "relative col-span-12 md:col-span-3 border-b md:border-b-0 border-slate-200 p-5 text-center",
                // reserve vertical space for the badge on small screens too so it doesn't overlap
                p.highlight ? "pt-10 md:pt-5" : ""
              )}
            >
              {/* Absolute Highlight Background (fills this cell) */}
              {p.highlight && (
                <div className="absolute h-70 -top-20 inset-0 -z-10 rounded-2xl bg-[#86dfd9]/50" />
              )}

              {/* Best Value badge */}
              {p.highlight && (
                <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 rounded-xl bg-[#fff2d0] text-black text-[11px] sm:text-xs font-bold px-4 sm:px-6 py-1.5 sm:py-2 shadow whitespace-nowrap">
                  Best Value
                </div>
              )}

              {/* Card Content */}
              <div className="text-lg font-bold text-slate-900">{p.name}</div>
              <div className="text-xs text-slate-500 mt-1">{p.tagline}</div>
              <div className="mt-4 md:mt-6">
                <Price amount={computed(p)} />
              </div>
            </div>
          ))}
        </div>

        {/* features table */}
        <div className="mt-10 sm:mt-14 px-2 sm:px-4">
          <div className="space-y-2">
            {features.map((row, idx) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-12 items-center",
                  idx % 2 === 0 ? "bg-[#86dfd9]/20 rounded-2xl px-2 sm:px-3" : "bg-white/50 px-2 sm:px-3"
                )}
              >
                <div className="col-span-12 md:col-span-3 p-3 sm:p-4">
                  <div className="text-sm font-bold text-slate-700">{row.label}</div>
                </div>

                {row.values.map((v, i) => (
                  <div key={i} className="col-span-12 md:col-span-3 p-3 sm:p-4">
                    <ValueCell v={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <hr className="mx-2 sm:mx-4 mt-6 mb-30" />
      </div>
    </section>
  );
};

export default PlanComparisonTable;
