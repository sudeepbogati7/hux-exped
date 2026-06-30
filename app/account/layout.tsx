import Navbar from "@/components/layout/Navbar";
import AppFooter from "@/components/layout/AppFooter";
import AccountNav from "@/components/account/AccountNav";
import { requireUser } from "@/lib/auth";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/account");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar subpage />
      <main className="paper flex-1 pt-20">
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <p className="eyebrow text-[#6b8e1f]">Your account</p>
            <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">
              {user.name ? `Hi, ${user.name.split(" ")[0]}` : "Welcome"}
            </h1>

            <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
              <AccountNav isAdmin={user.role === "ADMIN"} />
              <div className="min-w-0">{children}</div>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
