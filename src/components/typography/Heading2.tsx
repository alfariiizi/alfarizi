import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading2({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 font-display text-xl font-semibold tracking-tight text-foreground text-purple-alternative-700 first:mt-0 dark:text-purple-alternative-300 sm:mt-14 sm:text-2xl",
        className,
      )}
      {...props}
    >
      <span className="text-gray-400 dark:text-gray-700">#</span> {children}
    </h2>
  );
}
