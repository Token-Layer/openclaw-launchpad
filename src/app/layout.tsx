import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Boiling Point | OpenClaw Agent Launchpad",
  description: "Launch OpenClaw agents on Base for free and trade instantly on Solana, Ethereum, and BNB. Creator fees support Peter Steinberger.",
  icons: {
    icon: "/images/logo.jpeg",
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
