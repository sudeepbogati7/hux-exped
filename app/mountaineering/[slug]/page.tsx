import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExpeditionDetail from "@/components/sections/ExpeditionDetail";
import { getPeak, peakExpeditions } from "@/lib/data";

export function generateStaticParams() {
  return peakExpeditions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const peak = getPeak(slug);
  if (!peak) return { title: "Peak not found — HUX EXPED" };
  return { title: `${peak.name} (${peak.altitude}) — HUX EXPED`, description: peak.blurb };
}

export default async function PeakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = getPeak(slug);
  if (!peak) notFound();

  return (
    <>
      <Navbar subpage />
      <ExpeditionDetail data={peak} />
      <Footer />
    </>
  );
}
