"use client";

import React from "react";
import { Cog, Bell, Shield, Globe, Save, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full px-6 py-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 flex items-center gap-2">
              <Cog className="h-4 w-4" /> Admin Settings
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">Workspace & notifications</h1>
            <p className="text-sm text-slate-500">
              Configure workspace details, alerts, and security defaults.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <Card title="Workspace" icon={<Globe className="h-5 w-5 text-slate-600" />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Workspace name">
                  <input className="input" defaultValue="SalesTax Corp" />
                </Field>
                <Field label="Timezone">
                  <select className="input">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                  </select>
                </Field>
                <Field label="Default locale">
                  <select className="input">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                  </select>
                </Field>
                <Field label="Default currency">
                  <select className="input">
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </Field>
              </div>
            </Card>

            <Card title="Notifications" icon={<Bell className="h-5 w-5 text-slate-600" />}>
              <ToggleRow label="Email alerts for tasks" defaultChecked />
              <ToggleRow label="Email alerts for comments" defaultChecked />
              <ToggleRow label="Slack/push for mentions" />
              <ToggleRow label="Weekly summary" />
            </Card>

            <Card title="Security" icon={<Shield className="h-5 w-5 text-slate-600" />}>
              <ToggleRow label="Require MFA for admins" defaultChecked />
              <ToggleRow label="Session timeout after 30m" defaultChecked />
              <ToggleRow label="Restrict file types for uploads" />
              <Field label="Allowed domains">
                <input className="input" placeholder="example.com, company.com" />
              </Field>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin tips</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Keep MFA required for all admins.</li>
                <li>• Use workspace locale/currency for invoices.</li>
                <li>• Add allowed domains to prevent random signups.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recent changes</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>Audit logs retention</span>
                  <span className="text-xs text-slate-500">Updated 2d ago</span>
                </div>
                <div className="flex justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>MFA policy</span>
                  <span className="text-xs text-slate-500">Updated 5d ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
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
