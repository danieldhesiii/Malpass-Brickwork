/**
 * ─────────────────────────────────────────────────────────────────────────
 * MALPASS BRICKWORK — SITE CONFIG (single source of truth)
 * ─────────────────────────────────────────────────────────────────────────
 * Edit business details here and they update everywhere on the site.
 *
 *  ⚠️  SERVICE AREA: the business covers "a wider region/county" but it isn't
 *      named yet. Replace `serviceArea` below with the real region (e.g. "the
 *      West Midlands", "across Yorkshire"). It feeds the hero, footer, contact
 *      block and SEO metadata, so changing it here updates the whole site.
 */

export const site = {
  name: "Malpass Brickwork",
  shortName: "Malpass",
  tagline: "Local, trusted brickwork, built properly and left tidy",
  // 👇 EDIT THIS to the real area the business covers
  serviceArea: "the local region and surrounding counties",
  yearsExperience: 10, // 👈 adjust to the real experience
  jobsCompleted: 250, // 👈 adjust if you have a real figure

  // Contact ----------------------------------------------------------------
  phoneDisplay: "07941 510504",
  phoneDial: "+447941510504", // tel: link
  whatsappNumber: "447941510504", // wa.me number (no +, no spaces)
  email: "info@malpassbrickwork.co.uk", // 👈 EDIT if a real inbox exists

  // Socials & reviews -------------------------------------------------------
  instagram: "https://www.instagram.com/malpassbrickwork/",
  instagramHandle: "@malpassbrickwork",
  // 👇 EDIT: paste the business's Facebook page URL (or leave "" to hide it)
  facebook: "",
  // 👇 EDIT: the Google Business profile link customers use to READ reviews
  googleReviews: "https://www.google.com/search?q=Malpass+Brickwork+reviews",
  // 👇 EDIT: the "write a review" link from the Google Business profile
  googleWriteReview: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",

  hours: [
    { day: "Mon to Fri", time: "7:00am to 6:00pm" },
    { day: "Saturday", time: "8:00am to 4:00pm" },
    { day: "Sunday", time: "Closed (calls welcome)" },
  ],
} as const;

