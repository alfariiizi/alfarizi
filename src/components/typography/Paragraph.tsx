import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Paragraph({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-sm leading-6 sm:text-base sm:leading-7 [&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  );
}
