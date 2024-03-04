import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function UnorderedList({
  className,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn("my-6 ml-1 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}
