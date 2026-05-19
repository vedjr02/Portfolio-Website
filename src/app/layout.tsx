import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-neutral-100 font-sans selection:bg-amber-200/30 selection:text-amber-100">
        {children}
      </body>
    </html>
  );
}
