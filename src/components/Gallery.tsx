"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { InstagramGlyph } from "./CTAButtons";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { anchorTargetY, site } from "@/lib/site";
import Logo from "./Logo";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";

type Filter = "All" | GalleryCategory;

const aspect: Record<NonNullable<GalleryItem["span"]> | "default", string> = {
  default: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/11]",
  big: "aspect-square",
};

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items =
    filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  // A service modal can ask the gallery to filter to a category and scroll here.
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      setFilter(
        cat && (galleryCategories as string[]).includes(cat)
          ? (cat as GalleryCategory)
          : "All"
      );
      const el = document.getElementById("gallery");
      const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
      if (lenis && el) lenis.scrollTo(anchorTargetY(el));
      else el?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("gallery:show", handler);
    return () => window.removeEventListener("gallery:show", handler);
  }, []);

  // Keyboard controls + scroll lock while lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [lightbox, close, go]);

  return (
    <section id="gallery" className="bg-stone-100 py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brick-600">
                Recent work
              </p>
            </Reveal>
            <SplitHeading
              text="The proof is in the pointing."
              className="text-4xl font-extrabold text-navy-900 sm:text-5xl"
            />
          </div>
          <Reveal direction="right">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              <InstagramGlyph className="h-4 w-4" />
              More on {site.instagramHandle}
            </a>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal className="mb-8 flex flex-wrap gap-2">
          {(["All", ...galleryCategories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === c
                  ? "bg-royal text-white"
                  : "bg-white text-navy-900/70 hover:bg-white/70"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {/* Masonry */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item, i) => (
            <button
              key={`${item.alt}-${i}`}
              type="button"
              onClick={() => setLightbox(i)}
              className={`group relative block w-full overflow-hidden rounded-2xl bg-navy-900 ${
                aspect[item.span ?? "default"]
              }`}
            >
              {item.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <Placeholder item={item} />
              )}

              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold text-white">
                  {item.alt}
                </span>
                <span className="shrink-0 rounded-full bg-clay-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {item.category}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <figure className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {items[lightbox].src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain"
              />
            ) : (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl">
                <Placeholder item={items[lightbox]} />
              </div>
            )}
            <figcaption className="mt-3 flex items-center justify-center gap-3 text-center text-white/80">
              <span>{items[lightbox].alt}</span>
              <span className="rounded-full bg-clay-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                {items[lightbox].category}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * On-brand placeholder shown until a real photo `src` is supplied. Reads as
 * intentional (brand gradient + brick texture + logo mark) and clearly invites
 * the business's real photos.
 */
function Placeholder({ item }: { item: GalleryItem }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-brick-700 text-white">
      <div className="brick-texture absolute inset-0 opacity-40" />
      <div className="relative h-12 w-12 opacity-90">
        <Logo variant="mark" light />
      </div>
      <span className="relative mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/70">
        <ImageIcon className="h-3.5 w-3.5" />
        {item.category}
      </span>
      <span className="relative mt-1 px-4 text-center text-[11px] uppercase tracking-widest text-white/40">
        Add your photo
      </span>
    </div>
  );
}
