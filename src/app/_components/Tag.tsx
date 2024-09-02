import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";

type Props = Omit<LinkProps, "href"> & {
  tag: string;
  className?: string;
};

export default function Tag({ tag, className, ...props }: Props) {
  return (
    <Link
      href={`/tag/${tag}`}
      className={cn(
        "rounded-md bg-secondary/80 px-2 py-1 text-sm text-secondary-foreground duration-150 hover:opacity-80 sm:text-base",
        className,
      )}
      {...props}
    >
      #{tag}
    </Link>
  );
}
