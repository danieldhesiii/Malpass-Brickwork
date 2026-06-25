import { Phone, Clock, MapPin, Mail } from "lucide-react";
import { site, telLink } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import QuoteForm from "./QuoteForm";
import { WhatsAppButton, WhatsAppGlyph } from "./CTAButtons";
import { SocialIcons, GoogleReviewButton } from "./Socials";

export default function Contact() {
  return (
    <section id="contact" className="bg-stone-100 py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-3 text-brick-600">Get in touch</p>
          </Reveal>
          <SplitHeading
            text="Ready for a free quote?"
            className="text-4xl font-extrabold text-navy-900 sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-navy-900/70">
              The fastest way to reach us is WhatsApp or a quick call. Or fill in
              the form and we&apos;ll take it from there.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Details */}
          <Reveal direction="left" className="flex flex-col gap-4">
            <a
              href={telLink()}
              className="group flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-5 transition-colors hover:border-royal/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors group-hover:bg-royal">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-navy-900/55">Call us</span>
                <span className="block text-lg font-bold text-navy-900">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            <div className="group flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white">
                <WhatsAppGlyph className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block text-sm text-navy-900/55">WhatsApp</span>
                <span className="block text-lg font-bold text-navy-900">
                  Message anytime
                </span>
              </span>
              <WhatsAppButton label="Chat" />
            </div>

            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-5 transition-colors hover:border-royal/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors group-hover:bg-royal">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-navy-900/55">Email</span>
                <span className="block text-lg font-bold text-navy-900">
                  {site.email}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-white p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-navy-900/55">Area covered</span>
                <span className="block text-lg font-bold capitalize text-navy-900">
                  {site.serviceArea}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border border-navy-900/10 bg-white p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white">
                  <Clock className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-navy-900">Opening hours</span>
              </div>
              <ul className="space-y-1.5">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between text-sm text-navy-900/70"
                  >
                    <span className="font-medium text-navy-900">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials + reviews */}
            <div className="rounded-2xl border border-navy-900/10 bg-white p-5">
              <p className="mb-4 text-sm font-semibold text-navy-900">
                Follow our work &amp; leave a review
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SocialIcons />
                <GoogleReviewButton />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right">
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
