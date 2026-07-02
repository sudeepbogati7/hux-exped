import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateExpedition } from "@/app/actions/admin";
import ExpeditionForm from "@/components/admin/ExpeditionForm";

export default async function EditExpeditionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const e = await prisma.expedition.findUnique({
    where: { id },
    include: { itinerary: { orderBy: { order: "asc" } } },
  });
  if (!e) notFound();

  const action = updateExpedition.bind(null, e.id);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/expeditions" className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">← All expeditions</Link>
      <h1 className="display mt-3 text-3xl text-ink sm:text-4xl">Edit · {e.name}</h1>
      <p className="mt-2 text-ink-soft">Changes publish immediately to the live site.</p>
      <div className="mt-8">
        <ExpeditionForm
          action={action}
          submitLabel="Save changes"
          initial={{
            slug: e.slug,
            name: e.name,
            kind: e.kind,
            band: e.band ?? "",
            region: e.region,
            meta: e.meta,
            days: e.days,
            altitude: e.altitude,
            grade: e.grade,
            priceUSD: e.priceUSD,
            season: e.season,
            tagline: e.tagline,
            blurb: e.blurb,
            overview: e.overview,
            image: e.image,
            hero: e.hero,
            gallery: e.gallery,
            highlights: e.highlights,
            included: e.included,
            notIncluded: e.notIncluded,
            availableDates: e.availableDates,
            flagship: e.flagship,
            published: e.published,
            itinerary: e.itinerary.map((d) => ({ day: d.day, title: d.title, detail: d.detail })),
          }}
        />
      </div>
    </div>
  );
}
