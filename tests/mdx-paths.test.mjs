import test from "node:test";
import assert from "node:assert/strict";

import { generateMdxAssetPath } from "../src/lib/mdx-paths.js";

test("generateMdxAssetPath joins asset directory and filename", () => {
  assert.equal(
    generateMdxAssetPath("/content/blog/prisma-orm-and-turso", "cover.png"),
    "/content/blog/prisma-orm-and-turso/cover.png",
  );
});

test("generateMdxAssetPath trims duplicate slashes", () => {
  assert.equal(
    generateMdxAssetPath("/content/project/windsight/", "/dashboard.png"),
    "/content/project/windsight/dashboard.png",
  );
});

test("generateMdxAssetPath falls back to filename when asset directory is missing", () => {
  assert.equal(generateMdxAssetPath(undefined, "cover.png"), "cover.png");
});
