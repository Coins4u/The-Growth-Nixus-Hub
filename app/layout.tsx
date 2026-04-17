import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thegrowthnexus.com"),
  title: {
    default: "The Growth Nexus | Advanced Systems for Global Scale",
    template: "%s | The Growth Nexus",
  },
  description:
    "The Growth Hub is a transparent executive community for infrastructure, AI automation, and high-ticket B2B growth systems.",
  openGraph: {
    title: "The Growth Nexus | Advanced Systems for Global Scale",
    description:
      "Architecting high-performance digital infrastructure, AI automation, and B2B growth engines for the next generation of digital products.",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Growth Nexus | Advanced Systems for Global Scale",
    description:
      "Architecting high-performance digital infrastructure, AI automation, and B2B growth engines for the next generation of digital products.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
