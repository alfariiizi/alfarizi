import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading3({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight text-text sm:text-xl",
        className,
      )}
      {...props}
    >
      <span className="text-gray-400 dark:text-gray-700">##</span> {children}
    </h3>
  );
}
