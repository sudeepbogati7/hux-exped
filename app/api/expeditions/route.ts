import { NextResponse } from "next/server";
import { getAllExpeditions } from "@/lib/expeditions";

/**
 * Public list of expeditions for client components (search, selects).
 * Returns the lightweight fields those UIs need.
 */
export async function GET() {
  const all = await getAllExpeditions();
  const data = all.map((e) => ({
    slug: e.slug,
    name: e.name,
    region: e.region,
    kind: e.kind ?? "trek",
    image: e.image,
    days: e.days,
    altitude: e.altitude,
    price: e.price,
  }));
  return NextResponse.json(data);
}
