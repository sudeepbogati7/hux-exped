"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Logo from "@/components/ui/Logo";
import { ArrowIcon, GoogleIcon } from "@/components/ui/icons";
import { register, authenticate, type AuthState } from "@/app/actions/auth";
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

export default function AuthView({ mode, callbackUrl }: { mode: Mode; callbackUrl?: string }) {
  const c = copy[mode];
  const [show, setShow] = useState(false);

  const action = mode === "login" ? authenticate : register;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, undefined);

  const field =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";
  const errText = "mt-1.5 text-[0.78rem] font-medium text-red-600";

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* visual panel */}
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src={c.image} alt="" fill sizes="50vw" className="object-cover grayscale" priority />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="w-fit">
            <Logo invert className="text-2xl" />
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
            <Logo className="text-2xl" />
          </Link>

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-[#6b8e1f]"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> Back home
          </Link>

          <h1 className="display text-4xl text-ink sm:text-5xl">{c.title}</h1>
          <p className="mt-3 text-ink-soft">{c.sub}</p>

          {/* form-level error */}
          {state?.message && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {state.message}
            </div>
          )}

          <form action={formAction} className="mt-9 space-y-4">
            {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}

            {mode === "register" && (
              <label className="block">
                <span className={label}>Full name</span>
                <input name="name" required className={field} placeholder="Your name" autoComplete="name" />
                {state?.errors?.name && <p className={errText}>{state.errors.name[0]}</p>}
              </label>
            )}

            <label className="block">
              <span className={label}>Email</span>
              <input name="email" required type="email" className={field} placeholder="you@email.com" autoComplete="email" />
              {state?.errors?.email && <p className={errText}>{state.errors.email[0]}</p>}
            </label>

            <label className="block">
              <span className={label}>Password</span>
              <div className="relative">
                <input
                  name="password"
                  required
                  type={show ? "text" : "password"}
                  className={`${field} pr-16`}
                  placeholder="••••••••"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  minLength={mode === "register" ? 8 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-muted hover:text-ink"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              {state?.errors?.password && (
                <ul className="mt-1.5 space-y-0.5">
                  {state.errors.password.map((e) => (
                    <li key={e} className="text-[0.78rem] font-medium text-red-600">{e}</li>
                  ))}
                </ul>
              )}
            </label>

            {mode === "login" && (
              <div className="flex items-center justify-between pt-1 text-sm">
                <label className="flex items-center gap-2 text-ink-soft">
                  <input type="checkbox" className="h-4 w-4 accent-coral" /> Remember me
                </label>
                <a href="#" className="text-[0.78rem] font-semibold text-[#6b8e1f] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Please wait…" : c.cta}
              {!pending && <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </button>

            <div className="flex items-center gap-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: callbackUrl || "/account" })}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-cream py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream-deep"
            >
              <GoogleIcon className="h-5 w-5" /> Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-soft">
            {c.switchText}{" "}
            <Link
              href={callbackUrl ? `${c.switchLink}?callbackUrl=${encodeURIComponent(callbackUrl)}` : c.switchLink}
              className="font-semibold text-[#6b8e1f] hover:underline"
            >
              {c.switchLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
