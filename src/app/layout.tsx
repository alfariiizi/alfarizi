import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";

import { Inter, Laila } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { Providers } from "./_components/Providers";
import { layout } from "./_components/shared";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const displayFont = Laila({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata = {
  title: "Alfarizi",
  description: "Alfarizi's Personal Website",
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
          `font-sans ${inter.variable} ${displayFont.variable}`,
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
