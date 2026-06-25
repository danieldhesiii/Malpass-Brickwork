import { Star } from "lucide-react";
import { site } from "@/lib/site";
import {
  InstagramGlyph,
  GoogleGlyph,
  FacebookGlyph,
} from "./CTAButtons";

type Social = { label: string; href: string; glyph: React.ReactNode };

/** Builds the list of active socials (skips any left blank in site config). */
function socialList(): Social[] {
  const list: Social[] = [];
  if (site.instagram)
    list.push({
      label: "Instagram",
      href: site.instagram,
      glyph: <InstagramGlyph className="h-5 w-5" />,
    });
  if (site.facebook)
    list.push({
      label: "Facebook",
      href: site.facebook,
      glyph: <FacebookGlyph className="h-5 w-5" />,
    });
  if (site.googleReviews)
    list.push({
      label: "Google reviews",
      href: site.googleReviews,
      glyph: <GoogleGlyph className="h-5 w-5" />,
    });
  return list;
}

/** Compact row of circular social icon buttons. `tone` adapts to background. */
export function SocialIcons({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const base =
    tone === "dark"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-navy-900/5 text-navy-900 hover:bg-navy-900/10";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialList().map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${base}`}
        >
          {s.glyph}
        </a>
      ))}
    </div>
  );
}

/** Prominent "leave us a Google review" button. */
export function GoogleReviewButton({ className = "" }: { className?: string }) {
  if (!site.googleWriteReview) return null;
  return (
    <a
      href={site.googleWriteReview}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-royal/40 hover:bg-stone-100 ${className}`}
    >
      <GoogleGlyph className="h-5 w-5" />
      Leave us a Google review
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#fbbc05] text-[#fbbc05]" />
        ))}
      </span>
    </a>
  );
}
