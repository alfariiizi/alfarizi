/* eslint-disable @typescript-eslint/no-base-to-string */

import { cn } from "@/lib/utils";
import NextImage, { type ImageProps } from "next/image";

type Props = ImageProps & {
  caption?: string;
};

export function Image({ className, caption, ...props }: Props) {
  return (
    <div className="mx-auto my-3 flex min-w-0 flex-col items-center gap-2">
      <NextImage className={cn("my-0 rounded-md", className)} {...props} />
      {caption && (
        <p className="my-0 text-center text-sm text-gray-700 dark:text-gray-300">
          {caption}
        </p>
      )}
      {/* {props.src.toString().includes("https") && (
        <p className="min-w-0 text-sm text-gray-700 dark:text-gray-300">
          Source:{" "}
          <a href={props.src.toString()} className="min-w-0">
            {props.src.toString()}
          </a>
        </p>
      )} */}
    </div>
  );
}
