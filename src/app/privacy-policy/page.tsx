"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Lock,
  Globe,
  UserCheck,
  Cookie,
  Mail,
} from "lucide-react";

const LAST_UPDATED = "2025-11-27";

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    icon: ShieldCheck,
    content: (
      <p>
        SalesTaxCorp (“we,” “us,” or “our”)
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "1) Information we collect",
    icon: FileText,
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-semibold">Account info:</span> name, email,
          password (stored via Firebase Authentication), profile details you
          provide.
        </li>
        <li>
          <span className="font-semibold">Communications:</span> chat messages,
          contact forms, “Get a Quote” submissions, bookings.
        </li>
        <li>
          <span className="font-semibold">Usage data:</span> log data,
          device/browser info, IP, pages viewed, timestamps.
        </li>
        <li>
          <span className="font-semibold">Cookies/SDKs:</span> cookies/local
          storage and Firebase/analytics SDKs to keep you logged in and improve
          the service.
        </li>
      </ul>
    ),
  },
  {
    id: "how-we-use",
    title: "2) How we use your information",
    icon: UserCheck,
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Provide and secure your account and dashboard.</li>
        <li>Respond to chats, support, contact, and quote requests.</li>
        <li>Improve features, performance, and user experience.</li>
        <li>
          Send service messages (e.g., account notices); marketing only with your
          consent where required.
        </li>
        <li>Prevent fraud, abuse, and unauthorized access.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "3) Sharing",
    icon: Globe,
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-semibold">Service providers:</span> hosting,
          analytics, communications, and security tools (e.g., Firebase).
        </li>
        <li>
          <span className="font-semibold">Legal:</span> if required by law or to
          protect rights, safety, and security.
        </li>
        <li>
          <span className="font-semibold">Business transfers:</span> in
          connection with a merger, acquisition, or similar event.
        </li>
        <li>We do not sell personal information.</li>
      </ul>
    ),
  },
  {
    id: "cookies-tracking",
    title: "4) Cookies and tracking",
    icon: Cookie,
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>We use necessary cookies/SDKs for authentication and security.</li>
        <li>
          Analytics/functional cookies to understand usage and improve the site.
          You can manage cookies in your browser settings; disabling may affect
          functionality.
        </li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "5) Data security",
    icon: Lock,
    content: (
      <p>
        We use technical and organizational measures (encryption in transit,
        access controls) via Firebase and our infrastructure. No method is 100%
        secure.
      </p>
    ),
  },
  {
    id: "retention",
    title: "6) Data retention",
    icon: FileText,
    content: (
      <p>
        We keep data while your account is active and as needed for service,
        legal, and security purposes. We anonymize or delete data when no longer
        required.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "7) Your choices and rights",
    icon: UserCheck,
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Access, update, or delete your account information (subject to legal
          limits).
        </li>
        <li>Opt out of marketing communications at any time.</li>
        <li>Control cookies via browser settings.</li>
        <li>
          If you’re in a region with specific rights (e.g., GDPR/CCPA), you may
          request access, correction, deletion, portability, or restriction;
          we’ll honor applicable laws.
        </li>
      </ul>
    ),
  },
  {
    id: "children",
    title: "8) Children",
    icon: ShieldCheck,
    content: (
      <p>
        Our services are not directed to children under 13 (or as defined by
        local law). We do not knowingly collect data from children.
      </p>
    ),
  },
  {
    id: "international",
    title: "9) International transfers",
    icon: Globe,
    content: (
      <p>
        Data may be processed in countries where our providers operate (including
        the United States). We use appropriate safeguards where required.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10) Contact",
    icon: Mail,
    content: (
      <div className="space-y-2">
        <p>
          Email:{" "}
          <a
            href="mailto:support@salescorp.com"
            className="text-emerald-700 font-medium underline underline-offset-2"
          >
            support@salescorp.com
          </a>{" "}
          (replace with your actual support email)
        </p>
        <p className="text-slate-600">
          Address/phone (optional): add your business contact details here.
        </p>
      </div>
    ),
  },
  {
    id: "changes",
    title: "11) Changes",
    icon: FileText,
    content: (
      <p>
        We may update this policy; material changes will be posted with an
        updated “Last updated” date.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-6xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-100 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">
                Privacy Policy
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Your privacy matters to us.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
              This Privacy Policy explains what information we collect, how we
              use it, and the choices you have.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-1.5 font-medium shadow">
                Last updated: {LAST_UPDATED}
              </span>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOC */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-500 tracking-wide">
              ON THIS PAGE
            </p>
            <ul className="mt-3 space-y-1.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-3 py-2 transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold">Need help?</p>
            <p className="text-xs text-white/80 mt-1">
              If you have questions about this policy, contact us.
            </p>
            <a
              href="mailto:support@salescorp.com"
              className="mt-3 inline-flex items-center justify-center w-full rounded-xl bg-white text-slate-900 text-sm font-semibold px-4 py-2 hover:bg-slate-100 transition"
            >
              Email Support
            </a>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 sm:p-7"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                        {s.title}
                      </h2>
                      <div className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                        {s.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} SalesTaxCorp. All rights reserved.
          </div>
        </div>
      </section>
    </main>
  );
}
