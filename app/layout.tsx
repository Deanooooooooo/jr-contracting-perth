import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://deanooooooooo.github.io/jr-contracting-perth";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JR Contracting | Perth Pool Pressure Testing & Cleans",
  description:
    "Perth pool professional for pre-concrete pressure testing, post-concrete pool cleaning, water testing, leak detection and green pool recovery.",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: "website",
    title: "JR Contracting | Perth Pool Pressure Testing & Cleans",
    description:
      "Pool pressure testing, post-concrete cleaning, water testing, leak checks and green pool recovery for Perth pool owners and builders.",
    url: `${siteUrl}/`,
    images: [`${siteUrl}/assets/hero-pool-service.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "JR Contracting | Perth Pool Pressure Testing & Cleans",
    description:
      "Perth pool pressure testing, post-concrete cleaning, water testing, leak checks and green pool recovery.",
    images: [`${siteUrl}/assets/hero-pool-service.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
