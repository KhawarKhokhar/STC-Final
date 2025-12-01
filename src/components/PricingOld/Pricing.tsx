"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type BillingCycle = "monthly" | "annual";

type Tier = {
  id: string;
  name: string;
  priceMonthly?: number;
  priceAnnual?: number;
  perks?: string[];
  highlight?: boolean;
  badgeText?: string;
};

const tiers: Tier[] = [
  {
    id: "base",
    name: "Base",
     priceMonthly: 25,
    priceAnnual: 25 * 12 - 24,
    perks: [
      "Speed Up to 5 Mbps",
      "12 Hours Service",
      "HD YouTube",
      "Basic Analytics",
      "Email Support",
      "Community Access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 25,
    priceAnnual: 25 * 12 - 24,
    perks: [
      "Speed Up to 10 Mbps",
      "18 Hours Service",
      "Buffer Free YouTube",
      "Priority Support",
      "Usage Insights",
      "Custom Alerts",
    ],
    badgeText: "Save $24",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 45,
    priceAnnual: 45 * 12 - 60,
    perks: [
      "Speed Up to 15 Mbps",
      "24 Hours Service",
      "Buffer Free Youtube",
      "Set your rates",
      "Exclusive Deals",
      "Advanced Statistics",
    ],
    highlight: true,
    badgeText: "Save $60",
  },
];

function classNames(...cn: (string | false | undefined)[]) {
  return cn.filter(Boolean).join(" ");
}

const BillingToggle: React.FC<{
  value: BillingCycle;
  onChange: (v: BillingCycle) => void;
}> = ({ value, onChange }) => {
  const isAnnual = value === "annual";
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 select-none">
      <button
        aria-pressed={!isAnnual}
        onClick={() => onChange("monthly")}
        className={classNames(
          "text-lg font-medium",
          !isAnnual ? "text-slate-900" : "text-slate-500"
        )}
      >
        Bill Monthly
      </button>
      <button
        onClick={() => onChange(isAnnual ? "monthly" : "annual")}
        className={classNames(
          "relative h-10 w-18 rounded-full transition-colors",
          isAnnual
            ? "bg-linear-to-r from-[#3DD3CE] to-[#FFF2D0]"
            : "bg-linear-to-r from-[#FFF2D0] to-[#3DD3CE]",
          "shadow-inner"
        )}
        aria-label="Toggle billing cycle"
      >
        <span
          className={classNames(
            "absolute top-1 left-1 h-8 w-8 rounded-full bg-white shadow transform transition-transform",
            isAnnual ? "translate-x-7" : "translate-x-0"
          )}
        />
      </button>
      <button
        aria-pressed={isAnnual}
        onClick={() => onChange("annual")}
        className={classNames(
          "text-lg font-medium",
          isAnnual ? "text-slate-900" : "text-slate-500"
        )}
      >
        Bill Annually
      </button>
    </div>
  );
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500";

const AccordionRow: React.FC<{
  tier: Tier;
  open: boolean;
  onToggle: () => void;
  billing: BillingCycle;
}> = ({ tier, open, onToggle, billing }) => {
  const isAnnual = billing === "annual";
  const hasPrice = typeof tier.priceMonthly === "number" || typeof tier.priceAnnual === "number";
  const monthly = tier.priceMonthly ?? undefined;
  const annual = tier.priceAnnual ?? undefined;
  const computed = isAnnual ? annual ?? monthly : monthly ?? annual;
  const pricePerMonth = isAnnual && annual && monthly ? annual / 12 : computed;

  return (
    <div className="group">
      {/* Collapsed header disappears when open */}
      {!open && (
        <button
          onClick={onToggle}
          className={classNames(
            "w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-sm border border-white/50 px-6 py-6",
            "flex items-center justify-between transition-colors",
            focusRing
          )}
          aria-expanded={open}
        >
          <div className="text-xl md:text-2xl font-semibold text-slate-800">{tier.name}</div>
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-linear-to-r from-[#FFF2D0] to-[#3DD3CE] text-emerald-700">
            <ChevronDown />
          </span>
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={tier.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-3"
          >
            <motion.div
              layout
              className="relative overflow-hidden rounded-3xl shadow-xl bg-[linear-gradient(120deg,#3DD3CE,#FFF2D0)]"
            >
              <div className="absolute inset-0 z-0 bg-[radial-gradient(1000px_circle_at_10%_10%,rgba(255,255,255,0.5),transparent_50%)]" />
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl md:text-4xl font-semibold text-white">{tier.name}</h3>
                  <div className="flex items-center justify-end gap-2">
                    {tier.highlight && tier.badgeText && (
                      <div className="rounded-xl bg-white/90 px-4 md:px-10 py-2 md:py-4 md:mr-16 text-orange-500 text-sm font-semibold shadow">
                        {tier.badgeText}
                      </div>
                    )}
                    <button
                      onClick={onToggle}
                      className="hidden md:grid place-items-center h-10 w-10 rounded-xl bg-white/70 text-orange-500"
                    >
                      <ChevronUp />
                    </button>
                  </div>
                </div>
                {tier.perks && tier.perks.length > 0 && (
                  <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white">
                    {[0, 1, 2].map((col) => (
                      <div className="space-y-9" key={col}>
                        {tier.perks
                          ?.slice(col * 2, col * 2 + 2)
                          .map((p) => (
                            <div key={p} className="flex items-center gap-2">
                              <span>{p}</span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
                  <div>
                    {hasPrice ? (
                      <div className="text-xl md:text-3xl text-white">
                        ${pricePerMonth}
                        <span className="text-sm text-white">/month</span>
                        {isAnnual && tier.priceAnnual && (
                          <span className="ml-2 text-xs opacity-90">(billed annually)</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-base md:text-lg text-white/90">Get started — custom pricing</div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button className="w-full md:w-auto rounded-2xl bg-white/80 backdrop-blur px-6 md:px-10 py-4 text-orange-500 font-semibold shadow hover:shadow-md active:scale-[0.99]">
                      {hasPrice ? "Choose Plan" : "Contact Sales"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [billing, setBilling] = React.useState<BillingCycle>("monthly");
  const [openId, setOpenId] = React.useState<string | null>("base");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-inter font-medium tracking-tight text-slate-900 leading-tight">
              Simple pricing
              <br />
              for your Business
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla molestie aliquet. Sed mollis nibh id turpis volutpat laoreet. Aliquam sed tortor felis.
            </p>
            <div className="mt-8">
              <BillingToggle value={billing} onChange={setBilling} />
            </div>
            <div className="mt-8 md:mt-10 rounded-3xl bg-[#fffbf5] backdrop-blur-md border border-white/60 p-6 md:p-8 shadow-sm w-full max-w-xl">
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3 text-sm items-center">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-[#3DD3CE] text-white">✓</span>
                  Free 1 month trial for new user
                </li>
                <li className="flex gap-3 text-sm items-center">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-[#3DD3CE] text-white">✓</span>
                  Cancel anytime you want
                </li>
              </ul>
              <div className="flex justify-end mt-6">
                <Link
                  href="/comparison-plan"
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(340deg,#3DD3CE,#FFF2D0)] px-6 md:px-10 py-5 font-medium text-white shadow hover:shadow-md active:scale-[0.99]"
                >
                  Full pricing comparison
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-4 min-h-0">
            {tiers.map((tier) => (
              <AccordionRow
                key={tier.id}
                tier={tier}
                open={openId === tier.id}
                onToggle={() => toggle(tier.id)}
                billing={billing}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
