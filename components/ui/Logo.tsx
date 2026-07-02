/**
 * HUX-PED text wordmark (the brand's visual identity — no separate logo).
 *   HUX  — Himalayan Navy  (Summit White on dark)
 *   –    — Saffron Gold
 *   PED  — Glacier Blue    (bright glacier on dark)
 * `invert` switches to the dark-background variant. Pass a Tailwind text-size
 * class via `className` (e.g. `text-2xl`).
 */
export default function Logo({
  className = "text-2xl",
  invert = false,
  priority: _priority = false,
}: {
  className?: string;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <span
      className={`display inline-flex select-none items-center whitespace-nowrap font-extrabold uppercase leading-none tracking-[0.01em] ${
        invert ? "text-cream" : "text-ink"
      } ${className}`}
    >
      HUX
      <span className="mx-[0.03em] text-saffron">-</span>
      <span className={invert ? "text-coral-bright" : "text-coral"}>PED</span>
    </span>
  );
}
