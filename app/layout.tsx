import type { Metadata } from "next";
import { Playfair_Display, Geist, IBM_Plex_Mono } from "next/font/google";
import "./_ds/styles.css";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-plex",
  display: "swap",
});

/**
 * Site-wide defaults only. The homepage sets its own B2B title and description
 * in app/page.tsx; the company and legal pages that declare no metadata of
 * their own fall back to this neutral pair, which is why it must stay a
 * description of the company rather than a pitch.
 */
export const metadata: Metadata = {
  title: "Simple Media Network",
  description:
    "Simple Media Network owns and operates consumer brands across money, retirement, family, legal, and business decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
