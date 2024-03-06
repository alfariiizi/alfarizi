import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Strong({
  className,
  ...props
}: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn(
        "dark:text-blue-alternative-400 text-blue-alternative-600 font-semibold",
        className,
      )}
      {...props}
    />
  );
}
