import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config. Contains NO database/bcrypt access so it can run in
 * the proxy (edge) runtime. The Credentials provider + Prisma adapter are added
 * in auth.ts, which runs in the Node runtime. Callbacks here shape the JWT and
 * session (incl. role) and gate route access optimistically.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  // Providers array is augmented in auth.ts. Google is edge-safe and lives here
  // so the proxy knows about it; Credentials is appended in auth.ts.
  providers: [],
  callbacks: {
    // Persist id + role onto the token at sign-in.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // `role` is present on our User model; cast since the default type omits it.
        token.role = (user as { role?: "USER" | "ADMIN" }).role ?? "USER";
      }
      return token;
    },
    // Expose id + role on the session for client/server consumers.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "USER" | "ADMIN") ?? "USER";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
