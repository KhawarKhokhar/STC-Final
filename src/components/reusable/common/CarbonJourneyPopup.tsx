"use client";

import React, { useEffect, useState } from "react";
import { ref, push, set } from "firebase/database";
import { rdb } from "@/lib/firebase";
import { createNotification } from "@/lib/notifications";
import Link from "next/link";

type CarbonJourneyPopupProps = {
  open: boolean;
  onClose: () => void;
};

const CarbonJourneyPopup: React.FC<CarbonJourneyPopupProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ NEW: success state
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    // ✅ reset success state whenever popup opens
    setSubmitted(false);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!privacyAccepted) {
      alert("Please accept the privacy policy.");
      return;
    }

    try {
      setSubmitting(true);

      const quoteRef = push(ref(rdb, "get_quote"));
      await set(quoteRef, {
        name,
        email,
        company,
        inquiry,
        privacyAccepted,
        createdAt: Date.now(),
      });

      // ✅ STORE NOTIFICATION IN RTDB
      await createNotification({
        type: "get_quote",
        title: "New Get Quote request",
        desc: `${name} sent a quote request`,
        refPath: `/get_quote/${quoteRef.key}`,
      });

      // reset fields
      setName("");
      setEmail("");
      setCompany("");
      setInquiry("");
      setPrivacyAccepted(false);

      // ✅ show success message + hide form
      setSubmitted(true);

      // (optional) auto close after a bit
      // setTimeout(onClose, 1800);
    } catch (err) {
      console.error("Quote submit failed:", err);
      alert("Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-transparent"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-linear-to-r from-[#FFFBC9] to-[#9DF0FF] p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-sm font-semibold text-black/50 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid gap-10 ml-10 md:grid-cols-2">
          {/* LEFT SIDE (unchanged) */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-md font-extrabold text-neutral-700">
                Get In Touch
              </p>
              <h2 className="text-3xl mt-10 font-semibold leading-tight text-black sm:text-[32px]">
                Begin Your Carbon
                <br />
                Neutral Journey
                <br />
                Today
              </h2>
            </div>

            <div className="flex gap-6">
              <img src="/assets/google-logo.png" alt="" className="h-10 w-10" />
              <img
                src="/assets/facebook-logo.png"
                alt=""
                className="h-10 w-10"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                <span className="text-lg text-[#F8B200]">★</span>
              </div>
              <div className="w-11 h-11 rounded-full bg-neutral-200 overflow-hidden">
                <img
                  src="/assets/man.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold tracking-wide text-neutral-800">
                HIGH RATING
                <br />
                REVIEW
              </span>
            </div>
          </div>

          {/* RIGHT SIDE – FORM OR SUCCESS */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#FAC430]">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-[#FAC430] bg-transparent px-4 py-2 text-xs text-neutral-800 placeholder:text-black outline-none"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#FAC430]">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-[#FAC430] bg-transparent px-4 py-2 text-xs text-neutral-800 placeholder:text-black outline-none"
                  placeholder="Email Address"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#FAC430]">
                  Company Inc
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-sm border border-[#FAC430] bg-transparent px-4 py-2 text-xs text-neutral-800 placeholder:text-black outline-none"
                  placeholder="Company Inc"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#FAC430]">
                  Inquiry
                </label>
                <textarea
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  className="h-28 w-full resize-none rounded-sm border border-[#FAC430] bg-transparent px-4 py-2 text-xs text-neutral-800 placeholder:text-black outline-none"
                  placeholder="Tell Us What You're Interested In."
                  required
                />
              </div>

              <div className="flex items-start gap-4 pt-1">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border border-neutral-500 accent-black"
                />
                <label
                  htmlFor="privacy"
                  className="text-[11px] mt-0.5 leading-snug text-neutral-800"
                >
                  I Agree To The{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    Privacy Policy
                  </Link>{" "}
                  And My Permission To Process My Personal Data...
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-[#FAC430] px-6 py-2 text-xs font-semibold text-black shadow-sm hover:bg-[#f7a814] disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          ) : (
            // ✅ SUCCESS VIEW (same area, no design changes elsewhere)
            <div className="space-y-4 text-center flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-black">
                Form Submitted Successfully 🎉
              </div>
              <p className="text-sm text-neutral-700 max-w-sm">
                Thanks for reaching out! Our team will contact you shortly.
              </p>

              <button
                onClick={onClose}
                className="mt-2 rounded-full bg-[#FAC430] px-6 py-2 text-xs font-semibold text-black shadow-sm hover:bg-[#f7a814]"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonJourneyPopup;
