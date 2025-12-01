"use client";

import React from "react";
import { Plus, Flag, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------
// Types
// ---------------------------------
type Feature = string;

type Plan = {
  id: string;
  name: string;
  price: number;
  usersNote: string;
  features: Feature[];
  popular?: boolean;
  accent?: string;
  moreDetails?: string[];
};

// ---------------------------------
// Data
// ---------------------------------
const plans: Plan[] = [
  {
    id: "essential",
    name: "ESSENTIAL",
    price: 18,
    usersNote: "Up To 20 People",
    features: [
      "Access To Basic Features",
      "Basic Reporting And Analytics",
      "Up To 10 Individual Users",
      "Basic Chat And Email Support",
    ],
    accent: "teal",
    moreDetails: [
      "Includes 5GB secure storage",
      "Community templates access",
      "Email support within 48 hours",
    ],
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    price: 52,
    usersNote: "Up To 20 People",
    features: [
      "Access To Basic Features",
      "Basic Reporting And Analytics",
      "Up To 10 Individual Users",
      "Basic Chat And Email Support",
    ],
    popular: true,
    accent: "teal",
    moreDetails: [
      "SLA-backed priority support",
      "SSO & advanced controls",
      "Unlimited workspaces",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 18,
    usersNote: "Up To 20 People",
    features: [
      "Access To Basic Features",
      "Basic Reporting And Analytics",
      "Up To 10 Individual Users",
      "Basic Chat And Email Support",
    ],
    accent: "teal",
    moreDetails: [
      "Beta features early access",
      "Weekly usage insights",
    ],
  },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const Dot: React.FC = () => (
  <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-rose-600" />
);

// ---------------------------------
// Plan Card (expands height when open)
// ---------------------------------
const PlanCard: React.FC<{
  plan: Plan;
  open: boolean;
  onToggle: () => void;
}> = ({ plan, open, onToggle }) => {
  const isPopular = !!plan.popular;
  const accentRing = isPopular ? "ring-amber-300" : "ring-white/60";

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
      className={cn(
        "relative flex w-full max-w-md flex-col gap-4 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden",
        accentRing,
        open ? "md:scale-[1.05] shadow-xl" : "shadow-sm"
      )}
    >
      <div className="mx-4 sm:mx-5 mt-5 rounded-2xl border border-slate-500 bg-white/70 px-4 sm:px-5 py-4 flex items-center justify-between">
        <div className="font-bold tracking-wide text-slate-800">{plan.name}</div>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`more-${plan.id}`}
          className={cn(
            "grid place-items-center h-12 w-12 rounded-xl border border-transparent hover:border-slate-300 transition",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          )}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex"
          >
            <Plus />
          </motion.span>
        </button>
      </div>

      <div
        className={cn(
          "mx-4 sm:mx-5 rounded-2xl border border-slate-500 bg-white/80",
          isPopular && "pt-10"
        )}
      >
        {isPopular && (
          <div className="bg-amber-100 text-center text-sm font-semibold text-slate-700 py-4 rounded-t-2xl">
            Most Popular
          </div>
        )}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div
                className={cn(
                  "text-5xl font-bold",
                  isPopular ? "text-teal-400" : "text-slate-500"
                )}
              >
                ${plan.price}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {plan.usersNote}
              </div>
            </div>

            <div
              className={cn(
                "grid h-14 w-14 place-items-center rounded-full",
                isPopular ? "text-teal-400" : "bg-teal-400/30 text-teal-700"
              )}
            >
              {isPopular ? (
                <Flag className="h-10 w-10" />
              ) : (
                <Lightbulb className="h-6 w-6" />
              )}
            </div>
          </div>

          <ul className="mt-6 space-y-4 text-slate-700">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Dot />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={`more-${plan.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="text-sm font-semibold text-slate-900 mb-3">More details</div>
                  <ul className="space-y-3 text-slate-700">
                    {(plan.moreDetails ?? []).map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <Dot />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {isPopular ? (
              <button className="col-span-2 rounded-2xl bg-linear-to-r from-[#3DD3CE] to-[#FFF2D0] py-6 font-semibold text-slate-800 shadow hover:shadow-md active:scale-[0.99]">
                Buy Now
              </button>
            ) : (
              <>
                <button className="rounded-2xl border border-slate-500 bg-white py-3 font-semibold text-slate-800 shadow-sm hover:shadow active:scale-[0.99]">
                  Start Free
                </button>
                <button className="rounded-2xl border border-slate-500 bg-white py-3 font-semibold text-slate-800 shadow-sm hover:shadow active:scale-[0.99]">
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------------
// Page Section
// ---------------------------------
const AffordablePrices: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Simple Affordable <span className="text-amber-500">Pricing</span>
        </h2>
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 items-stretch justify-items-center">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              open={openId === plan.id}
              onToggle={() => setOpenId(openId === plan.id ? null : plan.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AffordablePrices;
