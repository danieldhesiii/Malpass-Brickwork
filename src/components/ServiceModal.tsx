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
  Images,
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

/** Maps a service to the gallery category that shows photos of that work. */
const galleryCategoryFor: Record<string, string> = {
  "brick-block": "Walls",
  extensions: "Extensions",
  "garden-walls": "Walls",
  repointing: "Repointing",
  "brick-repairs": "Walls",
  chimneys: "Chimneys",
  paving: "Paving",
  "feature-brickwork": "Feature",
};

/**
 * Detail panel that opens when a service card is clicked. Built to fit the
 * viewport without scrolling: a tight header, two compact columns, a link to
 * the matching gallery photos, then the quote CTAs.
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

  const viewGallery = () => {
    const category = galleryCategoryFor[service.slug] ?? "All";
    onClose();
    // Let the modal close, then tell the gallery to filter + scroll.
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("gallery:show", { detail: category }));
    }, 60);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-stone-50 shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-navy-900 px-6 py-5 text-white sm:px-7 sm:py-6">
          <div className="brick-wall pointer-events-none absolute inset-0 opacity-25" />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative flex items-center gap-4 pr-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-royal">
              <Icon className="h-6 w-6" strokeWidth={1.7} />
            </div>
            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              {service.title}
            </h3>
          </div>
          <p className="relative mt-3 text-sm leading-relaxed text-white/75">
            {service.overview}
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-5 px-6 py-5 sm:grid-cols-2 sm:px-7 sm:py-6">
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brick-600">
              What&apos;s included
            </h4>
            <ul className="space-y-2">
              {service.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-navy-900/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-royal" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brick-600">
              What to expect
            </h4>
            <ul className="space-y-2">
              {service.expect.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-navy-900/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery link */}
        <div className="px-6 sm:px-7">
          <button
            type="button"
            onClick={viewGallery}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900/15 bg-white py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-royal/40 hover:bg-stone-100"
          >
            <Images className="h-4 w-4 text-royal" />
            See photos of this work in the gallery
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Footer CTAs */}
        <div className="mt-5 flex flex-col gap-3 border-t border-navy-900/10 bg-stone-100 px-6 py-5 sm:flex-row sm:items-center sm:px-7">
          <a
            href="#contact"
            onClick={onClose}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-royal px-5 py-3.5 font-semibold text-white shadow-lg shadow-royal/25 transition-all hover:bg-navy-800 active:scale-[0.98]"
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white px-5 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-stone-200"
          >
            <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
