import { readFile } from "node:fs/promises";
import path from "node:path";

import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

const DEFAULT_IMAGE_DIMENSIONS = {
  width: 1024,
  height: 720,
};

const CONTENT_ROOT = path.join(process.cwd(), "public/content");

/**
 * @typedef {{
 *   asset: string;
 *   contentPath: string;
 * }} ResolveContentAssetReferenceInput
 */

/**
 * @typedef {{
 *   src: string;
 *   filePath: string | undefined;
 *   isRemote: boolean;
 * }} ContentAssetReference
 */

/**
 * @param {string} asset
 */
function isRemoteAsset(asset) {
  return /^https?:\/\//.test(asset);
}

/**
 * @param {ResolveContentAssetReferenceInput} input
 * @returns {ContentAssetReference}
 */
export function resolveContentAssetReference({ asset, contentPath }) {
  if (isRemoteAsset(asset)) {
    return {
      src: asset,
      filePath: undefined,
      isRemote: true,
    };
  }

  if (asset.startsWith("/")) {
    return {
      src: asset,
      filePath: path.join(process.cwd(), "public", asset.slice(1)),
      isRemote: false,
    };
  }

  const relativeContentPath = path.isAbsolute(contentPath)
    ? path.relative(CONTENT_ROOT, contentPath)
    : contentPath;
  const contentDirectory = path.posix.dirname(
    relativeContentPath.split(path.sep).join(path.posix.sep),
  );

  return {
    src: path.posix.join("/content", contentDirectory, asset),
    filePath: path.join(process.cwd(), "public/content", contentDirectory, asset),
    isRemote: false,
  };
}

/**
 * @param {{
 *   src: string;
 *   assetDirectory?: string;
 * }} input
 * @returns {ContentAssetReference}
 */
export function resolveMdxAssetReference({ src, assetDirectory }) {
  if (isRemoteAsset(src)) {
    return {
      src,
      filePath: undefined,
      isRemote: true,
    };
  }

  if (src.startsWith("/")) {
    return {
      src,
      filePath: path.join(process.cwd(), "public", src.slice(1)),
      isRemote: false,
    };
  }

  if (!assetDirectory) {
    return {
      src,
      filePath: undefined,
      isRemote: true,
    };
  }

  const normalizedAssetDirectory = assetDirectory.startsWith("/")
    ? assetDirectory
    : `/${assetDirectory}`;
  const normalizedSrc = path.posix.join(normalizedAssetDirectory, src);

  return {
    src: normalizedSrc,
    filePath: path.join(process.cwd(), "public", normalizedSrc.slice(1)),
    isRemote: false,
  };
}

/**
 * @param {{
 *   src: string;
 *   width: number;
 *   height: number;
 *   blurDataURL: string;
 * }} input
 */
export function toImageMetadata({ src, width, height, blurDataURL }) {
  return {
    src,
    width,
    height,
    blurWidth: width,
    blurHeight: height,
    blurDataURL,
  };
}

/**
 * @param {ContentAssetReference} assetReference
 */
async function readAssetBuffer(assetReference) {
  if (assetReference.isRemote) {
    const response = await fetch(assetReference.src);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
    }

    return Buffer.from(await response.arrayBuffer());
  }

  if (!assetReference.filePath) {
    throw new Error(`Missing file path for local asset: ${assetReference.src}`);
  }

  return readFile(assetReference.filePath);
}

/**
 * @param {ContentAssetReference} assetReference
 */
export async function getAssetBlurDataURL(assetReference) {
  if (assetReference.isRemote) {
    return "";
  }

  try {
    const buffer = await readAssetBuffer(assetReference);
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }

    return "";
  }
}

/**
 * @param {ContentAssetReference} assetReference
 */
export async function getAssetDimensions(assetReference) {
  if (assetReference.isRemote) {
    return DEFAULT_IMAGE_DIMENSIONS;
  }

  try {
    if (!assetReference.filePath) {
      return DEFAULT_IMAGE_DIMENSIONS;
    }

    const metadata = await sharp(assetReference.filePath).metadata();
    return {
      width: metadata.width ?? DEFAULT_IMAGE_DIMENSIONS.width,
      height: metadata.height ?? DEFAULT_IMAGE_DIMENSIONS.height,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }

    return DEFAULT_IMAGE_DIMENSIONS;
  }
}
