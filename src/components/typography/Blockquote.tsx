import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-text", className)}
      {...props}
    />
  );
}
