import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading2({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight sm:text-2xl",
        className,
      )}
      {...props}
    />
  );
}
