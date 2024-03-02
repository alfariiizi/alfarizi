import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";

import { type Metadata } from "next";
import { Inter, Laila } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Alfarizi's Personal Website",
    template: "%s | Alfarizi",
  },
  // description: "Explore Alfarizi's world of innovation through detailed blog posts and a portfolio of diverse projects spanning software development, design, and more. Dive into the journey of creativity and technology.",
  description:
    "Explore Alfarizi's world of innovation through detailed blog posts and a portfolio of diverse projects spanning software development. Dive into the journey of creativity and technology.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          `font-sans ${inter.variable} ${laila.variable}`,
          "bg-background text-text",
        )}
      >
        <Providers>
          <Navbar />
          <main
            className="relative px-4"
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
