import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("pnpm overrides do not force Next.js beyond the declared major version", () => {
  const overrides = packageJson.pnpm?.overrides ?? {};
  const nextOverrideEntries = Object.entries(overrides).filter(([key]) =>
    key.startsWith("next@"),
  );

  assert.deepEqual(nextOverrideEntries, []);
});

test("legacy ajv consumers stay on the ajv 6 line", () => {
  const overrides = packageJson.pnpm?.overrides ?? {};

  assert.equal(overrides["ajv@<6.14.0"], "6.12.6");
});
