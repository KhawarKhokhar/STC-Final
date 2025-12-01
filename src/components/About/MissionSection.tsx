"use client";

import React from "react";
import { motion } from "framer-motion";

const ACCENT = "#3DD3CE" as const; // accent for subtle details

export default function MissionSection() {
  return (
    <section className="w-full bg-white">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-40">
        {/* Decorative blocks */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-10 sm:-left-10 top-15 h-24 w-48 rounded-xl bg-neutral-300/70"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute right-4 sm:right-2 bottom-8 h-40 w-80 rounded-2xl bg-neutral-300/70"
          aria-hidden
        />

        <div className="relative">{/* content layer above decorations */}
          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900">
            Our Mission
          </h2>
          <p className="mt-6 text-3xl leading-11 text-neutral-800 max-w-4xl">
            At UrbanPace, our mission is to create a vibrant and inclusive coworking environment that empowers
            entrepreneurs, freelancers, and businesses to thrive. We are dedicated to fostering innovation, collaboration,
            and growth by providing state-of-the-art facilities, flexible workspaces, and a supportive community.
          </p>
        </div>
      </div>
    </section>
  );
}
