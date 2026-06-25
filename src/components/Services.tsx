"use client";

import { useState } from "react";
import {
  BrickWall,
  Home,
  Fence,
  Hammer,
  Wrench,
  Factory,
  Grid3x3,
  Sparkles,
  Plus,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import ServiceModal from "./ServiceModal";

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

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-stone-50 py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-3 text-brick-600">What we do</p>
          </Reveal>
          <SplitHeading
            text="Specialist brickwork, every job."
            className="text-4xl font-extrabold text-navy-900 sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-navy-900/70">
              Whatever your project, there&apos;s a category for it below. Tap any
              service to see what&apos;s involved and what to expect.
            </p>
          </Reveal>
        </div>

        <Reveal
          stagger
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? BrickWall;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActive(s)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-2xl hover:shadow-navy-900/10"
              >
                {/* accent corner */}
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-royal/5 transition-transform duration-300 group-hover:scale-150" />

                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white transition-colors duration-300 group-hover:bg-royal">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>

                <h3 className="relative mb-2 text-xl font-bold text-navy-900">
                  {s.title}
                </h3>

                <p className="relative mb-5 text-[15px] leading-relaxed text-navy-900/65">
                  {s.blurb}
                </p>

                <ul className="relative mb-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-navy-900/70"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                  See what&apos;s involved
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}

          {/* CTA card -> straight to the quote form */}
          <a
            href="#contact"
            className="group flex flex-col justify-between rounded-3xl bg-gradient-to-br from-royal to-navy-800 p-7 text-white transition-transform duration-300 hover:-translate-y-1"
          >
            <Plus className="mb-5 h-8 w-8 text-clay-400" />
            <div>
              <h3 className="mb-2 text-xl font-bold">Something else?</h3>
              <p className="text-[15px] text-white/80">
                If it&apos;s built from brick or block, we can help. Tell us about
                it and we&apos;ll quote it for free.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
