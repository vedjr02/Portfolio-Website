import type { Metadata } from "next";
import { Oswald, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display font — bold impact for headlines
const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Body font — geometric grotesque for paragraphs / UI
const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant Ambre — Business Analyst & Data Analyst",
  description:
    "Detail-oriented Business Analyst translating complex datasets into actionable business insights. Master's in Business Analytics, Maynooth University.",
  metadataBase: new URL("https://vedantambre.com"),
  openGraph: {
    title: "Vedant Ambre — Business Analyst & Data Analyst",
    description:
      "Detail-oriented Business Analyst translating complex datasets into actionable business insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-neutral-100 font-sans selection:bg-sky-300/30 selection:text-sky-100">
        {children}
      </body>
    </html>
  );
}
