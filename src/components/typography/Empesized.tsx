import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Empesized({
  className,
  ...props
}: ComponentPropsWithoutRef<"em">) {
  return (
    <em
      className={cn(
        "dark:text-blue-alternative-300 text-blue-alternative-700",
        className,
      )}
      {...props}
    />
  );
}
