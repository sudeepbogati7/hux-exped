import Link from "next/link";
import Logo from "@/components/ui/Logo";
import AdminNav from "@/components/admin/AdminNav";
import AdminUserBadge from "@/components/admin/AdminUserBadge";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin — HUX EXPED" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-cream-deep lg:grid lg:grid-cols-[260px_1fr]">
      {/* sidebar */}
      <aside className="flex flex-col border-r border-line bg-ink text-cream lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link href="/" className="inline-flex"><Logo invert className="text-xl" /></Link>
          <span className="rounded-full bg-coral px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-ink">Admin</span>
        </div>
        <AdminNav />
        <div className="mt-auto border-t border-white/10 p-4">
          <AdminUserBadge name={user.name ?? "Admin"} email={user.email ?? ""} />
        </div>
      </aside>

      {/* content */}
      <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-10">{children}</main>
    </div>
  );
}
