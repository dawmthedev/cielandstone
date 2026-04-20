import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis/lenis-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: {
    default: "Ciel & Stone",
    template: "%s | Ciel & Stone",
  },
  description:
    "Ciel & Stone helps homeowners shape renovations, additions, and new homes through thoughtful design, pre-construction clarity, and coordinated execution.",
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
