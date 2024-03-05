import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Heading1({
  className,
  ...props
}: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-primary lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}
