/**
 * Brand lockup rebuilt as crisp SVG from the Instagram badge: a navy shield
 * holding a trowel, with the MALPASS BRICKWORK wordmark. Scales perfectly and
 * stays sharp on any screen. `variant="mark"` renders just the badge.
 */
export default function Logo({
  variant = "full",
  className = "",
  light = false,
}: {
  variant?: "full" | "mark";
  className?: string;
  light?: boolean;
}) {
  const textColor = light ? "#ffffff" : "var(--color-navy-900)";
  const subColor = light ? "rgba(255,255,255,0.7)" : "var(--color-brick-600)";

  const Mark = (
    <svg viewBox="0 0 64 64" className="h-full w-auto" aria-hidden="true">
      {/* shield */}
      <path
        d="M32 3 56 12v20c0 14-10.5 23.5-24 29C18.5 55.5 8 46 8 32V12L32 3Z"
        fill="var(--color-navy-900)"
        stroke="var(--color-royal-bright)"
        strokeWidth="2"
      />
      <path
        d="M32 9 50 16v15.5C50 42.5 42 50 32 54.5 22 50 14 42.5 14 31.5V16L32 9Z"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
      {/* trowel */}
      <g transform="translate(0,-1)">
        <path
          d="M20 22h17l-7.5 12c-.7 1.1-2.3 1.1-3 0L20 22Z"
          fill="#ffffff"
        />
        <rect x="36.5" y="20" width="9" height="3.4" rx="1.7" fill="#ffffff" />
        <rect x="43" y="17.5" width="3" height="8.4" rx="1.5" fill="var(--color-clay-400)" />
      </g>
    </svg>
  );

  if (variant === "mark") {
    return <div className={`aspect-square ${className}`}>{Mark}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="h-10 w-10 shrink-0">{Mark}</div>
      <div className="leading-none">
        <div
          className="font-[family-name:var(--font-archivo)] text-[15px] font-extrabold tracking-tight"
          style={{ color: textColor }}
        >
          MALPASS
        </div>
        <div
          className="font-[family-name:var(--font-archivo)] text-[12px] font-bold tracking-[0.18em]"
          style={{ color: subColor }}
        >
          BRICKWORK
        </div>
      </div>
    </div>
  );
}
