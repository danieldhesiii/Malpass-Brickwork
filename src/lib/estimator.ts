/**
 * BRICKLAYER COST ESTIMATOR — rate model + calculation
 * ────────────────────────────────────────────────────────────────────────
 * Produces an indicative price RANGE (low–high) for common bricklaying jobs
 * using typical UK supply-and-fit rates. These are deliberately ballpark
 * figures for a guide only; the real number always comes from seeing the job
 * in person. Edit the rates below to match the business's actual pricing.
 *
 * All rates are £ and include labour + materials unless noted.
 */

export type FinishId = "standard" | "facing" | "reclaimed";
export type AccessId = "easy" | "moderate" | "hard";
export type SkinId = "single" | "double";

export const finishes: { id: FinishId; label: string; mult: number }[] = [
  { id: "standard", label: "Standard / common brick", mult: 1 },
  { id: "facing", label: "Facing / premium brick", mult: 1.18 },
  { id: "reclaimed", label: "Reclaimed / handmade", mult: 1.36 },
];

export const accessOptions: { id: AccessId; label: string; mult: number }[] = [
  { id: "easy", label: "Easy: ground level, open access", mult: 1 },
  { id: "moderate", label: "Moderate: some height or tight spots", mult: 1.12 },
  { id: "hard", label: "Difficult: scaffolding or restricted", mult: 1.3 },
];

export const skins: { id: SkinId; label: string; mult: number }[] = [
  { id: "single", label: "Single skin (half-brick)", mult: 1 },
  { id: "double", label: "Double skin / cavity", mult: 1.7 },
];

export type JobMode = "wall" | "area" | "fixed" | "count";

export type FixedVariant = { id: string; label: string; low: number; high: number };

export type JobType = {
  id: string;
  label: string;
  desc: string;
  mode: JobMode;
  /** £ per m² (wall/area) — supply & fit. */
  rateLow?: number;
  rateHigh?: number;
  /** Wall jobs: add footings priced per linear metre of length. */
  hasFoundation?: boolean;
  /** Wall jobs: offer single vs double-skin choice. */
  hasSkin?: boolean;
  /** Whether a brick-finish choice is relevant. */
  hasFinish?: boolean;
  /** fixed mode: pick one of these. */
  variants?: FixedVariant[];
  /** count mode: priced each. */
  countVariants?: FixedVariant[];
  countLabel?: string;
};

export const FOUNDATION_PER_M = { low: 45, high: 75 };

export const jobTypes: JobType[] = [
  {
    id: "garden-wall",
    label: "Garden / boundary wall",
    desc: "Brick wall to a garden or boundary, including footings.",
    mode: "wall",
    rateLow: 120,
    rateHigh: 185,
    hasFoundation: true,
    hasSkin: true,
    hasFinish: true,
  },
  {
    id: "extension",
    label: "Extension brickwork",
    desc: "The brick & block shell for a single/double-storey extension (cavity).",
    mode: "wall",
    rateLow: 230,
    rateHigh: 360,
    hasFoundation: true,
    hasSkin: false,
    hasFinish: true,
  },
  {
    id: "blockwork",
    label: "New build / blockwork",
    desc: "Brick & block walls for garages, outbuildings and new structures.",
    mode: "wall",
    rateLow: 95,
    rateHigh: 165,
    hasFoundation: true,
    hasSkin: true,
    hasFinish: true,
  },
  {
    id: "repointing",
    label: "Repointing",
    desc: "Raking out and repointing existing brickwork, priced by wall area.",
    mode: "wall",
    rateLow: 38,
    rateHigh: 78,
    hasFoundation: false,
    hasSkin: false,
    hasFinish: false,
  },
  {
    id: "paving",
    label: "Patio / paving",
    desc: "Patios, paths and block paving, including base preparation.",
    mode: "area",
    rateLow: 85,
    rateHigh: 150,
    hasFinish: true,
  },
  {
    id: "chimney",
    label: "Chimney repair / rebuild",
    desc: "Repairs through to a full stack rebuild.",
    mode: "fixed",
    variants: [
      { id: "repoint", label: "Repoint & re-flaunch", low: 450, high: 1100 },
      { id: "partial", label: "Partial rebuild", low: 1200, high: 2200 },
      { id: "full", label: "Full stack rebuild", low: 1800, high: 3800 },
    ],
  },
  {
    id: "feature",
    label: "Feature brickwork",
    desc: "Arches, pillars and decorative panels, priced per item.",
    mode: "count",
    hasFinish: true,
    countLabel: "How many?",
    countVariants: [
      { id: "arch", label: "Brick arch", low: 280, high: 650 },
      { id: "pillar", label: "Pillar / pier", low: 180, high: 480 },
      { id: "panel", label: "Feature panel", low: 350, high: 900 },
    ],
  },
];

