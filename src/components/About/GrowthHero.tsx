"use client";

import React from "react";
import { motion } from "framer-motion";

// Colors from earlier context
const ACCENT = "#3DD3CE" as const; // accent

/**
 * Drop into a Next.js project and render <GrowthHero />
 * Assumes Tailwind is available.
 */
export default function GrowthHero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-neutral-900">
              Join Us To Accelerate
              <br /> Your Business Growth,
              <br /> Elevate Your Brand
              <br /> Presence, And Achieve
              <br /> Remarkable Outcomes.
            </h1>

            <p className="mt-6 max-w-2xl text-sm text-neutral-700 leading-relaxed">
              Join UrbanPace to accelerate your business growth, elevate your brand presence, and achieve remarkable outcomes.
              Our dynamic coworking space fosters innovation, collaboration, and success, providing the perfect environment
              for entrepreneurs and businesses to thrive and reach new heights.
            </p>

            <div className="mt-10 space-y-4">
              <div className="text-sm font-medium text-neutral-700">Join 5,000+ companies already growing</div>
              <LogoStrip />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative">
            <div className="rounded-3xl bg-neutral-200/70 w-full aspect-3/3 lg:aspect-4/4 shadow-inner border" style={{ borderColor: "#e5e7eb" }} />

            {/* floating badge */}
            <div className="absolute bottom-16 right-0">
              <AwardsBadge />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-80">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <img src="/assets/about/Logo.png" alt="Logo" />
        </div>
      ))}
    </div>
  );
}

function AwardsBadge() {
  return (
    <div
      className="rounded-2xl border shadow-sm bg-white/90 backdrop-blur px-24 py-6 max-w-md"
    >
      <div className="text-sm text-neutral-700 mb-3">
        We received various category awards
      </div>
      <div className="flex items-center gap-6">
        <img src="/assets/about/ultra.png" alt="" />
        <img src="/assets/about/hyper.png" alt="" />
        <img src="/assets/about/ultimate.png" alt="" />
      </div>
    </div>
  );
}

