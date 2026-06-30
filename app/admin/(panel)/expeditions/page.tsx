import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteExpeditionButton from "@/components/admin/DeleteExpeditionButton";

export default async function AdminExpeditions() {
  await requireAdmin();
  const rows = await prisma.expedition.findMany({
    orderBy: [{ kind: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      kind: true,
      band: true,
      priceUSD: true,
      flagship: true,
      published: true,
      _count: { select: { bookings: true } },
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="display text-3xl text-ink sm:text-4xl">Treks &amp; peaks</h1>
          <p className="mt-2 text-ink-soft">{rows.length} expeditions. Edits go live immediately.</p>
        </div>
        <Link href="/admin/expeditions/new" className="rounded-full bg-coral px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark">
          + New expedition
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-cream">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-line bg-cream-deep text-left text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Bookings</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <span className="font-semibold text-ink">{e.name}</span>
                  {e.flagship && <span className="ml-2 rounded-full bg-coral/20 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#5a7a1a]">Flagship</span>}
                  <span className="block text-[0.72rem] text-muted">/{e.slug}</span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{e.kind === "PEAK" ? `Peak · ${e.band ?? ""}` : "Trek"}</td>
                <td className="px-4 py-3 text-ink-soft">USD {e.priceUSD.toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-ink-soft">{e._count.bookings}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${e.published ? "border-[#6b8e1f]/30 bg-coral/15 text-[#5a7a1a]" : "border-line bg-cream-deep text-muted"}`}>
                    {e.published ? "Published" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/expeditions/${e.id}`} className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#6b8e1f] hover:underline">Edit</Link>
                    <DeleteExpeditionButton id={e.id} name={e.name} hasBookings={e._count.bookings > 0} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
