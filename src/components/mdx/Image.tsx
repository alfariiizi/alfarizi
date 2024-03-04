/* eslint-disable @typescript-eslint/no-base-to-string */

import { env } from "@/env";
import { getBase64 } from "@/lib/getBase64";
import { cn } from "@/lib/utils";
import NextImage, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "width" | "height"> & {
  caption?: string;
  full?: boolean;
  size: number;
};

export async function Image({
  src,
  className,
  caption,
  size,
  alt,
  full,
  ...props
}: Props) {
  const isExternal = typeof src !== "string" ? false : !src.startsWith("/");
  const blurData = await getBase64(
    isExternal ? src.toString() : `${env.NEXT_PUBLIC_URL}${src.toString()}`,
  );

  return (
    <div className="mx-auto my-3 flex min-w-0 flex-col items-center gap-2">
      <NextImage
        src={src}
        className={cn("my-0 h-auto rounded-md", full && "w-full", className)}
        width={size}
        height={size}
        alt={alt ?? caption}
        sizes="(min-width: 960px) 768px, (min-width: 780px) calc(62.5vw + 181px), calc(96.52vw - 54px)"
        placeholder="blur"
        blurDataURL={blurData}
        priority
        {...props}
      />
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
