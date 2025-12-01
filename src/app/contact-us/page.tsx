"use client";

import React, { useState } from "react";
import { Mail, User, Building2, MessageSquare } from "lucide-react";
import { ref, push, set } from "firebase/database";
import { rdb } from "@/lib/firebase";
import { createNotification } from "@/lib/notifications";
import Link from "next/link";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function updateField<K extends keyof typeof form>(key: K, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSent(false);

    try {
      const contactRef = push(ref(rdb, "contact_us"));

      await set(contactRef, {
        ...form,
        createdAt: Date.now(),
      });

      // ✅ STORE NOTIFICATION IN RTDB
      await createNotification({
        type: "contact_us",
        title: "New Contact Us message",
        desc: `${form.name} sent a contact message`,
        refPath: `/contact_us/${contactRef.key}`,
      });

      setForm({ name: "", email: "", company: "", message: "" });
      setSent(true);

      // auto-hide after 4 seconds (optional)
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Contact form submit failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden">
        {/* LEFT SIDE (Image Placeholder) */}
        <div className="relative flex flex-col justify-between p-10 lg:p-12 min-h-80">
          <div>
            <p className="text-2xl font-semibold opacity-90">Contact Us</p>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mt-3">
              Let’s talk about
              <br />
              your next project
            </h2>
            <p className="text-lg mt-4 max-w-md">
              Fill in the form and our team will get back to you within 12
              hours. We’re happy to help with quotes, partnerships, or anything
              else.
            </p>
          </div>

          {/* Decorative bubbles */}
          <div className="absolute -bottom-14 -left-14 h-52 w-52 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />

          {/* Quick contact chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-white/15">
              support@salestaxcorp.com
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/15">
              +1 234 567 890
            </span>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="p-8 sm:p-10 lg:p-12">
          <h3 className="text-xl font-semibold text-[#262046]">
            Send us a message
          </h3>
          <p className="text-sm text-[#8a88a8] mt-1">
            We’ll respond as soon as possible.
          </p>

          {/* ✅ Success message only (UI not redesigned) */}
          {sent && (
            <p className="mt-4 text-sm font-medium text-green-600">
              Form submitted successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-[#6f6a8a]">
                Full Name
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#ebeaf6] bg-white/40 px-3 py-3 focus-within:ring-2 focus-within:ring-[#c8c3ff]">
                <User className="w-4 h-4 text-[#9c99b5]" />
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#262046]"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-[#6f6a8a]">
                Email Address
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#ebeaf6] bg-white/40 px-3 py-3 focus-within:ring-2 focus-within:ring-[#c8c3ff]">
                <Mail className="w-4 h-4 text-[#9c99b5]" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#262046]"
                  placeholder="john@email.com"
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="text-xs font-semibold text-[#6f6a8a]">
                Company (optional)
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#ebeaf6] bg-white/40 px-3 py-3 focus-within:ring-2 focus-within:ring-[#c8c3ff]">
                <Building2 className="w-4 h-4 text-[#9c99b5]" />
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#262046]"
                  placeholder="SalesTaxCorp"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-semibold text-[#6f6a8a]">
                Message
              </label>
              <div className="mt-2 flex items-start gap-2 rounded-xl border border-[#ebeaf6] bg-white/40 px-3 py-3 focus-within:ring-2 focus-within:ring-[#c8c3ff]">
                <MessageSquare className="w-4 h-4 text-[#9c99b5] mt-1" />
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#262046] min-h-[120px] resize-none"
                  placeholder="Tell us what you need help with..."
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={submitting}
              type="submit"
              className="w-full rounded-xl bg-[#3DD3CE] text-white text-sm font-semibold py-3 shadow-md hover:bg-[#2cc8d3] transition disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>

            <p className="text-[11px] text-[#9c99b5] text-center">
              By submitting, you agree to our{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