/** Pre-fills the WhatsApp chat with a message. Used by every WhatsApp button. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  const text =
    message ??
    `Hi, I found Malpass Brickwork online and I'd like a free quote.`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function telLink(): string {
  return `tel:${site.phoneDial}`;
}

// ── Service categories (the different categories of work offered) ──────────
export type Service = {
  slug: string;
  title: string;
  icon: string; // lucide-react icon name
  blurb: string; // short line for the card
  overview: string; // fuller description for the detail panel
  points: string[]; // "what's included"
  expect: string[]; // "what to expect" on the job
};

export const services: Service[] = [
  {
    slug: "brick-block",
    title: "Brick & Block Work",
    icon: "BrickWall",
    blurb:
      "New builds, garages and structural brick & blockwork laid clean, level and built to last.",
    overview:
      "The structural backbone of most builds. We lay brick and block for new builds, garages and outbuildings, keeping every course level, plumb and properly tied so the structure is sound for the long run.",
    points: ["New builds & garages", "Structural blockwork", "Cavity walls & insulation"],
    expect: [
      "Footings checked and set out before we start",
      "Clean cavity work with the correct wall ties",
      "Regular gauge and level checks as we build",
      "Site left tidy at the end of every day",
    ],
  },
  {
    slug: "extensions",
    title: "House Extensions",
    icon: "Home",
    blurb:
      "Single and double-storey extensions, from footings to finished brickwork that matches your home.",
    overview:
      "Adding space to your home starts with solid brickwork. We build the brick and block shell for single and double-storey extensions, matched to your existing house so it looks like it was always meant to be there.",
    points: ["Single & double storey", "Matched to existing brick", "Footings & foundations"],
    expect: [
      "Brick matched to your existing property",
      "Cavity walls built to current building regs",
      "Worked in around your other trades",
      "Left weathertight and ready for the next stage",
    ],
  },
  {
    slug: "garden-walls",
    title: "Garden & Boundary Walls",
    icon: "Fence",
    blurb:
      "Garden walls, boundary walls and piers built straight, strong and finished to a high standard.",
    overview:
      "A well-built wall lifts the look of the whole property. From low garden walls to full boundary walls and piers, we build them straight, strong and finished off with a neat coping that keeps the weather out.",
    points: ["Garden & boundary walls", "Brick piers & gate posts", "Copings & feature courses"],
    expect: [
      "Proper footings so the wall stays put",
      "Your choice of brick, bond and coping",
      "Piers and gate posts where they're needed",
      "Clean, consistent pointing throughout",
    ],
  },
  {
    slug: "repointing",
    title: "Repointing & Restoration",
    icon: "Hammer",
    blurb:
      "Tired, crumbling mortar raked out and repointed to protect your property and bring it back to life.",
    overview:
      "Old, failing mortar lets water in and makes a house look tired. We rake out the worn joints and repoint with the right mix, protecting the brickwork and smartening up the whole place at the same time.",
    points: ["Lime & sand/cement pointing", "Weatherproof finish", "Heritage & period work"],
    expect: [
      "Old joints raked out to the correct depth",
      "Mortar matched for colour and strength",
      "Lime mortar for period and listed properties",
      "A crisp, weatherproof finish",
    ],
  },
  {
    slug: "brick-repairs",
    title: "Brick Repairs & Crack Stitching",
    icon: "Wrench",
    blurb:
      "Cracked, spalled or bowing brickwork repaired and stitched back to full strength.",
    overview:
      "Cracked, bowing or spalled brickwork won't fix itself. We repair damaged areas and stitch cracks back together so the wall is sound, safe and tidy again, with the repair blended into the surrounding brick.",
    points: ["Crack stitching", "Spalled brick replacement", "Lintel & bonding repairs"],
    expect: [
      "An honest assessment of what's actually needed",
      "Crack stitching to re-tie the brickwork",
      "Damaged bricks cut out and replaced",
      "Repairs blended into the existing wall",
    ],
  },
  {
    slug: "chimneys",
    title: "Chimney Repairs & Rebuilds",
    icon: "Factory",
    blurb:
      "Chimney stacks rebuilt, repointed and re-flaunched to keep the weather out for good.",
    overview:
      "Chimneys take the worst of the weather. We repoint, re-flaunch and rebuild stacks, from a quick tidy-up to a full rebuild, keeping the rain where it belongs and the stack safe.",
    points: ["Full & partial rebuilds", "Re-flaunching & flashing", "Removal & make-good"],
    expect: [
      "Safe access and scaffolding arranged",
      "Repair or rebuild to suit the condition",
      "New flaunching and flashing where needed",
      "All debris cleared and made good",
    ],
  },
  {
    slug: "paving",
    title: "Patios, Paving & Driveways",
    icon: "Grid3x3",
    blurb:
      "Patios, paths and driveways laid with the perfect fall and a clean, lasting finish.",
    overview:
      "Patios, paths and driveways that look great and last. We prep the base properly and lay with the right falls so water drains away and the surface stays put for years.",
    points: ["Patios & paths", "Block-paved driveways", "Steps & edgings"],
    expect: [
      "Ground dug out and the base laid correctly",
      "Proper falls so water drains away",
      "Block, slab or natural stone to suit",
      "Edges and steps finished neatly",
    ],
  },
  {
    slug: "feature-brickwork",
    title: "Feature Brickwork",
    icon: "Sparkles",
    blurb:
      "Arches, pillars, soldier courses and feature panels. The detail work that sets a build apart.",
    overview:
      "The details that make a build stand out. Arches, pillars, soldier courses and decorative panels, set out carefully and built with a steady hand so they become the part everyone notices.",
    points: ["Brick arches & soffits", "Pillars & columns", "Decorative bonds & panels"],
    expect: [
      "Careful setting out and templating",
      "Arches and curves built to the opening",
      "Matched or contrasting brick for effect",
      "The kind of finish that gets people looking",
    ],
  },
];

// ── Process steps ──────────────────────────────────────────────────────────
export const processSteps = [
  {
    n: "01",
    title: "Get in touch",
    body: "Send us a WhatsApp or give us a call. Tell us about the job, and a few photos always help.",
  },
  {
    n: "02",
    title: "Free, no-pressure quote",
    body: "A clear, honest price with no hidden extras. You'll know exactly where you stand.",
  },
  {
    n: "03",
    title: "Quality work, on time",
    body: "Tidy, reliable and built to last, finished to the standard you'd expect from a specialist.",
  },
];

// ── Testimonials (placeholders, swap for real reviews) ─────────────────────
export const testimonials = [
  {
    name: "Sarah T.",
    location: "Homeowner",
    quote:
      "Malpass Brickwork rebuilt our garden wall and repointed the front of the house. Spotless work, and you'd never know where the new brick meets the old. Couldn't fault them.",
  },
  {
    name: "Dave M.",
    location: "Extension build",
    quote:
      "The brickwork on our extension is razor straight. They turned up when they said they would, kept the site tidy, and the price was exactly as quoted.",
  },
  {
    name: "Priya K.",
    location: "Repointing",
    quote:
      "Honest, polite and seriously good at what they do. The repointing has completely transformed the look of our period house.",
  },
  {
    name: "Tom and Jen",
    location: "New build garage",
    quote:
      "From footings to finish, the whole thing was handled brilliantly. Highly recommend Malpass Brickwork to anyone.",
  },
];

// ── Navigation ───────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Cost estimate", href: "#estimate" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
