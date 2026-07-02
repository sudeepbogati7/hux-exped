import Stripe from "stripe";

/** True when Stripe keys are configured. */
export const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;

let _stripe: Stripe | null = null;

/** Lazy Stripe server client. Throws only if used without a key configured. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}
