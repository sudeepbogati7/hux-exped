import { prisma } from "@/lib/prisma";
import type { Trek, ItineraryDay } from "@/lib/data";

/**
 * DB-backed expedition queries. These return objects shape-compatible with the
 * old static `Trek` type (price re-derived as a "from $X" string, kind/band
 * lower-cased) so existing components keep working unchanged.
 */

type DbExpedition = {
  id: string;
  slug: string;
  kind: "TREK" | "PEAK";
  band: string | null;
  name: string;
  region: string;
  meta: string;
  days: string;
  altitude: string;
  grade: string;
  priceUSD: number;
  season: string;
  tagline: string;
  blurb: string;
  overview: string[];
  image: string;
  hero: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  flagship: boolean;
  itinerary?: { order: number; day: string; title: string; detail: string }[];
};

/** A Trek (the UI shape) plus the DB id, so consumers can link records. */
export type ExpeditionRecord = Trek & { id: string; priceUSD: number };

function toTrek(e: DbExpedition): ExpeditionRecord {
  const itinerary: ItineraryDay[] = (e.itinerary ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((d) => ({ day: d.day, title: d.title, detail: d.detail }));

  return {
    id: e.id,
    slug: e.slug,
    kind: e.kind === "PEAK" ? "peak" : "trek",
    band: e.band ?? undefined,
    name: e.name,
    region: e.region,
    meta: e.meta,
    days: e.days,
    altitude: e.altitude,
    grade: e.grade,
    priceUSD: e.priceUSD,
    price: `from $${e.priceUSD.toLocaleString("en-US")}`,
    season: e.season,
    tagline: e.tagline,
    blurb: e.blurb,
    overview: e.overview,
    image: e.image,
    hero: e.hero,
    gallery: e.gallery,
    highlights: e.highlights,
    included: e.included,
    itinerary,
    flagship: e.flagship,
  };
}

const baseSelect = {
  id: true,
  slug: true,
  kind: true,
  band: true,
  name: true,
  region: true,
  meta: true,
  days: true,
  altitude: true,
  grade: true,
  priceUSD: true,
  season: true,
  tagline: true,
  blurb: true,
  overview: true,
  image: true,
  hero: true,
  gallery: true,
  highlights: true,
  included: true,
  flagship: true,
} as const;

/** All published treks (kind = TREK), original insertion order. */
export async function getAllTreks(): Promise<ExpeditionRecord[]> {
  const rows = await prisma.expedition.findMany({
    where: { kind: "TREK", published: true },
    orderBy: { createdAt: "asc" },
    select: baseSelect,
  });
  return rows.map(toTrek);
}

/** Flagship treks for the home spotlight. */
export async function getFlagshipTreks(): Promise<ExpeditionRecord[]> {
  const rows = await prisma.expedition.findMany({
    where: { kind: "TREK", published: true, flagship: true },
    orderBy: { createdAt: "asc" },
    select: baseSelect,
  });
  return rows.map(toTrek);
}

/** Published peaks, optionally filtered by band ("6000m" | "7000m"). */
export async function getPeaks(band?: "6000m" | "7000m"): Promise<ExpeditionRecord[]> {
  const rows = await prisma.expedition.findMany({
    where: { kind: "PEAK", published: true, ...(band ? { band } : {}) },
    orderBy: { createdAt: "asc" },
    select: baseSelect,
  });
  return rows.map(toTrek);
}

/** Every published expedition (treks + peaks). */
export async function getAllExpeditions(): Promise<ExpeditionRecord[]> {
  const rows = await prisma.expedition.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
    select: baseSelect,
  });
  return rows.map(toTrek);
}

/** A single expedition by slug, with its itinerary. Null if not found/unpublished. */
export async function getExpeditionBySlug(slug: string): Promise<ExpeditionRecord | null> {
  const row = await prisma.expedition.findFirst({
    where: { slug, published: true },
    select: { ...baseSelect, itinerary: { select: { order: true, day: true, title: true, detail: true } } },
  });
  return row ? toTrek(row) : null;
}

/** A trek by slug (kind = TREK). */
export async function getTrekBySlug(slug: string): Promise<ExpeditionRecord | null> {
  const e = await getExpeditionBySlug(slug);
  return e && e.kind !== "peak" ? e : null;
}

/** A peak by slug (kind = PEAK). */
export async function getPeakBySlug(slug: string): Promise<ExpeditionRecord | null> {
  const e = await getExpeditionBySlug(slug);
  return e && e.kind === "peak" ? e : null;
}

/** Slugs for generateStaticParams / sitemaps. */
export async function getAllExpeditionSlugs(): Promise<string[]> {
  const rows = await prisma.expedition.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => r.slug);
}
