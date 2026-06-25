import { processSteps } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { QuoteButton } from "./CTAButtons";

export default function Process() {
  return (
    <section className="bg-stone-50 py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brick-600">
              How it works
            </p>
          </Reveal>
          <SplitHeading
            text="Three simple steps."
            className="text-4xl font-extrabold text-navy-900 sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-navy-900/70">
              No jargon, no faff. Getting your brickwork sorted couldn&apos;t be
              easier.
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-8"
            >
              <span className="font-[family-name:var(--font-archivo)] text-7xl font-extrabold text-navy-900/5">
                {step.n}
              </span>
              <h3 className="-mt-6 mb-3 text-2xl font-bold text-navy-900">
                {step.title}
              </h3>
              <p className="text-navy-900/65">{step.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <QuoteButton size="lg" label="Get a free quote" />
        </Reveal>
      </div>
    </section>
  );
}
