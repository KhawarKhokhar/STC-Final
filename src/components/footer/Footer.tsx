import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react"; // using lucide-react icons
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F3EFE8]">
      <div className="bg-[#E4E2DF] rounded-2xl mx-5 mb-5">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
          {/* Logo + Heading */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-2">
              <span className="text-2xl">✱</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Customer Management Made Simple
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Discover how unified data and trusted AI help you connect with
              customers in a whole new way.
            </p>

            {/* Call-to-action button */}
            <button className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6049F4_0%,#ED7454_50%,#6049F4_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Try for free
              </span>
            </button>
          </div>
        </div>

        {/* Footer Links - Now aligned with bottom bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 text-left px-15">
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              <li>Analytics</li>
              <li>Collaboration</li>
              <li>Data Management</li>
              <li>Integrations</li>
              <li>Security</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resource</h3>
            <ul className="space-y-2">
              <li>Customers</li>
              <li>Strategic Finance</li>
              <li>Ebooks & Guides</li>
              <li>Webinars & Events</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>support@salore.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with gradient border */}
        <div className="relative mt-10 pb-5 px-5">
          <div className="relative overflow-hidden rounded-2xl p-0.5">
            <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6049F4_0%,#ED7454_50%,#6049F4_100%)]" />
            <div className="relative flex items-center justify-between rounded-2xl bg-[#111] px-6 py-4 text-gray-300">
              <span>Copyright ©2023 Finrage</span>
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-full bg-white text-black">
                  <Facebook size={16} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white text-black">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white text-black">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
