import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

export function Pre({ className, children, ...props }: Props) {
  const lang = props["data-language"] ?? "shell";

  return (
    <div className="flex flex-col gap-0">
      <div className="w-full max-w-[80vw] rounded-t-md bg-secondary px-4 py-1 font-mono text-sm text-secondary-foreground dark:bg-secondary/40 sm:text-base">
        {lang.toLowerCase()}
      </div>
      <pre
        className={cn(
          "m-0 max-h-[60vh] w-full min-w-0 max-w-[80vw] overflow-auto text-nowrap rounded-none rounded-b-md text-sm sm:text-base",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
