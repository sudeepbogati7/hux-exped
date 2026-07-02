import Link from "next/link";
import { CalendarCheck, DollarSign, Users, Mountain, MountainSnow, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StatusPill from "@/components/ui/StatusPill";

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  const [users, admins, treks, peaks, total, pending, confirmed, cancelled, recent] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.expedition.count({ where: { kind: "TREK" } }),
    prisma.expedition.count({ where: { kind: "PEAK" } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        status: true,
        travellers: true,
        departureDate: true,
        totalUSD: true,
        user: { select: { name: true, email: true } },
        expedition: { select: { name: true } },
      },
    }),
  ]);

  const revenue = await prisma.booking.aggregate({
    where: { status: "CONFIRMED" },
    _sum: { totalUSD: true },
  });

  // headline metrics (accented)
  const headline = [
    { label: "Total bookings", value: total.toLocaleString("en-US"), href: "/admin/bookings", Icon: CalendarCheck },
    { label: "Confirmed revenue", value: `$${(revenue._sum.totalUSD ?? 0).toLocaleString("en-US")}`, href: "/admin/bookings?status=CONFIRMED", Icon: DollarSign },
    { label: "Registered users", value: `${users}`, sub: `${admins} admin${admins === 1 ? "" : "s"}`, href: "/admin/users", Icon: Users },
  ];
  // booking status breakdown
  const statusCards = [
    { label: "Pending", value: pending, href: "/admin/bookings?status=PENDING", Icon: Clock, tint: "text-[#a9781a]" },
    { label: "Confirmed", value: confirmed, href: "/admin/bookings?status=CONFIRMED", Icon: CheckCircle2, tint: "text-[#5a7a1a]" },
    { label: "Cancelled", value: cancelled, href: "/admin/bookings?status=CANCELLED", Icon: XCircle, tint: "text-muted" },
  ];
  // content counts
  const contentCards = [
    { label: "Treks", value: treks, href: "/admin/expeditions", Icon: Mountain },
    { label: "Peaks", value: peaks, href: "/admin/expeditions", Icon: MountainSnow },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl text-ink sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-ink-soft">Welcome back, {admin.name?.split(" ")[0] ?? "Admin"}. Here&apos;s the overview.</p>
        </div>
        <Link
          href="/admin/expeditions/new"
          className="rounded-full bg-coral px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-coral-dark"
        >
          + New expedition
        </Link>
      </div>

      {/* headline metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {headline.map((c) => (
          <Link key={c.label} href={c.href} className="group relative overflow-hidden rounded-2xl border border-line bg-ink p-6 text-cream transition-transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <c.Icon className="size-6 text-coral" />
              <ArrowUpRight className="size-4 text-cream/30 transition-colors group-hover:text-coral" />
            </div>
            <div className="display mt-6 text-3xl text-cream sm:text-4xl">{c.value}</div>
            <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              {c.label}{c.sub && <span className="ml-1.5 normal-case text-coral">· {c.sub}</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* status + content */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statusCards.map((c) => (
          <Link key={c.label} href={c.href} className="flex items-center gap-3 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-coral">
            <c.Icon className={`size-5 shrink-0 ${c.tint}`} />
            <span className="min-w-0">
              <span className="display block text-2xl text-ink">{c.value}</span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">{c.label}</span>
            </span>
          </Link>
        ))}
        {contentCards.map((c) => (
          <Link key={c.label} href={c.href} className="flex items-center gap-3 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-coral">
            <c.Icon className="size-5 shrink-0 text-ink-soft" />
            <span className="min-w-0">
              <span className="display block text-2xl text-ink">{c.value}</span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">{c.label}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="display text-2xl text-ink">Recent bookings</h2>
          <Link href="/admin/bookings" className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#1f6f96] hover:underline">View all</Link>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-cream">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-cream-deep text-left text-[0.68rem] uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Trip</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Departure</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">No bookings yet.</td></tr>
              ) : (
                recent.map((b) => (
                  <tr key={b.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-semibold text-ink">{b.expedition.name}</td>
                    <td className="px-4 py-3 text-ink-soft">{b.user.name ?? b.user.email}</td>
                    <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">{b.departureDate}</td>
                    <td className="px-4 py-3 text-ink-soft">USD {b.totalUSD.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3"><StatusPill status={b.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

