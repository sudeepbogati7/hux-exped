import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BookingStatusControl from "@/components/admin/BookingStatusControl";

const FILTERS = ["ALL", "PENDING", "AWAITING_VERIFICATION", "CONFIRMED", "CANCELLED"] as const;
type Filter = (typeof FILTERS)[number];
const FILTER_LABEL: Record<Filter, string> = {
  ALL: "All",
  PENDING: "Pending",
  AWAITING_VERIFICATION: "To verify",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};

export default async function AdminBookings({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const active: Filter = (FILTERS as readonly string[]).includes(status ?? "") ? (status as Filter) : "ALL";

  const bookings = await prisma.booking.findMany({
    where: active === "ALL" ? {} : { status: active },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      status: true,
      travellers: true,
      departureDate: true,
      totalUSD: true,
      createdAt: true,
      paymentMethod: true,
      paymentProof: true,
      user: { select: { name: true, email: true } },
      expedition: { select: { name: true, slug: true, kind: true } },
    },
  });

  const toVerify = await prisma.booking.count({ where: { status: "AWAITING_VERIFICATION" } });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl text-ink sm:text-4xl">Bookings</h1>
          <p className="mt-2 text-ink-soft">Review and update every booking.</p>
        </div>
        {toVerify > 0 && (
          <Link href="/admin/bookings?status=AWAITING_VERIFICATION" className="rounded-full bg-saffron px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink">
            {toVerify} transfer{toVerify === 1 ? "" : "s"} to verify
          </Link>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={f === "ALL" ? "/admin/bookings" : `/admin/bookings?status=${f}`}
            className={`rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
              active === f ? "bg-ink text-cream" : "border border-line text-ink-soft hover:border-coral"
            }`}
          >
            {FILTER_LABEL[f]}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-cream">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="border-b border-line bg-cream-deep text-left text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Trip</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Departure</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Payment</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted">No bookings{active !== "ALL" ? ` (${FILTER_LABEL[active].toLowerCase()})` : ""}.</td></tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/${b.expedition.kind === "PEAK" ? "mountaineering" : "treks"}/${b.expedition.slug}`} className="font-semibold text-ink hover:text-[#1f6f96]">
                      {b.expedition.name}
                    </Link>
                    <span className="block text-[0.72rem] text-muted">{b.travellers} pax</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    <span className="block">{b.user.name ?? "—"}</span>
                    <span className="block text-[0.72rem] text-muted">{b.user.email}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{b.departureDate}</td>
                  <td className="px-4 py-3 text-ink-soft">USD {b.totalUSD.toLocaleString("en-US")}</td>
                  <td className="px-4 py-3">
                    <PaymentCell method={b.paymentMethod} proof={b.paymentProof} />
                  </td>
                  <td className="px-4 py-3"><BookingStatusControl id={b.id} status={b.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentCell({ method, proof }: { method: "STRIPE" | "BANK_TRANSFER" | null; proof: string | null }) {
  if (!method) return <span className="text-[0.72rem] text-muted">—</span>;
  if (method === "STRIPE") {
    return <span className="text-[0.74rem] font-semibold text-ink">Card / Stripe</span>;
  }
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.74rem] font-semibold text-ink">Bank transfer</span>
      {proof ? (
        <a
          href={proof}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#1f6f96] hover:underline"
        >
          View proof
        </a>
      ) : (
        <span className="text-[0.72rem] text-muted">no proof</span>
      )}
    </div>
  );
}
