/**
 * HUX-PED text wordmark. `invert` switches to light text for dark backgrounds.
 * Pass a Tailwind text-size class via `className` (e.g. `text-2xl`) to size it.
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
      className={`display inline-flex select-none items-center whitespace-nowrap font-extrabold uppercase leading-none tracking-[-0.02em] ${
        invert ? "text-cream" : "text-ink"
      } ${className}`}
    >
      HU
      <span className={invert ? "text-coral" : "text-[#6b8e1f]"}>X</span>
      <span className={`mx-[0.04em] ${invert ? "text-coral" : "text-[#6b8e1f]"}`}>-</span>
      <span className={invert ? "text-coral" : "text-[#6b8e1f]"}>PED</span>
    </span>
  );
}
