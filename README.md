# Malpass Brickwork

Marketing website for **Malpass Brickwork**, a bricklaying business. A fast,
single-page Next.js site with a services overview, an interactive cost
estimator, a work gallery, customer reviews, a quote form and WhatsApp
integration.

**Live preview locally:** `npm run dev` → http://localhost:3000

---

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`)
- **GSAP** + **Lenis** (smooth scroll) + **Swiper** (carousels) for animation
- **lucide-react** for icons
- Fonts: **Archivo** (headings) + **Hanken Grotesk** (body)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
```

> Port note: if 3000 is in use, run `PORT=3100 npm run dev`.

---

## Editing the business details

Almost everything the owner needs to change lives in **one file:**
**`src/lib/site.ts`**. Update it and the change appears everywhere on the site.

| What | Where in `site.ts` | Notes |
|------|--------------------|-------|
| Phone number | `phoneDisplay`, `phoneDial`, `whatsappNumber` | WhatsApp number is international format, no `+` or spaces (e.g. `447941510504`) |
| Service area | `serviceArea` | **Needs setting** to the real region/county (feeds hero, footer, SEO) |
| Years / jobs figures | `yearsExperience`, `jobsCompleted` | Used in the hero + about stats |
| Email | `email` | |
| Instagram | `instagram`, `instagramHandle` | |
| Facebook | `facebook` | Leave `""` to hide it |
| Google reviews | `googleReviews`, `googleWriteReview` | **Replace the placeholder Google URLs** with the real Business Profile links (read + write-a-review) |
| Opening hours | `hours` | |
| Services | `services[]` | Title, blurb, overview, "what's included" and "what to expect" per service |
| Reviews | `testimonials[]` | Currently placeholder quotes |

### Gallery photos

The gallery ships with on-brand placeholder tiles. To use real photos:

1. Save images into `public/gallery/` (e.g. `wall-01.jpg`).
2. In `src/lib/gallery.ts`, add `src: "/gallery/wall-01.jpg"` to the matching
   item (and set its `category` + `alt`).

Any item without a `src` shows a placeholder, so you can swap them in gradually.

### Cost estimator rates

The estimator's rate model lives in `src/lib/estimator.ts` (per-m² rates,
finish/access/skin multipliers, footings, chimney/feature pricing). Edit the
numbers there to match real pricing. All results are clearly shown as a
**guide only**.

---

## How the buttons behave

- **Every "Get a free quote" button** scrolls to the contact form at the bottom.
- **The floating green button** (bottom-right) is the only thing that opens
  WhatsApp directly.
- **Service cards** open a detail panel (overview + what's involved), not WhatsApp.
- The **quote form** composes a pre-filled WhatsApp message on submit — no
  backend required. (Swap to an email service later if preferred.)

## Pages

- `/` — the main site
- `/privacy` — privacy policy (linked in the footer; update the "Last updated"
  date in `src/app/privacy/page.tsx` when it changes)

---

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new) (or any Node host): connect
the repo, no environment variables required. `npm run build` must pass first.
