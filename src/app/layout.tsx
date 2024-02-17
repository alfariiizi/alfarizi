import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { Navbar } from "./_components/Navbar";
import { layout } from "./_components/shared";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Alfarizi",
  description: "Alfarizi Personal Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(`font-sans ${inter.variable}`, "bg-background text-text")}
      >
        <div className="sticky inset-x-0 top-0">
          <Navbar />
        </div>
        <main
          className="relative px-4"
          style={{
            paddingTop: layout.paddingTop,
            paddingBottom: layout.paddingBottom,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
