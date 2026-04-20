import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis/lenis-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | Ciel & Stone",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[var(--accent-strong)] selection:text-[var(--accent-contrast)]">
        <LenisProvider>
          <div className="min-h-dvh bg-background text-foreground">
            <Navbar />
            {children}
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
