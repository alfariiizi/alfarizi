import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve("public/content/project");
const allowedProjectTypes = new Set([
  "personal",
  "professional-public",
  "professional-internal",
]);

function listProjectFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listProjectFiles(entryPath);
      }

      return entry.name === "index.mdx" ? [entryPath] : [];
    });
}

function parseFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\n(?<body>[\s\S]*?)\n---/);
  assert.ok(match?.groups?.body, `${filePath} must have frontmatter`);

  return Object.fromEntries(
    match.groups.body
      .split("\n")
      .map((line) => line.match(/^(?<key>[A-Za-z][A-Za-z0-9]*):\s*(?<value>.*)$/))
      .filter(Boolean)
      .map((match) => [
        match.groups.key,
        match.groups.value.replace(/^["']|["']$/g, ""),
      ]),
  );
}

test("all project entries define explicit portfolio metadata", () => {
  const files = listProjectFiles(projectRoot);
  assert.ok(files.length > 0, "expected project MDX files");

  for (const file of files) {
    const frontmatter = parseFrontmatter(file);

    for (const key of ["company", "projectType", "highlight", "image", "startDate"]) {
      assert.ok(frontmatter[key], `${file} must define ${key}`);
    }

    assert.ok(
      allowedProjectTypes.has(frontmatter.projectType),
      `${file} has invalid projectType: ${frontmatter.projectType}`,
    );
  }
});
