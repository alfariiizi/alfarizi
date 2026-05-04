import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { env } from "@/env";
import { type Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { Providers } from "./_components/Providers";
import { layout } from "./_components/shared";
import Footer from "./_components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Alfarizi",
    template: "%s | Alfarizi",
  },
  description:
    "Moh Rizal Alfarizi builds thoughtful software for real-world use across product, frontend, backend, and delivery, with a focus on practical engineering work.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
        {env.NODE_ENV !== "development" && env.UMAMI_DATA_WEBSITE_ID && (
          <script
            defer
            src="https://analytics.eu.umami.is/script.js"
            data-website-id={env.UMAMI_DATA_WEBSITE_ID}
          />
        )}
      </head>
      <body
        className={cn(
          `font-sans ${inter.variable}`,
          josefinSans.variable,
          "bg-background text-foreground",
        )}
      >
        <Providers>
          <div className="flex min-h-lvh flex-col">
            <Navbar />
            <main
              className="relative flex-grow"
              style={{
                paddingTop: layout.paddingTop,
                paddingBottom: layout.paddingBottom,
              }}
            >
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
