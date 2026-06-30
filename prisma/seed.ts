/**
 * Seed the database from the static content in lib/data.ts.
 * Idempotent: upserts each expedition by slug and rebuilds its itinerary.
 * Also promotes ADMIN_EMAIL (if that user already exists) to ADMIN.
 */
import { PrismaClient, Kind } from "@prisma/client";
import bcrypt from "bcryptjs";
import { allExpeditions, type Trek } from "../lib/data";

const prisma = new PrismaClient();

function priceToInt(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

async function seedExpedition(t: Trek) {
  const kind: Kind = t.kind === "peak" ? "PEAK" : "TREK";
  const data = {
    slug: t.slug,
    kind,
    band: t.band ?? null,
    name: t.name,
    region: t.region,
    meta: t.meta,
    days: t.days,
    altitude: t.altitude,
    grade: t.grade,
    priceUSD: priceToInt(t.price),
    season: t.season,
    tagline: t.tagline,
    blurb: t.blurb,
    overview: t.overview,
    image: t.image,
    hero: t.hero,
    gallery: t.gallery,
    highlights: t.highlights,
    included: t.included,
    flagship: !!t.flagship,
    published: true,
  };

  const exp = await prisma.expedition.upsert({
    where: { slug: t.slug },
    create: data,
    update: data,
  });

  // Rebuild itinerary cleanly so re-seeding stays consistent.
  await prisma.itineraryDay.deleteMany({ where: { expeditionId: exp.id } });
  await prisma.itineraryDay.createMany({
    data: t.itinerary.map((d, i) => ({
      expeditionId: exp.id,
      order: i,
      day: d.day,
      title: d.title,
      detail: d.detail,
    })),
  });

  return exp.slug;
}

async function main() {
  console.log(`Seeding ${allExpeditions.length} expeditions…`);
  for (const t of allExpeditions) {
    const slug = await seedExpedition(t);
    console.log(`  ✓ ${slug}`);
  }

  // Seed a ready-to-use admin account. Credentials come from env, with
  // demo defaults so the admin console works out of the box.
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@huxexped.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    // Promote to ADMIN; only (re)set the password if the account has none yet
    // (don't clobber a real password the admin may have already set).
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "ADMIN", ...(existing.passwordHash ? {} : { passwordHash }) },
    });
    console.log(`Ensured ADMIN role for existing account ${adminEmail}.`);
  } else {
    await prisma.user.create({
      data: { name: "HUX EXPED Admin", email: adminEmail, passwordHash, role: "ADMIN" },
    });
    console.log(`Created admin account.`);
  }
  console.log(`\n  Admin login → /admin/login`);
  console.log(`  Email:    ${adminEmail}`);
  console.log(`  Password: ${process.env.ADMIN_PASSWORD ? "(from ADMIN_PASSWORD env)" : adminPassword}\n`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
