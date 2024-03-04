import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading3({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}
