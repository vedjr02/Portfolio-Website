import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { themeBootScript } from "@/components/desktop/themeBoot";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Business analyst in Maynooth, Ireland who ships working software. Builder of Hold My Code, a macOS app for coding agents, plus sourced case studies and data products. Available Sep 2026.";

export const metadata: Metadata = {
  title: "Vedant Ambre · Business analyst who ships software",
  description,
  metadataBase: new URL("https://vedantambre.com"),
  openGraph: {
    title: "Vedant Ambre · Business analyst who ships software",
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Vedant Ambre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedant Ambre · Business analyst who ships software",
    description,
    images: ["/og.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#15141d",
};

const contract = `
THESIS: The portfolio is a Mac desktop, in light or dark appearance. Hold My Code, the menu bar app Vedant built, is open in the menu bar on arrival. Refuses the dark hero, giant name and card grid.
OWN-WORLD: dark Golden Gate wallpaper in both appearances, Kildare hills as the alternative; AppKit windows with traffic lights; solid vibrant dock and Control Center, no glass; system blue as the one accent; Finder tag dots for groups; Geist.
STORY: A hiring manager sees a BA who ships real software, opens the flagship, scans every project in a Finder list, Quick Looks any row, then writes an email in the Mail window.
FIRST VIEWPORT: Menu bar on top, thesis headline left on the sky, the Hold My Code panel dropped from its menu bar icon on the right, dock at the bottom. Primary action: See Hold My Code.
FORM: macOS desktop, my own top-ranked grounded candidate (user pick over roll 6), seed f0860680.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-dvh font-sans text-ink antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${contract}-->` }} />
        {children}
      </body>
    </html>
  );
}
