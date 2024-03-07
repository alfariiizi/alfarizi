import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Anchor({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      target="_blank"
      className={cn(
        "dark:decoration-yellow-alternative-800 decoration-yellow-alternative-600 text-foreground hover:text-foreground/80 underline decoration-[3px] underline-offset-[2px] duration-200 ease-in-out hover:underline-offset-[5px]",
        className,
      )}
      {...props}
    />
  );
}
