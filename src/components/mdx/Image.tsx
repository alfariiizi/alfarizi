/* eslint-disable @typescript-eslint/no-base-to-string */

import {
  getAssetBlurDataURL,
  getAssetDimensions,
  resolveMdxAssetReference,
} from "@/lib/content-assets.js";
import { cn } from "@/lib/utils";
import NextImage, { type ImageProps } from "next/image";
import Caption from "./Caption";

type Props = Omit<ImageProps, "width" | "height"> & {
  assetDirectory?: string;
  caption?: string;
  full?: boolean;
  scale?: number;
};

export async function Image({
  src,
  className,
  caption,
  scale,
  assetDirectory,
  alt,
  full,
  ...props
}: Props) {
  const assetReference =
    typeof src === "string"
      ? resolveMdxAssetReference({
          src,
          assetDirectory,
        })
      : null;
  const imageSource = assetReference?.src ?? src;
  const [blurData, imageSize] = assetReference
    ? await Promise.all([
        getAssetBlurDataURL(assetReference),
        getAssetDimensions(assetReference),
      ])
    : ["", { width: 1024, height: 720 }];
  const isDoBlur = blurData.length !== 0;

  return (
    <div className="mx-auto my-3 flex min-w-0 flex-col items-center gap-2">
      <NextImage
        title={assetReference?.isRemote ? assetReference.src : undefined}
        src={imageSource}
        className={cn("my-0 h-auto rounded-sm", full && "w-full", className)}
        width={imageSize.width * (scale ?? 1)}
        height={imageSize.height * (scale ?? 1)}
        alt={alt ?? caption}
        sizes="(min-width: 960px) 768px, (min-width: 780px) calc(62.5vw + 181px), calc(96.52vw - 54px)"
        placeholder={isDoBlur ? "blur" : undefined}
        blurDataURL={isDoBlur ? blurData : undefined}
        priority
        {...props}
      />
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
