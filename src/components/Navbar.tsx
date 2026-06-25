"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, site, telLink } from "@/lib/site";
import Logo from "./Logo";
import { QuoteButton } from "./CTAButtons";
import { SocialIcons } from "./Socials";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-4 transition-all duration-300 ${
            scrolled
              ? "glass border border-black/5 py-2.5 shadow-lg shadow-navy-900/5"
              : "py-2"
          }`}
        >
          <a href="#top" aria-label="Malpass Brickwork home">
            <Logo />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy-900/80 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SocialIcons className="hidden xl:flex" />
            <a
              href={telLink()}
              className="hidden items-center gap-2 rounded-full border border-navy-900/15 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5 sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <div className="hidden sm:block">
              <QuoteButton label="Free quote" />
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu sheet */}
      <div
        className={`fixed inset-0 top-0 z-30 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-3 top-3 rounded-3xl bg-stone-50 p-6 shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-4 text-2xl font-semibold text-navy-900 transition-colors hover:bg-navy-900/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3" onClick={() => setOpen(false)}>
            <QuoteButton size="lg" className="w-full" label="Get a free quote" />
            <a
              href={telLink()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy-900/15 px-7 py-4 text-base font-semibold text-navy-900"
            >
              <Phone className="h-5 w-5" />
              Call {site.phoneDisplay}
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 border-t border-navy-900/10 pt-6">
            <SocialIcons />
          </div>
        </div>
      </div>
    </header>
  );
}
