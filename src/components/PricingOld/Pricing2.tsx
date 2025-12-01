"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx"; // optional helper for clean class merging

// 🎨 Theme colors
const ACCENT = "#3DD3CE" as const;
const BG = "#f3efe8" as const;

// 💰 Pricing tiers
const TIERS: { label: string; price: number; range: string }[] = [
  { label: "Less than 5 states", price: 200, range: "<5" },
  { label: "5–10 states", price: 300, range: "5–10" },
  { label: "10–15 states", price: 400, range: "10–15" },
  { label: "15–20 states", price: 500, range: "15–20" },
  { label: "20–30 states", price: 600, range: "20–30" },
  { label: "30–40 states", price: 700, range: "30–40" },
  { label: "40+ states", price: 800, range: "40+" },
];

// ➕ Add-ons
const ADD_ONS = [
  {
    title: "Initial Registration Fee",
    note: "Applies only if initial bulk registrations are required.",
    price: "$50 / state",
  },
  {
    title: "Additional Sales Channels",
    note: "Beyond Shopify (per additional channel).",
    price: "$50 / channel",
  },
  {
    title: "High-Volume Adjustment",
    note: "+$50 per additional 10,000 orders / month when exceeding 20,000.",
    price: "$50 / 10,000 orders",
  },
];

// 💵 Helpers
function formatUSD(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function tierForStates(states: number) {
  if (states < 5) return 200;
  if (states <= 10) return 300;
  if (states <= 15) return 400;
  if (states <= 20) return 500;
  if (states <= 30) return 600;
  if (states <= 40) return 700;
  return 800; // 40+
}

export type PricingProps = {
  className?: string;
  accentColor?: string;
  backgroundColor?: string;
};

// 🧩 Reusable UI Components
const Section: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
      {title}
    </h2>
    {children}
  </div>
);

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span
    className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm"
    style={{ borderColor: ACCENT, color: ACCENT }}
  >
    {children}
  </span>
);

interface CardProps {
  children: React.ReactNode;
  featured?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, featured, className }) => (
  <div
    className={clsx(
      "rounded-2xl border shadow-sm p-6 transition-transform flex flex-col justify-between h-full",
      featured && "scale-[1.02]",
      className
    )}
    style={{
      background: "white",
      borderColor: featured ? ACCENT : "#e5e7eb",
      boxShadow: featured ? `0 10px 25px -12px ${ACCENT}33` : undefined,
    }}
  >
    {children}
  </div>
);

const Divider: React.FC = () => (
  <div className="my-6 h-px w-full" style={{ background: "#e5e7eb" }} />
);

const FeatureList: React.FC = () => (
  <ul className="grid gap-2 text-base leading-relaxed list-disc pl-5">
    <li>Complete U.S. sales tax compliance</li>
    <li>Monthly/quarterly filings</li>
    <li>Ongoing state registrations</li>
    <li>Notices management</li>
    <li>Audit defense</li>
    <li>General compliance support</li>
  </ul>
);

// ⚙️ Estimator Card
const Estimator: React.FC<{ accent: string }> = ({ accent }) => {
  const [states, setStates] = React.useState<number>(8);
  const [orders, setOrders] = React.useState<number>(18000);
  const [extraChannels, setExtraChannels] = React.useState<number>(0);

  const base = tierForStates(states);
  const overage = Math.max(0, orders - 20000);
  const blocks = Math.ceil(overage / 10000);
  const volumeAdj = blocks > 0 ? blocks * 50 : 0;
  const channelAdj = extraChannels * 50;
  const est = base + volumeAdj + channelAdj;

  return (
    <Card featured>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Quick Estimator</h3>
          <p className="text-sm text-neutral-600">
            Estimate your monthly cost based on states, orders, and channels.
          </p>
        </div>
        <Pill>Est. {formatUSD(est)}/month</Pill>
      </div>
      <Divider />
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Registered States</span>
          <input
            type="number"
            min={1}
            max={60}
            value={states}
            onChange={(e) => setStates(Number(e.target.value))}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none"
            style={{ borderColor: accent }}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Monthly Orders</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={orders}
            onChange={(e) => setOrders(Number(e.target.value))}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none"
            style={{ borderColor: accent }}
          />
          <p className="text-xs text-neutral-600">
            Includes up to 20,000 orders at no extra charge.
          </p>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Extra Sales Channels</span>
          <input
            type="number"
            min={0}
            value={extraChannels}
            onChange={(e) => setExtraChannels(Number(e.target.value))}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none"
            style={{ borderColor: accent }}
          />
        </label>
      </div>
    </Card>
  );
};

