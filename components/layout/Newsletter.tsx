"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-cream-deep">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4 text-[#1f6f96]">The dispatch</p>
          <h2 className="display text-3xl text-ink sm:text-4xl lg:text-5xl">
            Trail notes, new departures &amp; the odd photo
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            A few emails a year — offbeat routes, open spots and stories from the
            field. No spam, unsubscribe anytime.
          </p>
        </div>

        {sent ? (
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-cream p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-ink">
              <CheckIcon className="h-5 w-5" />
            </span>
            <p className="text-ink">
              <span className="font-semibold">You&apos;re on the list.</span> Watch your inbox for the next dispatch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-full border border-line bg-cream px-6 py-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral hover:text-ink"
            >
              Subscribe
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
