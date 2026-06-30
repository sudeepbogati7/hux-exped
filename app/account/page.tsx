import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Your account — HUX EXPED" };

export default async function AccountOverview() {
  const user = await requireUser("/account");

  const [total, confirmed, pending, recent] = await Promise.all([
    prisma.booking.count({ where: { userId: user.id } }),
    prisma.booking.count({ where: { userId: user.id, status: "CONFIRMED" } }),
    prisma.booking.count({ where: { userId: user.id, status: "PENDING" } }),
    prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        status: true,
        departureDate: true,
        travellers: true,
        totalUSD: true,
        expedition: { select: { name: true, slug: true, kind: true } },
      },
    }),
  ]);

  const stats = [
    { value: total, label: "Total bookings" },
    { value: confirmed, label: "Confirmed" },
    { value: pending, label: "Pending" },
  ];

  return (
    <div className="space-y-10">
      {/* stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-cream p-5 text-center sm:p-6">
            <div className="display text-3xl text-ink sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* recent bookings */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="display text-2xl text-ink">Recent bookings</h2>
          {total > 0 && (
            <Link href="/account/bookings" className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b8e1f] hover:underline">
              View all
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-cream p-10 text-center">
            <p className="display text-2xl text-ink">No trips booked yet.</p>
            <p className="mt-2 text-ink-soft">Find your next walk into the wild.</p>
            <Link
              href="/treks"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-coral px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
            >
              Browse treks
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {recent.map((b) => (
              <li key={b.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-cream p-5">
                <div>
                  <Link
                    href={`/${b.expedition.kind === "PEAK" ? "mountaineering" : "treks"}/${b.expedition.slug}`}
                    className="display text-xl text-ink hover:text-[#6b8e1f]"
                  >
                    {b.expedition.name}
                  </Link>
                  <p className="mt-1 text-sm text-ink-soft">
                    {b.travellers} {b.travellers === 1 ? "traveller" : "travellers"} · departing {b.departureDate}
                  </p>
                </div>
                <StatusPill status={b.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "PENDING" | "CONFIRMED" | "CANCELLED" }) {
  const style =
    status === "CONFIRMED"
      ? "border-[#6b8e1f]/30 bg-coral/15 text-[#5a7a1a]"
      : status === "PENDING"
        ? "border-[#cf9b1d]/40 bg-[#f5c451]/15 text-[#a9781a]"
        : "border-line bg-cream-deep text-muted";
  return (
    <span className={`rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${style}`}>
      {status.toLowerCase()}
    </span>
  );
}
