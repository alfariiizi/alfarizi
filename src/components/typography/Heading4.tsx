import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading4({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "text-foreground 400 dark:text-purple-alternative-300 text-purple-alternative-700 scroll-m-20 text-sm font-semibold tracking-tight sm:text-base",
        className,
      )}
      {...props}
    >
      <span className="text-gray-400 dark:text-gray-700">###</span> {children}
    </h4>
  );
}
