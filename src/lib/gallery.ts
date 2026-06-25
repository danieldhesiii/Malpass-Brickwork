/**
 * GALLERY MANIFEST
 * ────────────────────────────────────────────────────────────────────────
 * These start as on-brand PLACEHOLDER tiles so the gallery, filters and
 * lightbox all work out of the box. To use the business's real photos from Instagram
 * (https://www.instagram.com/malpassbrickwork/):
 *
 *   1. Save the photos into  /public/gallery/  (e.g. wall-01.jpg)
 *   2. Add `src: "/gallery/wall-01.jpg"` to the matching item below
 *      (or change the existing `src`).
 *   3. Make sure the `category` and a short `alt` description are right.
 *
 * Any item WITHOUT a `src` renders a branded placeholder tile. As soon as you
 * add a `src` (local path or full URL), that tile shows the real photo — the
 * filters and lightbox keep working automatically.
 */

export type GalleryCategory =
  | "Walls"
  | "Extensions"
  | "Repointing"
  | "Paving"
  | "Feature"
  | "Chimneys";

export const galleryCategories: GalleryCategory[] = [
  "Walls",
  "Extensions",
  "Repointing",
  "Paving",
  "Feature",
  "Chimneys",
];

export type GalleryItem = {
  alt: string;
  category: GalleryCategory;
  /** Add a real photo path/URL here to replace the placeholder. */
  src?: string;
  /** Masonry emphasis. */
  span?: "tall" | "wide" | "big";
};

export const gallery: GalleryItem[] = [
  { alt: "Brick boundary wall with feature coping", category: "Walls", span: "tall" },
  { alt: "Single-storey brick extension", category: "Extensions", span: "wide" },
  { alt: "Curved brick arch detail", category: "Feature" },
  { alt: "Freshly repointed brick facade", category: "Repointing" },
  { alt: "Block-paved driveway", category: "Paving", span: "wide" },
  { alt: "Rebuilt chimney stack", category: "Chimneys", span: "tall" },
  { alt: "Garden wall with brick piers", category: "Walls" },
  { alt: "Brick pillar and pier work", category: "Feature", span: "tall" },
  { alt: "Double-storey extension brickwork", category: "Extensions" },
  { alt: "Period property restoration", category: "Repointing", span: "wide" },
  { alt: "Patio and steps", category: "Paving" },
  { alt: "Soldier course feature detail", category: "Feature" },
];