export type EstimatorInput = {
  jobId: string;
  length: number; // m  (wall mode)
  height: number; // m  (wall mode)
  area: number; // m²  (area mode)
  skin: SkinId;
  finish: FinishId;
  access: AccessId;
  variantId: string; // fixed/count mode
  quantity: number; // count mode
  includeFoundation: boolean;
};

export type EstimateResult = {
  low: number;
  high: number;
  area?: number;
  lines?: { label: string; value: string }[];
  ok: boolean;
  message?: string;
};

const finishMult = (id: FinishId) =>
  finishes.find((f) => f.id === id)?.mult ?? 1;
const accessMult = (id: AccessId) =>
  accessOptions.find((a) => a.id === id)?.mult ?? 1;
const skinMult = (id: SkinId) => skins.find((s) => s.id === id)?.mult ?? 1;

const roundTo = (n: number) => {
  const step = n >= 3000 ? 50 : 10;
  return Math.round(n / step) * step;
};

export const gbp = (n: number) =>
  n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

export function estimate(input: EstimatorInput): EstimateResult {
  const job = jobTypes.find((j) => j.id === input.jobId);
  if (!job)
    return {
      low: 0,
      high: 0,
      ok: false,
      message: "Choose a job type and fill in the details to see your estimate.",
    };

  const fMult = job.hasFinish ? finishMult(input.finish) : 1;
  const aMult = accessMult(input.access);
  const lines: { label: string; value: string }[] = [];

  if (job.mode === "wall") {
    const { length, height } = input;
    if (!length || !height || length <= 0 || height <= 0) {
      return {
        low: 0,
        high: 0,
        ok: false,
        message: "Enter the wall length and height to see your estimate.",
      };
    }
    const area = Math.round(length * height * 10) / 10;
    const sMult = job.hasSkin ? skinMult(input.skin) : 1;

    let low = area * (job.rateLow ?? 0) * sMult * fMult * aMult;
    let high = area * (job.rateHigh ?? 0) * sMult * fMult * aMult;

    lines.push({ label: "Wall area", value: `${area} m²` });
    if (job.hasSkin)
      lines.push({
        label: "Wall type",
        value: skins.find((s) => s.id === input.skin)?.label ?? "",
      });

    if (job.hasFoundation && input.includeFoundation) {
      const fLow = length * FOUNDATION_PER_M.low;
      const fHigh = length * FOUNDATION_PER_M.high;
      low += fLow;
      high += fHigh;
      lines.push({ label: "Footings", value: `${length} m included` });
    }
    return finalise(low, high, lines, area);
  }

  if (job.mode === "area") {
    const { area } = input;
    if (!area || area <= 0)
      return {
        low: 0,
        high: 0,
        ok: false,
        message: "Enter the area in m² to see your estimate.",
      };
    const low = area * (job.rateLow ?? 0) * fMult * aMult;
    const high = area * (job.rateHigh ?? 0) * fMult * aMult;
    lines.push({ label: "Area", value: `${area} m²` });
    return finalise(low, high, lines, area);
  }

  if (job.mode === "fixed") {
    const v = job.variants?.find((x) => x.id === input.variantId) ?? job.variants?.[0];
    if (!v) return { low: 0, high: 0, ok: false, message: "Pick an option." };
    lines.push({ label: "Work", value: v.label });
    return finalise(v.low * aMult, v.high * aMult, lines);
  }

  // count mode
  const v =
    job.countVariants?.find((x) => x.id === input.variantId) ??
    job.countVariants?.[0];
  if (!v) return { low: 0, high: 0, ok: false, message: "Pick an item." };
  const qty = Math.max(1, Math.floor(input.quantity || 1));
  lines.push({ label: "Item", value: `${qty} × ${v.label}` });
  return finalise(v.low * qty * fMult * aMult, v.high * qty * fMult * aMult, lines);

  function finalise(
    low: number,
    high: number,
    detail: { label: string; value: string }[],
    area?: number
  ): EstimateResult {
    if (job!.hasFinish)
      detail.push({
        label: "Brick finish",
        value: finishes.find((f) => f.id === input.finish)?.label ?? "",
      });
    detail.push({
      label: "Access",
      value: accessOptions.find((a) => a.id === input.access)?.label ?? "",
    });
    return {
      low: roundTo(low),
      high: roundTo(high),
      area,
      lines: detail,
      ok: true,
    };
  }
}
