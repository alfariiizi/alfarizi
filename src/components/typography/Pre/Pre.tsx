import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = {
  "data-language"?: string;
};

export const Pre = forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement> & Props
>(({ className, children, ...props }, ref) => {
  const lang = props["data-language"] ?? "plaintext";

  return (
    <pre
      ref={ref}
      className={cn(
        "relative m-0 max-h-[60vh] w-full min-w-0 max-w-[80vw] overflow-auto text-nowrap rounded-none rounded-b-md px-0 pb-4 pt-10 text-sm sm:text-base md:max-h-[80vh] [&_span]:text-xs md:[&_span]:text-sm",
        "scrollbar-thin",
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute left-2 top-2 w-10 text-xs text-secondary sm:text-sm">
        {lang.toLowerCase()}
      </div>
    </pre>
  );
});
Pre.displayName = "Pre";
