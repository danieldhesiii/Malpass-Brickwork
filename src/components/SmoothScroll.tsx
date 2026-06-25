"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth-scroll, synced with the GSAP ticker + ScrollTrigger so every
 * scroll-driven animation on the page reads from the same clock. Also takes
 * over in-page anchor navigation (the nav links + scroll cue) so jumps glide
 * instead of snapping. Disabled when the user prefers reduced motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // No smooth scroll, but still refresh ScrollTrigger for reveal triggers.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Keep ScrollTrigger in lockstep with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker is seconds; lenis wants ms
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -84, duration: 1.2 });
    };
    document.addEventListener("click", onAnchorClick);

    // Make Lenis reachable for components that need to start/stop scroll
    // (e.g. the gallery lightbox locking the page).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
