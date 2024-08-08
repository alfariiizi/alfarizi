import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

export function Pre({ children, className, ...props }: Props) {
  const lang = props["data-language"] ?? "plaintext";

  return (
    <pre
      className={cn(
        "relative m-0 max-h-[60vh] w-full min-w-0 max-w-[100vw] overflow-auto text-nowrap rounded-none rounded-b-md px-0 pb-4 pt-10 text-sm sm:text-base md:max-h-[80vh] [&_span]:text-xs md:[&_span]:text-sm",
        "scrollbar-thin",
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute left-2 top-2 w-10 text-xs text-zinc-500 sm:text-sm">
        {lang.toLowerCase()}
      </div>
    </pre>
  );
}
