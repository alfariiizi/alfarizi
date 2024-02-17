import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Maxwidthdiv({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
