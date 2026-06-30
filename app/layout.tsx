import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HUX EXPED — Offbeat Himalaya. Kanchenjunga, Dolpo & beyond.",
  description:
    "HUX EXPED leads small-group expeditions into Nepal's wildest, least-trodden mountains — Kanchenjunga, Dolpo and the 6,000–7,000 m peaks. A portion of every trek funds village schools and health posts in the valleys we walk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <AuthProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  );
}
