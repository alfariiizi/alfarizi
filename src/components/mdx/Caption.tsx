import { cn } from "@/lib/utils";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export default function Caption({ className, children, ...props }: Props) {
  return (
    <p
      className={cn(
        "my-0 text-center text-sm text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
