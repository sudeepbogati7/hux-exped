"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon, ChevronDown, HeartIcon } from "@/components/ui/icons";
import { about, photos } from "@/lib/data";
import { useExpeditions } from "@/lib/useExpeditions";

const MONTHS = ["Flexible", "March", "April", "May", "September", "October", "November"];

export default function Contact() {
  const featuredTreks = useExpeditions().filter((e) => e.kind !== "peak");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    trek: "",
    month: "Flexible",
    group: "2",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const field = "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-36">
      <Image src={photos.demali} alt="" fill sizes="100vw" className="object-cover opacity-[0.14] grayscale" />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/85 to-ink" />
      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* left: pitch */}
        <Reveal variant="up">
          <p className="eyebrow mb-5 text-cream/50">{about.bespoke.eyebrow}</p>
          <h2 className="display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Book a trip, or just
            <br />
            <span className="text-[#1f6f96]">start a conversation</span>
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-cream/80">
            {about.bespoke.body}
          </p>

          <dl className="mt-10 space-y-5 border-t border-cream/15 pt-8 text-sm">
            <div>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/45">Email</dt>
              <dd className="mt-1 text-cream/90">hello@huxexped.com</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/45">Group size</dt>
              <dd className="mt-1 text-cream/90">Ten trekkers maximum, every departure</dd>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral">
                <HeartIcon className="h-4 w-4" />
              </span>
              <span className="text-cream/75">
                A portion of every booking funds village schools &amp; health posts in Nepal.
              </span>
            </div>
          </dl>
        </Reveal>

        {/* right: form */}
        <Reveal variant="up" delay={0.1}>
          <div className="rounded-3xl border border-cream/12 bg-white/[0.03] p-6 sm:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-coral text-ink">
                  <ArrowIcon className="h-7 w-7" />
                </span>
                <h3 className="display mt-6 text-3xl text-cream">Message sent.</h3>
                <p className="mt-3 max-w-xs text-cream/70">
                  Thanks — we&apos;ll get back to you personally, usually within
                  a day or two.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#1f6f96]"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Name</span>
                    <input required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Email</span>
                    <input required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@email.com" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Expedition</span>
                  <div className="relative">
                    <select value={form.trek} onChange={set("trek")} className={`${field} appearance-none pr-10`}>
                      <option value="">Not sure yet / bespoke</option>
                      {featuredTreks.map((t) => (
                        <option key={t.slug} value={t.slug}>{t.name}</option>
                      ))}
                      <option value="mountaineering">Mountaineering / a specific peak</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Preferred month</span>
                    <div className="relative">
                      <select value={form.month} onChange={set("month")} className={`${field} appearance-none pr-10`}>
                        {MONTHS.map((m) => <option key={m}>{m}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Group size</span>
                    <input type="number" min={1} max={10} value={form.group} onChange={set("group")} className={field} />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55">Message</span>
                  <textarea rows={4} value={form.message} onChange={set("message")} className={`${field} resize-none`} placeholder="Tell us what you're after — experience, dates, anything specific." />
                </label>

                <button
                  type="submit"
                  className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
                >
                  Send enquiry
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
