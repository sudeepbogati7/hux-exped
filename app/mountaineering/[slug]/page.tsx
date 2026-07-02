import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExpeditionDetail from "@/components/sections/ExpeditionDetail";
import { getPeakBySlug, getPeaks, getAllExpeditions } from "@/lib/expeditions";

export async function generateStaticParams() {
  const peaks = await getPeaks();
  return peaks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const peak = await getPeakBySlug(slug);
  if (!peak) return { title: "Peak not found — HUX EXPED" };
  return { title: `${peak.name} (${peak.altitude}) — HUX EXPED`, description: peak.blurb };
}

export default async function PeakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = await getPeakBySlug(slug);
  if (!peak) notFound();
  const similar = await getAllExpeditions();

  return (
    <>
      <Navbar subpage />
      <ExpeditionDetail data={peak} similar={similar} notIncluded={peak.notIncluded} availableDates={peak.availableDates} />
      <Footer />
    </>
  );
}
