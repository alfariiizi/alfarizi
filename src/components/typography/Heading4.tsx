import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading4({
  className,
  ...props
}: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}
