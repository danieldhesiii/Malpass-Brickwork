import { Phone, ArrowRight } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site";

/**
 * Primary call-to-action. Every "free quote" button on the site uses this and
 * scrolls to the contact form at the bottom (the WhatsApp floating button is
 * the only thing that opens WhatsApp directly).
 */
export function QuoteButton({
  label = "Get a free quote",
  className = "",
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-royal font-semibold text-white shadow-lg shadow-royal/25 transition-all hover:bg-navy-800 hover:shadow-xl active:scale-95 ${pad} ${className}`}
    >
      {label}
      <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/** WhatsApp brand-green button. `message` pre-fills the chat. */
export function WhatsAppButton({
  message,
  label = "WhatsApp us",
  className = "",
  size = "md",
}: {
  message?: string;
  label?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1fb955] hover:shadow-xl hover:shadow-[#25D366]/30 active:scale-95 ${pad} ${className}`}
    >
      <WhatsAppGlyph className="h-5 w-5 shrink-0" />
      {label}
    </a>
  );
}

/** Tap-to-call button. */
export function CallButton({
  label,
  className = "",
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  return (
    <a
      href={telLink()}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all active:scale-95 ${pad} ${className}`}
    >
      <Phone className="h-[18px] w-[18px] shrink-0" />
      {label ?? `Call ${site.phoneDisplay}`}
    </a>
  );
}

/** Multicolour Google "G" — used for the Google reviews links. */
export function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.04 12.26c0-.82-.07-1.6-.21-2.36H12v4.46h6.19a5.3 5.3 0 0 1-2.29 3.48v2.89h3.71c2.17-2 3.43-4.95 3.43-8.47z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1.03 7.6-2.79l-3.71-2.89c-1.03.69-2.35 1.1-3.89 1.1-2.99 0-5.52-2.02-6.42-4.73H1.74v2.98A11.99 11.99 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.58 14.69A7.2 7.2 0 0 1 5.2 12c0-.94.16-1.85.42-2.69V6.33H1.74A12 12 0 0 0 .5 12c0 1.94.46 3.77 1.24 5.39l3.84-2.7z" />
      <path fill="#EA4335" d="M12 4.77c1.68 0 3.2.58 4.39 1.72l3.29-3.29C17.7 1.2 15.1 0 12 0 7.31 0 3.26 2.69 1.74 6.33l3.84 2.98C6.48 6.79 9.01 4.77 12 4.77z" />
    </svg>
  );
}

/** Facebook glyph, currentColor. */
export function FacebookGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
    </svg>
  );
}

/** Instagram glyph (lucide dropped its brand icons), stroked with currentColor. */
export function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/** Official-ish WhatsApp logo glyph as inline SVG (crisp at any size). */
export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.001 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.56-1.71A12.74 12.74 0 0 0 16 28.8C23.07 28.8 28.8 23.07 28.8 16S23.07 3.2 16.001 3.2Zm0 23.04c-1.96 0-3.88-.53-5.56-1.52l-.4-.24-3.89 1.02 1.04-3.79-.26-.41A10.2 10.2 0 0 1 5.76 16c0-5.65 4.6-10.24 10.24-10.24S26.24 10.35 26.24 16 21.65 26.24 16 26.24Zm5.62-7.67c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.52.08-.8.39-.27.31-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.16.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.6-.36Z" />
    </svg>
  );
}
