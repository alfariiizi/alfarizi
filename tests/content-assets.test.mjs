import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import {
  resolveMdxAssetReference,
  resolveContentAssetReference,
  toImageMetadata,
} from "../src/lib/content-assets.js";

test("resolveContentAssetReference resolves relative content assets", () => {
  const asset = resolveContentAssetReference({
    asset: "cover.png",
    contentPath: "blog/prisma-orm-and-turso/index.mdx",
  });

  assert.deepEqual(asset, {
    src: "/content/blog/prisma-orm-and-turso/cover.png",
    filePath: path.join(
      process.cwd(),
      "public/content/blog/prisma-orm-and-turso/cover.png",
    ),
    isRemote: false,
  });
});

test("resolveContentAssetReference preserves remote assets", () => {
  const asset = resolveContentAssetReference({
    asset: "https://example.com/cover.png",
    contentPath: "blog/example-post/index.mdx",
  });

  assert.deepEqual(asset, {
    src: "https://example.com/cover.png",
    filePath: undefined,
    isRemote: true,
  });
});

test("resolveContentAssetReference supports public-root assets", () => {
  const asset = resolveContentAssetReference({
    asset: "/images/tech-logo/nextjs.png",
    contentPath: "project/personal-website/index.mdx",
  });

  assert.deepEqual(asset, {
    src: "/images/tech-logo/nextjs.png",
    filePath: path.join(process.cwd(), "public/images/tech-logo/nextjs.png"),
    isRemote: false,
  });
});

test("resolveContentAssetReference supports absolute Velite content paths", () => {
  const asset = resolveContentAssetReference({
    asset: "img.png",
    contentPath: path.join(
      process.cwd(),
      "public/content/project/guess-my-number/index.mdx",
    ),
  });

  assert.deepEqual(asset, {
    src: "/content/project/guess-my-number/img.png",
    filePath: path.join(
      process.cwd(),
      "public/content/project/guess-my-number/img.png",
    ),
    isRemote: false,
  });
});

test("toImageMetadata returns a shape compatible with next/image", () => {
  const metadata = toImageMetadata({
    src: "/content/blog/prisma-orm-and-turso/cover.png",
    width: 1200,
    height: 630,
    blurDataURL: "data:image/png;base64,abc",
  });

  assert.deepEqual(metadata, {
    src: "/content/blog/prisma-orm-and-turso/cover.png",
    width: 1200,
    height: 630,
    blurWidth: 1200,
    blurHeight: 630,
    blurDataURL: "data:image/png;base64,abc",
  });
});

test("resolveMdxAssetReference resolves relative MDX image sources", () => {
  const asset = resolveMdxAssetReference({
    src: "cover.png",
    assetDirectory: "/content/blog/content-prisma-nextauth",
  });

  assert.deepEqual(asset, {
    src: "/content/blog/content-prisma-nextauth/cover.png",
    filePath: path.join(
      process.cwd(),
      "public/content/blog/content-prisma-nextauth/cover.png",
    ),
    isRemote: false,
  });
});
