import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

function read(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("homepage copy matches the premium positioning", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /Building thoughtful software for real-world use\./);
  assert.match(page, /I work across product, frontend, backend, and delivery to build/);
  assert.match(page, /clear, reliable, and useful under real\s+constraints\./);
  assert.doesNotMatch(page, /Hey there/);
  assert.doesNotMatch(page, /Cat lover/);
  assert.doesNotMatch(page, /24 years old/);
});

test("supporting pages avoid casual emoji-led framing", () => {
  const projectPage = read("src/app/project/page.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const layout = read("src/app/layout.tsx");
  const projectShared = read("src/app/project/shared.ts");
  const personalWebsiteProject = read(
    "public/content/project/personal-website/index.mdx",
  );

  assert.doesNotMatch(projectPage, /🏗️/);
  assert.doesNotMatch(contactPage, /🫱🏼‍🫲🏽/);
  assert.doesNotMatch(layout, /Personal Website/);
  assert.doesNotMatch(layout, /CTO Ozone/);
  assert.doesNotMatch(layout, /\bOzone\b/);
  assert.doesNotMatch(projectShared, /Personal Website/);
  assert.doesNotMatch(personalWebsiteProject, /Personal Website/);
});

test("metadata reflects the new positioning", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /thoughtful software/i);
  assert.match(layout, /real-world use/i);
  assert.match(layout, /engineering work/i);
});
