"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Direction = "up" | "left" | "right" | "scale";

/**
 * Scroll-reveal wrapper. Children animate in once when they enter the
 * viewport. The hidden start-state is set in the server-rendered markup via
 * data-attributes (see globals.css `.js [data-reveal]`), so there's no
 * flash-of-content and no-JS users still see everything.
 *
 * `stagger` animates the wrapper's direct children one after another — ideal
 * for card grids.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  stagger = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  direction?: Direction;
  delay?: number;
  stagger?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, delay, stagger]);

  const Comp = Tag as React.ElementType;
  const attr = stagger
    ? { "data-reveal-stagger": direction }
    : { "data-reveal": direction };

  return (
    <Comp ref={ref} className={className} {...attr} {...rest}>
      {children}
    </Comp>
  );
}
