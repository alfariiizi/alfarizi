"use client";

import { ThemeProvider } from "next-themes";
import { useState, type ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./LoadingScreen";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrandName>
        {children}
        <Toaster
          toastOptions={{
            className: "bg-secondary text-secondary-foreground",
          }}
        />
      </BrandName>
    </ThemeProvider>
  );
}

function BrandName({ children }: { children: ReactNode }) {
  const [isMount, setMount] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(0);
    }

    // exit early when we reach 0
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!countdown) return () => {};

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [countdown]);

  useEffect(() => {
    if (!isMount) {
      setMount(true);
    }
  }, [isMount, setMount]);

  if (!isMount || countdown > 0) {
    return <LoadingScreen className="top-0" />;
  }

  return children;
}
