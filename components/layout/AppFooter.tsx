import Link from "next/link";

/** Minimal footer for in-app pages (account) — no marketing/site footer. */
export default function AppFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-5 py-6 text-[0.72rem] uppercase tracking-[0.14em] text-muted sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} HUX EXPED</span>
        <div className="flex items-center gap-5">
          <Link href="/" className="transition-colors hover:text-ink">Back to site</Link>
          <Link href="/#contact" className="transition-colors hover:text-ink">Support</Link>
        </div>
      </div>
    </footer>
  );
}
