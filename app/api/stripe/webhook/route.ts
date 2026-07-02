import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

/**
 * Stripe webhook. On checkout.session.completed we confirm the matching
 * booking. The signature is verified against STRIPE_WEBHOOK_SECRET, so this
 * needs the raw request body (do not parse as JSON first).
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; metadata?: { bookingId?: string } };
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      await prisma.booking.updateMany({
        // guard on the session id too, so a spoofed metadata can't confirm an arbitrary booking
        where: { id: bookingId, stripeSessionId: session.id },
        data: { status: "CONFIRMED", paidAt: new Date() },
      });
    }
  }

  return NextResponse.json({ received: true });
}
