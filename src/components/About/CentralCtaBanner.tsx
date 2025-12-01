"use client";

import React from "react";
import { motion } from "framer-motion";

const ACCENT = "#3DD3CE" as const; // accent used for focus/hover
const BG = "#ffffff" as const; // matches screenshot (white). Swap to #f3efe8 if you want.

export default function CentralCtaBanner() {
  return (
    <section className="relative w-full" style={{ background: BG }}>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-48">
        {/* Decorative blocks */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-30 left-6 sm:left-10 h-36 w-56 sm:h-40 sm:w-64 rounded-xl bg-neutral-300/70"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-70 right-0 sm:right-0 h-40 w-64 sm:h-48 sm:w-80 rounded-xl bg-neutral-300/70"
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-neutral-900"
          >
            Get the Workspace That Fits
            <br /> Your Needs at Urbanpace.
            <br /> Join Us Today!
          </motion.h2>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            href="#get-started"
            className="mt-8 inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 text-sm font-semibold text-white shadow-sm focus:outline-none border border-transparent"
            style={{ background: "#000", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.35)" }}
            onMouseEnter={(e) => ((e.currentTarget.style.boxShadow = `0 10px 28px -10px ${ACCENT}66`), (e.currentTarget.style.borderColor = ACCENT))}
            onMouseLeave={(e) => ((e.currentTarget.style.boxShadow = "0 8px 20px -8px rgba(0,0,0,0.35)"), (e.currentTarget.style.borderColor = "transparent"))}
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </section>
  );
}
