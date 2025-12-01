"use client";

import React from "react";
import { motion } from "framer-motion";


export default function TeamSection() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
            Meet our Team of Creators, Designers,
            <br /> and World-class Problem Solvers
          </h2>
          <p className="mt-4 text-neutral-700">
            To become the company that customers want, it takes a group of passionate <br/>people. Get to know the people who lead.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TEAM.map((m) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="rounded-3xl">
              <div className="aspect-[4/4.3] w-full rounded-3xl bg-neutral-300/70 border" style={{ borderColor: "#e5e7eb" }} />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="text-2xl font-semibold text-neutral-900">{m.name}</div>
                  <div className="text-xl text-neutral-600">{m.role}</div>
                </div>
                <div className="flex items-center gap-3 opacity-80">
                  <IconX />
                  <IconIG />
                  <IconLI />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            Join our team, The one
            <br /> with the master touch
          </h3>
          <div>
            <p className="text-lg text-neutral-700 leading-relaxed">
              We believe it takes great people to make a great product. That’s why we hire not only the perfect professional fits,
              but people who embody our company values.
            </p>
            <a href="#" className="mt-6 inline-block text-xl font-semibold" style={{ color: "#1f2937" }}>
              <span className="decoration-2 ">See Open Position</span> →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Brooklyn Simmons", role: "Founder & CEO" },
  { name: "Robert Fox", role: "CTO" },
  { name: "Jacob Jones", role: "CPO" },
] as const;

/* --- minimal icons --- */
function IconX() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-800">
      <path d="M4 4l16 16M20 4L4 20"/>
    </svg>
  );
}
function IconIG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-800">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="3.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}
function IconLI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-800">
      <path d="M4 4h16a0 0 0 0 1 0 0v16a0 0 0 0 1 0 0H4a0 0 0 0 1 0 0V4a0 0 0 0 1 0 0zM7 10h2v7H7v-7zm1-1.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM11 10h2v1.1c.4-.7 1.2-1.3 2.3-1.3 1.7 0 2.7 1.1 2.7 3v4.2h-2v-3.6c0-1-.5-1.6-1.4-1.6-.8 0-1.6.6-1.6 1.7v3.5h-2V10z"/>
    </svg>
  );
}
