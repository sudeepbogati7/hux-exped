import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExpeditionDetail from "@/components/sections/ExpeditionDetail";
import { getTrekBySlug, getAllTreks, getAllExpeditions } from "@/lib/expeditions";

export async function generateStaticParams() {
  const treks = await getAllTreks();
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) return { title: "Trek not found — HUX EXPED" };
  return { title: `${trek.name} — HUX EXPED`, description: trek.blurb };
}

export default async function TrekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) notFound();
  const similar = await getAllExpeditions();

  return (
    <>
      <Navbar subpage />
      <ExpeditionDetail data={trek} similar={similar} />
      <Footer />
    </>
  );
}
