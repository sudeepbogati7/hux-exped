/** HUX EXPED peak mark — twin overlapping summits forming an "M". */
export default function Logo({
  className = "",
  title = "HUX EXPED",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      {/* back peak */}
      <path d="M60 6 L96 74 L74 74 L60 44 L46 74 L24 74 Z" opacity="0.55" />
      {/* front peak */}
      <path d="M40 22 L74 74 L6 74 Z" />
    </svg>
  );
}
