import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";

import { env } from "@/env";
import { type Metadata } from "next";
import { Inter, Josefin_Sans, Laila, Playfair_Display } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { Providers } from "./_components/Providers";
import { layout } from "./_components/shared";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const laila = Laila({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Alfarizi's Personal Website",
    template: "%s | Alfarizi",
  },
  // description: "Explore Alfarizi's world of innovation through detailed blog posts and a portfolio of diverse projects spanning software development, design, and more. Dive into the journey of creativity and technology.",
  description:
    "Explore Alfarizi's world of innovation through detailed blog posts and a portfolio of diverse projects spanning software development. Dive into the journey of creativity and technology.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  verification: {
    google: env.GOOGLE_VERIFICATION_ID,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `font-sans ${inter.variable}`,
          josefinSans.variable,
          // GeistSans.variable,
          "text-foreground bg-background",
        )}
      >
        <Providers>
          <Navbar />
          <main
            className="relative"
            style={{
              paddingTop: layout.paddingTop,
              paddingBottom: layout.paddingBottom,
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
