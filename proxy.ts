import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

// Edge-safe Auth.js instance (base config only — no Prisma/bcrypt) for reading
// the session in the proxy. The full instance lives in auth.ts (Node runtime).
const { auth } = NextAuth(authConfig);

const PROTECTED = ["/account", "/book"];
const ADMIN = "/admin";
const AUTH_PAGES = ["/login", "/register"];

/**
 * Optimistic route gating (reads JWT only — no DB). The real authorization
 * checks still happen in each page / server action via lib/auth.ts.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  // The admin login page is the one /admin route that must stay open.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Admin area — must be an admin. Unauthenticated/non-admins go to /admin/login.
  if (pathname === ADMIN || pathname.startsWith(`${ADMIN}/`)) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Protected user areas (/account, /book) — must be logged in.
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    if (!isLoggedIn) {
      const url = new URL("/login", req.nextUrl);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Already logged in → keep them out of login/register.
  if (AUTH_PAGES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/account", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Run on page routes only — skip all API routes and static assets. API
  // handlers do their own auth (upload, stripe webhook needs the raw body).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|mp4|ico)$).*)"],
};
