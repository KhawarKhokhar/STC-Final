﻿"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import CarbonJourneyPopup from "@/components/reusable/common/CarbonJourneyPopup";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Pricing", link: "/pricing" },
    { name: "Free Nexus Review", link: "/free-nexus-review" },
    { name: "Resources Library", link: "/resource-library" },
    { name: "Blog", link: "/blog" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const toggleMenu = () => setMenuOpen((v) => !v);
  const isHashLink = (href: string) => href.startsWith("#");

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* FIXED NAVBAR â€“ ALWAYS ON TOP */}
      <header className="fixed top-0 inset-x-0 z-50 shadow-md">
        <nav className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-14 py-4 bg-[#F3EFE8]/95 backdrop-blur-sm">
          {/* Left: Logo + Name */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo/logo.png"
              alt="SalesTaxCorp Logo"
              width={32}
              height={32}
              className="w-8 h-8 lg:w-10 lg:h-10"
              priority
            />
            <span className="font-bold text-xl lg:text-2xl text-[#2B2B2B]">
              SalesTaxCorp
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-800 font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                {isHashLink(item.link) ? (
                  <a
                    href={item.link}
                    className="text-base hover:text-[#3DD3CE] transition-colors duration-200 ease-in-out"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className="text-base hover:text-[#3DD3CE] transition-colors duration-200 ease-in-out"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right: Button (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={() => setOpenPopup(true)}
              className="relative inline-flex h-12 overflow-hidden rounded-2xl p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6049F4_0%,#ED7454_50%,#6049F4_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-[#2B2B2B] px-6 text-base font-medium text-white backdrop-blur-3xl transition-all duration-200 hover:bg-[#4A4A4A]">
                Get Quote
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center p-2 text-[#2B2B2B] z-50"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#F3EFE8] z-40 transition-transform duration-300 ease-in-out transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleMenu();
          }}
        >
          <div className="pt-[72px] px-6 pb-6 space-y-8">
            <ul className="flex flex-col gap-6 text-gray-800 text-xl font-medium">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b border-gray-200 pb-2">
                  {isHashLink(item.link) ? (
                    <a
                      href={item.link}
                      className="block hover:text-[#6049F4] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.link}
                      className="block hover:text-[#6049F4] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Full-width Button for Mobile */}
            <button
              className="w-full relative inline-flex h-12 overflow-hidden rounded-2xl p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={() => {
                setOpenPopup(true);
                setMenuOpen(false);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6049F4_0%,#ED7454_50%,#6049F4_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-[#2B2B2B] px-3 text-base font-medium text-white backdrop-blur-3xl">
                Get Quote
              </span>
            </button>
          </div>
        </div>
      </header>

       <div className="h-[72px] lg:h-20" />

    <CarbonJourneyPopup
      open={openPopup}
      onClose={() => setOpenPopup(false)}
    />
    </>
  );
}
