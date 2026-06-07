"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";

type Mode = "login" | "register";

const copy = {
  login: {
    image: photos.nightSky,
    quote: "The map runs out. That's where we begin.",
    title: "Welcome back",
    sub: "Log in to manage your expeditions and bookings.",
    cta: "Log in",
    switchText: "New here?",
    switchLink: "/register",
    switchLabel: "Create an account",
  },
  register: {
    image: photos.himalayas,
    quote: "Ten people, a serious mountain, and a reason to go.",
    title: "Create your account",
    sub: "Start planning your next walk into the wild.",
    cta: "Create account",
    switchText: "Already have an account?",
    switchLink: "/login",
    switchLabel: "Log in",
  },
};

export default function AuthView({ mode }: { mode: Mode }) {
  const c = copy[mode];
  const [sent, setSent] = useState(false);
  const [show, setShow] = useState(false);

  const field =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* visual panel */}
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src={c.image} alt="" fill sizes="50vw" className="object-cover grayscale" priority />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="w-fit">
            <Logo invert className="h-10" />
          </Link>
          <div>
            <p className="display max-w-md text-3xl leading-tight text-cream xl:text-4xl">
              &ldquo;{c.quote}&rdquo;
            </p>
            <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
              HUX EXPED · Offbeat Himalaya
            </p>
          </div>
        </div>
      </aside>

      {/* form panel */}
      <section className="flex items-center justify-center bg-cream px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {/* mobile logo */}
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <Logo className="h-10" />
          </Link>

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-coral"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> Back home
          </Link>

          <h1 className="display text-4xl text-ink sm:text-5xl">{c.title}</h1>
          <p className="mt-3 text-ink-soft">{c.sub}</p>

          {sent ? (
            <div className="mt-10 rounded-2xl border border-line bg-cream-deep p-8 text-center">
              <span className="grid mx-auto h-14 w-14 place-items-center rounded-full bg-coral text-cream">
                <ArrowIcon className="h-6 w-6" />
              </span>
              <p className="display mt-5 text-2xl text-ink">
                {mode === "login" ? "You're in." : "Account created."}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                This is a frontend demo — no account is actually {mode === "login" ? "signed in" : "created"} yet.
              </p>
              <Link href="/" className="mt-6 inline-block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-coral">
                Continue to site
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-9 space-y-4"
            >
              {mode === "register" && (
                <label className="block">
                  <span className={label}>Full name</span>
                  <input required className={field} placeholder="Your name" autoComplete="name" />
                </label>
              )}

              <label className="block">
                <span className={label}>Email</span>
                <input required type="email" className={field} placeholder="you@email.com" autoComplete="email" />
              </label>

              <label className="block">
                <span className={label}>Password</span>
                <div className="relative">
                  <input
                    required
                    type={show ? "text" : "password"}
                    className={`${field} pr-16`}
                    placeholder="••••••••"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-muted hover:text-ink"
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {mode === "register" && (
                <label className="block">
                  <span className={label}>Confirm password</span>
                  <input required type={show ? "text" : "password"} className={field} placeholder="••••••••" minLength={6} />
                </label>
              )}

              <div className="flex items-center justify-between pt-1 text-sm">
                <label className="flex items-center gap-2 text-ink-soft">
                  <input type="checkbox" className="h-4 w-4 accent-coral" />
                  {mode === "login" ? "Remember me" : "I agree to the terms"}
                </label>
                {mode === "login" && (
                  <a href="#" className="text-[0.78rem] font-semibold text-coral hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral"
              >
                {c.cta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="rounded-xl border border-line py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream-deep">
                  Google
                </button>
                <button type="button" className="rounded-xl border border-line py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream-deep">
                  Apple
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-ink-soft">
            {c.switchText}{" "}
            <Link href={c.switchLink} className="font-semibold text-coral hover:underline">
              {c.switchLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
