"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Star, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { QuoteButton, CallButton } from "./CTAButtons";
import Logo from "./Logo";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Gentle entrance — staggered fade, nothing flashy.
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 22,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });
      // Subtle parallax on the brick panel only.
      gsap.to(panel.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative overflow-hidden bg-stone-100 pb-16 pt-28 sm:pt-32"
    >
      {/* warm wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-brick-500/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-clay-400/10 blur-[120px]" />
      </div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <div
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-stone-50 px-4 py-1.5"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-brick-500 text-brick-500" />
              ))}
            </span>
            <span className="eyebrow text-[0.62rem] text-brick-700">
              {site.tagline}
            </span>
          </div>

          <h1
            data-hero
            className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight text-navy-900 sm:text-6xl lg:text-[4.6rem]"
          >
            Straight lines,
            <br />
            <span className="text-gradient">solid brickwork.</span>
          </h1>

          <p
            data-hero
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-navy-900/70 lg:mx-0"
          >
            We lay brick the way it should be done. Neat, level and built to
            last. Walls, extensions, repointing and repairs across{" "}
            <span className="font-semibold text-navy-900">{site.serviceArea}</span>,
            with a free quote and no hard sell.
          </p>

          <div
            data-hero
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <QuoteButton size="lg" label="Get a free quote" className="w-full sm:w-auto" />
            <a
              href="#estimate"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 bg-stone-50 px-7 py-4 text-base font-semibold text-navy-900 transition-colors hover:border-ink/40 hover:bg-stone-200 sm:w-auto"
            >
              Estimate a cost
            </a>
          </div>

          {/* trust stats */}
          <dl data-hero className="mt-12 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
            {[
              { n: `${site.yearsExperience}+`, l: "Years on the tools" },
              { n: `${site.jobsCompleted}+`, l: "Jobs completed" },
              { n: "Free", l: "No-obligation quotes" },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <dt className="text-3xl font-extrabold text-navy-900">{s.n}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-navy-900/55">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual: brick panel + floating credential card.
            Swap the brick panel for a real photo of the work when you have one. */}
        <div data-hero className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            ref={panel}
            className="brick-wall relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[4.5rem] shadow-2xl shadow-ink/25 ring-1 ring-ink/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="mb-3 h-12 w-12 opacity-95">
                <Logo variant="mark" light />
              </div>
              <p className="font-[family-name:var(--font-archivo)] text-2xl font-bold">
                {site.name}
              </p>
              <p className="text-sm text-white/70">Brickwork specialists</p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-ink/10 bg-stone-50 px-5 py-3.5 shadow-xl sm:-left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brick-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-bold text-navy-900">Tidy & reliable</p>
              <p className="text-xs text-navy-900/60">Quote is the price</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-navy-900/40 transition-colors hover:text-navy-900 md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
