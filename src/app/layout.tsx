import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boilingpoint.openclaw.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Boiling Point | OpenClaw Agent Launchpad",
  description: "Launch OpenClaw agents on Base for free and trade instantly on Solana, Ethereum, and BNB. Creator fees support Peter Steinberger.",
  keywords: ["OpenClaw", "AI agents", "token launchpad", "Base", "Solana", "Ethereum", "BNB", "crypto", "Token Layer"],
  authors: [{ name: "Token Layer" }],
  creator: "Token Layer",
  publisher: "Token Layer",
  icons: {
    icon: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Boiling Point",
    title: "The Boiling Point | OpenClaw Agent Launchpad",
    description: "Launch OpenClaw agents on Base for free and trade instantly on Solana, Ethereum, and BNB. The hottest spot for AI agent tokens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Boiling Point | OpenClaw Agent Launchpad",
    description: "Launch OpenClaw agents on Base for free and trade instantly on Solana, Ethereum, and BNB. The hottest spot for AI agent tokens.",
    creator: "@steipete",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