// 💸 Main Pricing Component
const Pricing: React.FC<PricingProps> = ({
  className,
  accentColor = ACCENT,
  backgroundColor = BG,
}) => {
  return (
    <section
      className={clsx("w-full", className)}
      style={{ background: backgroundColor }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* Header */}
          <header className="text-center space-y-4">
            <Pill>Up to 20,000 orders included</Pill>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Monthly Sales Tax Compliance
            </h1>
            <p className="mx-auto max-w-2xl text-neutral-700">
              Pricing scales with your registered states. Includes filings,
              registrations, audit defense, and more. No hidden fees.
            </p>
          </header>

          <Estimator accent={accentColor} />

          {/* Tiers */}
          <Section title="Registered States • Monthly Fee">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {TIERS.map((t) => (
                <Card key={t.range}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-lg font-semibold">{t.label}</div>
                      <div className="text-sm text-neutral-600">
                        Billed monthly
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: accentColor }}
                      >
                        {formatUSD(t.price)}
                      </div>
                      <div className="text-xs text-neutral-600">/ month</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Features */}
          <Section title="What’s Included">
            <Card>
              <FeatureList />
              <Divider />
              <div className="text-sm text-neutral-700">
                The base fee covers up to <strong>20,000 orders/month</strong>.
                Prices remain stable unless services or states are added.
              </div>
            </Card>
          </Section>

          {/* Add-ons */}
          <Section title="Add-Ons & Notes">
            <div className="grid sm:grid-cols-3 gap-4 items-stretch">
              {ADD_ONS.map((a) => (
                <Card key={a.title}>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{a.title}</div>
                    <div className="text-sm text-neutral-600">{a.note}</div>
                  </div>
                  <Divider />
                  <div className="text-right mt-auto">
                    <span
                      className="text-xl font-bold"
                      style={{ color: accentColor }}
                    >
                      {a.price}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* FAQ */}
          <Section title="FAQ">
            <div className="grid gap-4">
              {[
                {
                  q: "How do I choose the right tier?",
                  a: "Pick the tier that matches your count of registered states. You can move up anytime without penalty.",
                },
                {
                  q: "What if we exceed 20,000 orders in a month?",
                  a: "We add $50 per 10,000 additional orders. For example, 35,000 orders adds +$100 to your base tier.",
                },
                {
                  q: "Are there any hidden fees?",
                  a: "No. You only pay the base tier and optional add-ons (registrations, extra channels, or volume adjustments).",
                },
              ].map((faq) => (
                <Card key={faq.q}>
                  <details className="group">
                    <summary className="cursor-pointer text-lg font-semibold flex items-center justify-between">
                      {faq.q}
                      <span
                        className="text-sm font-medium"
                        style={{ color: accentColor }}
                      >
                        View
                      </span>
                    </summary>
                    <div className="mt-3 text-neutral-700 leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </Section>

          {/* Footer CTA */}
          <footer className="text-center pt-6">
            <button
              className="rounded-2xl px-6 py-3 font-semibold shadow-sm border transition-colors"
              style={{
                background: accentColor,
                borderColor: accentColor,
                color: "#052e2b",
              }}
            >
              Get Started
            </button>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
