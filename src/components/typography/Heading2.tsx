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
        "text-foreground dark:text-purple-alternative-300 text-purple-alternative-700 scroll-m-20 font-display text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl",
        className,
      )}
      {...props}
    >
      <span className="text-gray-400 dark:text-gray-700">#</span> {children}
    </h2>
  );
}
