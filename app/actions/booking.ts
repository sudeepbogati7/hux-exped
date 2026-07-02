"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { bookingSchema } from "@/lib/validation";

export type BookingState = { error?: string } | undefined;

/**
 * Create a booking for the signed-in user (status PENDING). Re-checks auth
 * server-side — never trust the proxy alone. Redirects to the payment step.
 */
export async function createBooking(_state: BookingState, formData: FormData): Promise<BookingState> {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/treks");
  }

  const parsed = bookingSchema.safeParse({
    slug: formData.get("slug"),
    travellers: formData.get("travellers"),
    departureDate: formData.get("departureDate"),
    note: formData.get("note") || undefined,
  });
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { error: first ?? "Please check your booking details." };
  }

  const { slug, travellers, departureDate, note } = parsed.data;

  const exp = await prisma.expedition.findFirst({
    where: { slug, published: true },
    select: { id: true, priceUSD: true },
  });
  if (!exp) return { error: "That expedition is no longer available." };

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      expeditionId: exp.id,
      travellers,
      departureDate,
      totalUSD: exp.priceUSD * travellers,
      status: "PENDING",
      note,
    },
    select: { id: true },
  });

  revalidatePath("/account/bookings");
  redirect(`/book/${slug}/pay?b=${booking.id}`);
}

/**
 * Start a Stripe Checkout Session for the user's booking. Sets the method +
 * session id, then redirects to Stripe. Returns an error string on failure.
 */
export async function startStripeCheckout(bookingId: string): Promise<{ error: string } | void> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };
  if (!stripeEnabled) return { error: "Card payments aren't configured yet. Please use bank transfer." };

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, status: true, totalUSD: true, expedition: { select: { name: true, slug: true, image: true } } },
  });
  if (!booking || booking.userId !== session.user.id) return { error: "Booking not found." };
  if (booking.status === "CONFIRMED") return { error: "This booking is already paid." };

  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const stripe = getStripe();
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: booking.totalUSD * 100,
          product_data: {
            name: `${booking.expedition.name} — HUX EXPED`,
            images: booking.expedition.image?.startsWith("http") ? [booking.expedition.image] : undefined,
          },
        },
      },
    ],
    metadata: { bookingId },
    customer_email: session.user.email ?? undefined,
    success_url: `${base}/book/${booking.expedition.slug}/success?b=${bookingId}`,
    cancel_url: `${base}/book/${booking.expedition.slug}/pay?b=${bookingId}&canceled=1`,
  });

  await prisma.booking.update({
    where: { id: bookingId },
    data: { paymentMethod: "STRIPE", stripeSessionId: checkout.id },
  });

  if (!checkout.url) return { error: "Could not start checkout. Please try again." };
  redirect(checkout.url);
}

/**
 * Submit a bank-transfer proof. Moves the booking to AWAITING_VERIFICATION for
 * an admin to review. Ownership re-verified.
 */
export async function submitBankTransfer(bookingId: string, proofUrl: string): Promise<{ error: string } | void> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };
  if (!proofUrl) return { error: "Please upload your payment proof first." };

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, status: true },
  });
  if (!booking || booking.userId !== session.user.id) return { error: "Booking not found." };
  if (booking.status === "CONFIRMED") return { error: "This booking is already paid." };

  await prisma.booking.update({
    where: { id: bookingId },
    data: { paymentMethod: "BANK_TRANSFER", paymentProof: proofUrl, status: "AWAITING_VERIFICATION" },
  });
  revalidatePath("/account/bookings");
}

/**
 * Mark a booking CONFIRMED (used by the Stripe webhook / admin verification).
 * Ownership is re-verified for the user-facing path.
 */
export async function confirmBooking(bookingId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) return false;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, status: true },
  });
  if (!booking || booking.userId !== session.user.id) return false;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED", paidAt: new Date() },
  });
  revalidatePath("/account/bookings");
  return true;
}

/** Cancel a booking the user owns. */
export async function cancelBooking(bookingId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) return;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, status: true },
  });
  if (!booking || booking.userId !== session.user.id) return;
  // Don't let users cancel an already-paid booking from the account page.
  if (booking.status === "CONFIRMED") return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/account/bookings");
}
