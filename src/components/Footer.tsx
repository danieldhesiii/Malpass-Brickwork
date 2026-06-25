import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { site, telLink, navLinks } from "@/lib/site";
import Logo from "./Logo";
import { QuoteButton } from "./CTAButtons";
import { SocialIcons, GoogleReviewButton } from "./Socials";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Let&apos;s build something solid.
            </h2>
            <p className="mt-2 text-white/70">
              Free quotes across {site.serviceArea}. No obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <QuoteButton size="lg" label="Get a free quote" />
            <a
              href={telLink()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm text-white/60">
            {site.name}. Specialist bricklaying across {site.serviceArea}.
            Extensions, walls, repointing, chimneys and more, finished to a
            standard that lasts.
          </p>
          <div className="mt-5">
            <SocialIcons tone="dark" />
          </div>
          <div className="mt-4">
            <GoogleReviewButton />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-clay-400" />
              <a href={telLink()} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-clay-400" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-400" />
              <span className="capitalize">{site.serviceArea}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* Extra bottom clearance on mobile so the floating WhatsApp button
            never overlaps the copyright line / footer links. */}
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 pb-28 text-xs text-white/45 sm:flex-row sm:pb-6">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <a
              href={site.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Google reviews
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
