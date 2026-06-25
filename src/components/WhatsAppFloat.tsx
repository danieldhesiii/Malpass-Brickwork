"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./CTAButtons";

/**
 * Sticky WhatsApp button, bottom-right on every screen. Slides in after the
 * user scrolls past the hero. The single most important "idiot-proof" CTA —
 * always one tap from a conversation on WhatsApp.
 */
export default function WhatsAppFloat() {
  const [shown, setShown] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Auto-expand the label briefly so people notice it.
    const t = setTimeout(() => setExpanded(true), 1600);
    const t2 = setTimeout(() => setExpanded(false), 6000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Malpass Brickwork on WhatsApp"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`wa-pulse fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 font-semibold text-white shadow-xl transition-all duration-500 hover:bg-[#1fb955] ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <WhatsAppGlyph className="h-7 w-7 shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-300 ${
          expanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        Message us for a free quote
      </span>
    </a>
  );
}
