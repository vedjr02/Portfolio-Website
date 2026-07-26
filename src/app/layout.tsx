import type { Metadata } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant Ambre — Business Analyst & Data Analyst",
  description:
    "Business Analyst & Data Analyst portfolio — interactive Starbucks and NVIDIA case studies, SEI consulting (AdFlex), and product analytics builds. Master's in Business Analytics, Maynooth University.",
  metadataBase: new URL("https://vedantambre.com"),
  openGraph: {
    title: "Vedant Ambre — Business Analyst & Data Analyst",
    description:
      "Featured case studies, live demos, and consulting work for hiring managers evaluating BA / DA talent.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-ink font-sans selection:bg-accent/15 selection:text-accent">
        {children}
      </body>
    </html>
  );
}
