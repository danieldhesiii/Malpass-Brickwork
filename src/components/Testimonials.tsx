"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { site, testimonials } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { GoogleGlyph } from "./CTAButtons";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-navy-900 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-clay-400">
              Don&apos;t just take our word for it
            </p>
          </Reveal>
          <SplitHeading
            text="What customers say."
            className="text-4xl font-extrabold sm:text-5xl"
          />
        </div>

        <Reveal direction="scale">
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
                  <Quote className="mb-4 h-8 w-8 text-clay-400" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-clay-400 text-clay-400"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-lg leading-relaxed text-white/85">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4">
                    <span className="block font-bold">{t.name}</span>
                    <span className="text-sm text-white/55">{t.location}</span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={site.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03]"
          >
            <GoogleGlyph className="h-5 w-5" />
            Read our reviews on Google
          </a>
          <a
            href={site.googleWriteReview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Worked with us? Leave a review
          </a>
        </Reveal>
      </div>
    </section>
  );
}
