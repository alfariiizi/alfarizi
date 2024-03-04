import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function ListItem({
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn("text-sm leading-6 sm:text-base sm:leading-7", className)}
      {...props}
    />
  );
}
