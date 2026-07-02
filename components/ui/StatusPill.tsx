type Status = "PENDING" | "AWAITING_VERIFICATION" | "CONFIRMED" | "CANCELLED";

const STYLE: Record<Status, string> = {
  PENDING: "border-saffron/40 bg-saffron/10 text-[#a9781a]",
  AWAITING_VERIFICATION: "border-coral/40 bg-coral/10 text-[#1f6f96]",
  CONFIRMED: "border-alpine/30 bg-alpine/10 text-alpine",
  CANCELLED: "border-line bg-cream-deep text-muted",
};

const LABEL: Record<Status, string> = {
  PENDING: "pending",
  AWAITING_VERIFICATION: "awaiting verification",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};

/** Booking status chip, shared across account + admin views. */
export default function StatusPill({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STYLE[status]} ${className}`}
    >
      {LABEL[status]}
    </span>
  );
}
