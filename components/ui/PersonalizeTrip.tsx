"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { featuredTreks, site } from "@/lib/data";

const ACCOMMODATION = ["Basic teahouse", "Comfort lodges", "Luxury", "Tents / camping", "I'll self-book"];

export default function PersonalizeTrip() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    persons: 2,
    date: "",
    destination: "",
    accommodation: "Comfort lodges",
  });

  const set = (k: keyof typeof form) => (v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hi HUX EXPED — I'd like to personalise a trip:",
      `• Name: ${form.name || "—"}`,
      `• Travellers: ${form.persons}`,
      `• Preferred date: ${form.date || "flexible"}`,
      `• Destination/trek: ${form.destination || "not sure yet"}`,
      `• Accommodation: ${form.accommodation}`,
      form.contact ? `• Contact: ${form.contact}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-line bg-cream-deep px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-coral";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-b-2 border-coral pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#6b8e1f] transition-colors hover:text-cream"
      >
        <span className="hidden sm:inline">Personalize your trip</span>
        <span className="sm:hidden">Plan a trip</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/75 backdrop-blur-sm" onClick={close} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream p-6 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-cream-deep"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            {sent ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-coral text-ink">
                  <CheckIcon className="h-7 w-7" />
                </span>
                <h2 className="display mt-5 text-3xl text-ink">We&apos;re on it.</h2>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-soft">
                  Your request is opening in WhatsApp — send it across and we&apos;ll
                  build a tailored plan and reply personally.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-7 rounded-full bg-ink px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral hover:text-ink"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow mb-2 text-[#6b8e1f]">Tailor-made</p>
                <h2 className="display text-3xl text-ink sm:text-4xl">Personalize your trip</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Tell us a little about your dream trip and we&apos;ll shape an
                  itinerary around you.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label}>Your name</label>
                      <input className={field} value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className={label}>Email or WhatsApp</label>
                      <input className={field} value={form.contact} onChange={(e) => set("contact")(e.target.value)} placeholder="you@email.com" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label}>Number of travellers</label>
                      <div className="flex items-center justify-between rounded-xl border border-line bg-cream-deep px-2 py-1.5">
                        <button type="button" onClick={() => set("persons")(Math.max(1, form.persons - 1))} className="grid h-9 w-9 place-items-center rounded-lg text-xl text-ink hover:bg-cream">−</button>
                        <span className="text-sm font-semibold text-ink">{form.persons} {form.persons === 1 ? "person" : "people"}</span>
                        <button type="button" onClick={() => set("persons")(Math.min(20, form.persons + 1))} className="grid h-9 w-9 place-items-center rounded-lg text-xl text-ink hover:bg-cream">+</button>
                      </div>
                    </div>
                    <div>
                      <label className={label}>Preferred date</label>
                      <input type="date" className={field} value={form.date} onChange={(e) => set("date")(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={label}>Where do you want to go?</label>
                    <select className={field} value={form.destination} onChange={(e) => set("destination")(e.target.value)}>
                      <option value="">Not sure yet — surprise me</option>
                      {featuredTreks.map((t) => (
                        <option key={t.slug} value={t.name}>{t.name}</option>
                      ))}
                      <option value="Somewhere else in Nepal">Somewhere else in Nepal</option>
                    </select>
                  </div>

                  <div>
                    <label className={label}>Accommodation preference</label>
                    <div className="flex flex-wrap gap-2">
                      {ACCOMMODATION.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => set("accommodation")(a)}
                          className={`rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors ${
                            form.accommodation === a
                              ? "border-coral bg-coral text-ink"
                              : "border-line bg-cream-deep text-ink-soft hover:border-coral"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-coral-dark"
                  >
                    Send my request
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
