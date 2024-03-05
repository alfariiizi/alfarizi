import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading4({
  className,
  ...props
}: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-sm font-semibold tracking-tight text-text sm:text-base",
        className,
      )}
      {...props}
    />
  );
}
