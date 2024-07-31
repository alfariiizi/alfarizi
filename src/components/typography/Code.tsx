import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"code"> & {
  "data-language"?: string;
};

export function Code({ className, ...props }: Props) {
  const lang = props["data-language"];

  if (lang) {
    return <code className={className} {...props} />;
  }

  return (
    <code
      className={cn("text-rose-500 dark:text-rose-400", className)}
      {...props}
    />
  );
}
