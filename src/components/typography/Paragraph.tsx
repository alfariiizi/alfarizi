import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef } from "react";

const paragraphVariants = cva("text-text [&:not(:first-child)]:mt-4", {
  variants: {
    size: {
      small: "text-xs leading-5 sm:text-sm sm:leading-6",
      medium: "text-sm leading-6 sm:text-base sm:leading-7",
      large: "text-base leading-7 sm:text-lg sm:leading-8",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export function Paragraph({
  className,
  size,
  ...props
}: ComponentPropsWithoutRef<"p"> & VariantProps<typeof paragraphVariants>) {
  return (
    <p className={cn("", paragraphVariants({ size }), className)} {...props} />
  );
}
