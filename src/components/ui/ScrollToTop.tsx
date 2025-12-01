"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show button after 300px scroll
      setVisible(window.scrollY > 300);
    };

    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="
        fixed bottom-12 left-12 z-50
        h-12 w-12 rounded-full
        bg-[#2B2B2B] text-white
        shadow-lg flex items-center justify-center
        hover:bg-[#4A4A4A] transition
      "
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
