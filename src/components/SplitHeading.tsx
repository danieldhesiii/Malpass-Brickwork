"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section heading with a calm fade-up on scroll. (Deliberately NOT a
 * character-by-character effect — that reads "templated"; a quiet reveal feels
 * hand-built.) Keeps the original API so call sites don't change.
 */
export default function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  trigger = true,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: trigger ? 0 : 0.12,
        scrollTrigger: trigger
          ? { trigger: el, start: "top 88%", once: true }
          : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [text, trigger]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} data-reveal className={className}>
      {text}
    </Comp>
  );
}
