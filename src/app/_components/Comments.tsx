"use client";

import { cn } from "@/lib/utils";
import GiscusComment from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Maxwidthdiv } from "./Maxwindthdiv";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Comments({ className, ...props }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Maxwidthdiv smallPadding className={cn("max-w-5xl", className)} {...props}>
      <GiscusComment
        repo="alfariiizi/alfarizi"
        repoId="R_kgDOLURnKQ"
        category="Q&A"
        categoryId="DIC_kwDOLURnKc4Cd7-1"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </Maxwidthdiv>
  );
}
