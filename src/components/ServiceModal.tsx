"use client";

import { useEffect } from "react";
import {
  BrickWall,
  Home,
  Fence,
  Hammer,
  Wrench,
  Factory,
  Grid3x3,
  Sparkles,
  X,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { type Service, whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./CTAButtons";

const iconMap: Record<string, LucideIcon> = {
  BrickWall,
  Home,
  Fence,
  Hammer,
  Wrench,
  Factory,
  Grid3x3,
  Sparkles,
};

/**
 * Detail panel that opens when a service card is clicked. Gives the visitor
 * something genuinely useful (what the job involves + what to expect) before
 * pushing them to the quote form, rather than firing them straight to WhatsApp.
 */
export default function ServiceModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) return null;
  const Icon = iconMap[service.icon] ?? BrickWall;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-stone-50 shadow-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-navy-900 p-7 text-white sm:p-9">
          <div className="brick-wall pointer-events-none absolute inset-0 opacity-25" />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal">
              <Icon className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <h3 className="text-3xl font-extrabold">{service.title}</h3>
            <p className="mt-3 max-w-lg text-white/75">{service.overview}</p>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-8 p-7 sm:grid-cols-2 sm:p-9">
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-brick-600">
              What&apos;s included
            </h4>
            <ul className="space-y-2.5">
              {service.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-navy-900/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-royal" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-brick-600">
              What to expect
            </h4>
            <ul className="space-y-2.5">
              {service.expect.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-navy-900/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col gap-3 border-t border-navy-900/10 bg-stone-100 p-7 sm:flex-row sm:items-center sm:p-9">
          <a
            href="#contact"
            onClick={onClose}
            className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-royal px-6 py-4 font-semibold text-white shadow-lg shadow-royal/25 transition-all hover:bg-navy-800 active:scale-[0.98]"
          >
            Get a free quote for this
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={whatsappLink(
              `Hi, I'm interested in your "${service.title}" service. Could I get a quote?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white px-6 py-4 font-semibold text-navy-900 transition-colors hover:bg-stone-200"
          >
            <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
