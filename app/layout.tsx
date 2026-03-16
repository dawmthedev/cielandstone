import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis/lenis-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ciel & Stone",
  description:
    "Ciel & Stone is a design-build studio creating refined, buildable environments from concept to construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
      >
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
