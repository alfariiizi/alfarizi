/* eslint-disable @typescript-eslint/no-base-to-string */

import { env } from "@/env";
import { getBase64 } from "@/lib/getBase64";
import { cn } from "@/lib/utils";
import NextImage, { type ImageProps } from "next/image";
import probe from "probe-image-size";

type Props = Omit<ImageProps, "width" | "height"> & {
  caption?: string;
  full?: boolean;
  scale?: number;
};

export async function Image({
  src,
  className,
  caption,
  scale,
  alt,
  full,
  ...props
}: Props) {
  const isExternal = typeof src !== "string" ? false : !src.startsWith("/");
  const srcFull = isExternal
    ? src.toString()
    : `${env.NEXT_PUBLIC_URL}${src.toString()}`;
  const blurData = await getBase64(srcFull);
  const imageSize = await probe(srcFull);

  return (
    <div className="mx-auto my-3 flex min-w-0 flex-col items-center gap-2">
      <NextImage
        src={src}
        className={cn("my-0 h-auto rounded-sm", full && "w-full", className)}
        width={imageSize.width * (scale ?? 1)}
        height={imageSize.height * (scale ?? 1)}
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
    </div>
  );
}
