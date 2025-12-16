"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Upload,
  Save,
} from "lucide-react";

export default function AdminProfilePage() {
  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full px-6 py-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 flex items-center gap-2">
              <User className="h-4 w-4" /> Admin Profile
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">Your profile & access</h1>
            <p className="text-sm text-slate-500">
              Update your details, avatar, and security preferences.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Upload className="h-4 w-4" /> Upload avatar
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          {/* Profile form */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Personal info</h2>
              <p className="text-sm text-slate-500 mb-4">
                This information appears on invoices, invites, and notifications.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name">
                  <input className="input" defaultValue="Admin User" />
                </Field>
                <Field label="Job title">
                  <input className="input" defaultValue="Administrator" />
                </Field>
                <Field label="Email">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input className="input pl-9" defaultValue="admin@example.com" />
                  </div>
                </Field>
                <Field label="Phone">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input className="input pl-9" defaultValue="+1 555 0100" />
                  </div>
                </Field>
                <Field label="Location" className="sm:col-span-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input className="input pl-9" defaultValue="Remote, US" />
                  </div>
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Security</h2>
              <p className="text-sm text-slate-500 mb-4">Update password and session controls.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Current password">
                  <input className="input" type="password" placeholder="••••••••" />
                </Field>
                <Field label="New password">
                  <input className="input" type="password" placeholder="New strong password" />
                </Field>
                <Field label="Confirm new password">
                  <input className="input" type="password" placeholder="Repeat new password" />
                </Field>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Enable MFA in settings for extra protection.
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white grid place-items-center text-2xl font-semibold">
                AU
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">administrator • full access</p>
              <div className="mt-4 space-y-2 text-xs text-left">
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>MFA</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>Role</span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-800">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">Preferences</h3>
              <ToggleRow label="Email alerts" defaultChecked />
              <ToggleRow label="Product updates" defaultChecked />
              <ToggleRow label="Weekly summary" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-semibold text-slate-600 ${className || ""}`}>
      {label}
      {children}
    </label>
  );
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-slate-900" />
    </label>
  );
}
