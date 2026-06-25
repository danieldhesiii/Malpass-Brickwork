import { Check } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import Counter from "./Counter";
import Logo from "./Logo";
import { QuoteButton } from "./CTAButtons";
import { SocialIcons } from "./Socials";

const points = [
  "Time-served, specialist bricklayers",
  "Tidy, reliable and turn up when we say",
  "Honest pricing, the quote is the price",
  "Work you can be proud of, finished to last",
];

export default function About() {
  return (
    <section id="about" className="bg-navy-950 py-24 text-white sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <Reveal direction="left">
          <div className="relative">
            <div className="brick-wall relative overflow-hidden rounded-[2rem] border border-white/10 p-10">
              <div className="relative flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-6 h-28 w-28 rounded-3xl bg-navy-950/60 p-4 ring-1 ring-white/10">
                  <Logo variant="mark" light />
                </div>
                <p className="text-2xl font-bold">{site.name}</p>
                <p className="mt-1 text-white/60">Brickwork specialists</p>
                <div className="mt-6">
                  <SocialIcons tone="dark" />
                </div>
              </div>
            </div>

            {/* Floating stat chips */}
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-royal px-5 py-4 shadow-xl sm:-left-6">
              <Counter
                value={site.yearsExperience}
                suffix="+"
                className="block text-3xl font-extrabold"
              />
              <span className="text-xs uppercase tracking-wider text-white/80">
                Years experience
              </span>
            </div>
            <div className="absolute -right-3 top-8 rounded-2xl bg-navy-700 px-5 py-4 shadow-xl">
              <Counter value={site.jobsCompleted} suffix="+" className="block text-3xl font-extrabold" />
              <span className="text-xs uppercase tracking-wider text-white/80">
                Jobs completed
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="eyebrow mb-3 text-clay-400">About {site.name}</p>
          </Reveal>
          <SplitHeading
            text="Specialist hands, honest graft."
            className="text-4xl font-extrabold sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-white/70">
              {site.name} is built on a simple idea: do brilliant brickwork,
              treat people straight, and leave every job tidy. From small garden
              walls to full extensions, you get the same specialist standard and
              the same honest service every time.
            </p>
          </Reveal>

          <Reveal stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-400/20 text-clay-400">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-white/85">{p}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-9">
            <QuoteButton size="lg" label="Get a free quote" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
