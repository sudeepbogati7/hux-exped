"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { authenticateAdmin, type AuthState } from "@/app/actions/auth";

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(authenticateAdmin, undefined);
  const [show, setShow] = useState(false);

  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:border-coral";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/55";

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 py-12 text-cream">
      {/* faint backdrop grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo invert className="text-2xl" />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-coral">
            <ShieldCheck className="size-3.5" /> Admin console
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:p-8">
          <h1 className="display text-2xl text-cream">Sign in to manage HUX EXPED</h1>
          <p className="mt-2 text-sm text-cream/55">Authorized administrators only.</p>

          {state?.message && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
              {state.message}
            </div>
          )}

          <form action={formAction} className="mt-6 space-y-4">
            <label className="block">
              <span className={label}>Email</span>
              <input name="email" type="email" required className={field} placeholder="admin@huxexped.com" autoComplete="email" />
              {state?.errors?.email && <p className="mt-1.5 text-[0.78rem] text-red-300">{state.errors.email[0]}</p>}
            </label>

            <label className="block">
              <span className={label}>Password</span>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  className={`${field} pr-11`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/45 transition-colors hover:text-cream"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={pending}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-coral px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Sign in"}
              {!pending && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/40 transition-colors hover:text-cream"
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
