"use client";

import { useMemo, useState } from "react";
import { Calculator, Info, ArrowRight, RotateCcw } from "lucide-react";
import {
  jobTypes,
  finishes,
  accessOptions,
  skins,
  estimate,
  gbp,
  type EstimatorInput,
  type FinishId,
  type AccessId,
  type SkinId,
} from "@/lib/estimator";
import { whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";
import { WhatsAppGlyph } from "./CTAButtons";

const firstVariant = (jobId: string) => {
  const j = jobTypes.find((x) => x.id === jobId);
  return j?.variants?.[0]?.id ?? j?.countVariants?.[0]?.id ?? "";
};

export default function CostEstimator() {
  // Everything starts empty/unselected so the estimate begins at £0 and only
  // updates once the visitor has chosen and filled things in.
  const [jobId, setJobId] = useState("");
  const [length, setLength] = useState(NaN);
  const [height, setHeight] = useState(NaN);
  const [area, setArea] = useState(NaN);
  const [skin, setSkin] = useState<SkinId>("single");
  const [finish, setFinish] = useState<FinishId>("standard");
  const [access, setAccess] = useState<AccessId>("easy");
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [includeFoundation, setIncludeFoundation] = useState(true);

  const job = jobTypes.find((j) => j.id === jobId);

  const onJobChange = (id: string) => {
    setJobId(id);
    setVariantId(firstVariant(id));
  };

  const resetAll = () => {
    setJobId("");
    setLength(NaN);
    setHeight(NaN);
    setArea(NaN);
    setSkin("single");
    setFinish("standard");
    setAccess("easy");
    setVariantId("");
    setQuantity(1);
    setIncludeFoundation(true);
  };

  const input: EstimatorInput = {
    jobId,
    length,
    height,
    area,
    skin,
    finish,
    access,
    variantId,
    quantity,
    includeFoundation,
  };

  const result = useMemo(() => estimate(input), [
    jobId,
    length,
    height,
    area,
    skin,
    finish,
    access,
    variantId,
    quantity,
    includeFoundation,
  ]);

  const waMessage = useMemo(() => {
    if (!result.ok) return undefined;
    const lines = (result.lines ?? [])
      .map((l) => `• ${l.label}: ${l.value}`)
      .join("\n");
    return [
      `Hi, I used the cost estimator on your website.`,
      ``,
      `Job: ${job?.label ?? ""}`,
      lines,
      ``,
      `Rough estimate: ${gbp(result.low)} to ${gbp(result.high)}`,
      ``,
      `Could I get a proper quote please?`,
    ].join("\n");
  }, [result, job?.label]);

  return (
    <section id="estimate" className="bg-stone-200 py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-3 text-brick-600">Rough costs, up front</p>
          </Reveal>
          <SplitHeading
            text="Get a ballpark in 30 seconds."
            className="text-4xl font-extrabold text-navy-900 sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-navy-900/70">
              Most people just want a rough idea before they pick up the phone.
              Tell us a bit about the job and we&apos;ll give you a sensible
              price range, then we can firm it up properly.
            </p>
          </Reveal>
        </div>

        <Reveal direction="scale">
          <div className="grid overflow-hidden rounded-3xl border border-ink/10 bg-stone-50 shadow-xl shadow-ink/5 lg:grid-cols-[1.15fr_0.85fr]">
            {/* ── Form ── */}
            <div className="p-6 sm:p-9">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-navy-900">Your job</h3>
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-3.5 py-1.5 text-sm font-semibold text-navy-900/70 transition-colors hover:border-royal/40 hover:text-navy-900"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset all
                </button>
              </div>

              <Field label="What's the job?">
                <Select value={jobId} onChange={(e) => onJobChange(e.target.value)}>
                  <option value="">Choose a job type…</option>
                  {jobTypes.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.label}
                    </option>
                  ))}
                </Select>
                {job && (
                  <p className="mt-1.5 text-sm text-navy-900/55">{job.desc}</p>
                )}
              </Field>

              {!job && (
                <p className="rounded-xl border border-dashed border-navy-900/15 bg-stone-100 px-4 py-3 text-sm text-navy-900/55">
                  Pick a job type above to fill in the details.
                </p>
              )}

              {job && (
                <>
                  {/* Wall mode: length + height */}
                  {job.mode === "wall" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Wall length (m)">
                        <NumberInput value={length} min={0} step={0.5} placeholder="e.g. 5" onChange={setLength} />
                      </Field>
                      <Field label="Wall height (m)">
                        <NumberInput value={height} min={0} step={0.1} placeholder="e.g. 1.8" onChange={setHeight} />
                      </Field>
                    </div>
                  )}

                  {/* Area mode */}
                  {job.mode === "area" && (
                    <Field label="Area (m²)">
                      <NumberInput value={area} min={0} step={1} placeholder="e.g. 20" onChange={setArea} />
                    </Field>
                  )}

                  {/* Fixed / count variants */}
                  {(job.mode === "fixed" || job.mode === "count") && (
                    <Field label={job.mode === "count" ? "Which feature?" : "Type of work"}>
                      <Select value={variantId} onChange={(e) => setVariantId(e.target.value)}>
                        {(job.variants ?? job.countVariants ?? []).map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  {job.mode === "count" && (
                    <Field label={job.countLabel ?? "How many?"}>
                      <NumberInput value={quantity} min={1} step={1} placeholder="e.g. 2" onChange={setQuantity} />
                    </Field>
                  )}

                  {/* Skin */}
                  {job.hasSkin && (
                    <Field label="Wall type">
                      <Select value={skin} onChange={(e) => setSkin(e.target.value as SkinId)}>
                        {skins.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  {/* Finish */}
                  {job.hasFinish && (
                    <Field label="Brick / finish">
                      <Select value={finish} onChange={(e) => setFinish(e.target.value as FinishId)}>
                        {finishes.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  {/* Access */}
                  <Field label="Access">
                    <Select value={access} onChange={(e) => setAccess(e.target.value as AccessId)}>
                      {accessOptions.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  {/* Foundation toggle */}
                  {job.hasFoundation && (
                    <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 bg-stone-100 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={includeFoundation}
                        onChange={(e) => setIncludeFoundation(e.target.checked)}
                        className="h-5 w-5 accent-brick-600"
                      />
                      <span className="text-sm font-medium text-navy-900">
                        Include footings / foundations
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* ── Result ── */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-navy-900 p-6 text-white sm:p-9">
              <div className="brick-wall pointer-events-none absolute inset-0 opacity-25" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
                  <Calculator className="h-4 w-4 text-clay-400" />
                  Estimated cost
                </div>

                {result.ok ? (
                  <>
                    <div className="font-[family-name:var(--font-archivo)] text-4xl font-extrabold leading-none sm:text-5xl">
                      {gbp(result.low)}
                      <span className="mx-2 text-white/40">to</span>
                      {gbp(result.high)}
                    </div>
                    <dl className="mt-7 space-y-2.5 border-t border-white/10 pt-5">
                      {(result.lines ?? []).map((l) => (
                        <div
                          key={l.label}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <dt className="text-white/55">{l.label}</dt>
                          <dd className="text-right font-medium text-white/90">
                            {l.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : (
                  <>
                    <div className="font-[family-name:var(--font-archivo)] text-4xl font-extrabold leading-none text-white/30 sm:text-5xl">
                      {gbp(0)}
                    </div>
                    <p className="mt-5 border-t border-white/10 pt-5 text-white/70">
                      {result.message}
                    </p>
                  </>
                )}
              </div>

              <div className="relative mt-8">
                <a
                  href={waMessage ? whatsappLink(waMessage) : whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1fb955] active:scale-[0.98]"
                >
                  <WhatsAppGlyph className="h-5 w-5" />
                  Send this to us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-white/45">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  A guide only, based on typical rates. Your real price depends on
                  the bricks, site and design, which we&apos;ll confirm for free.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Small form primitives (kept local — only the estimator uses them) ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-brick-600 focus:ring-2 focus:ring-brick-600/20";

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={fieldClass} />;
}

function NumberInput({
  value,
  onChange,
  min,
  step,
  placeholder,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      value={Number.isFinite(value) ? value : ""}
      min={min}
      step={step}
      placeholder={placeholder}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={fieldClass}
    />
  );
}
