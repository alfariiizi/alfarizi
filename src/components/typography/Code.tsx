import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Code({
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "dark:text-red-alternative-400 text-red-alternative-600",
        className,
      )}
      {...props}
    />
  );
}
