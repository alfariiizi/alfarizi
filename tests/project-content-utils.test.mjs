import test from "node:test";
import assert from "node:assert/strict";

import {
  getHighlightedProjects,
  getNonHighlightedProjects,
} from "../src/lib/content-utils.js";

test("getHighlightedProjects selects highlighted projects newest first without mutating input", () => {
  const projects = [
    { title: "Older Highlight", highlight: true, startDate: "2023-01-01" },
    { title: "Regular Project", highlight: false, startDate: "2024-01-01" },
    { title: "Newer Highlight", highlight: true, startDate: "2025-01-01" },
  ];

  const originalOrder = projects.map((project) => project.title);
  const highlightedProjects = getHighlightedProjects(projects);

  assert.deepEqual(
    highlightedProjects.map((project) => project.title),
    ["Newer Highlight", "Older Highlight"],
  );
  assert.deepEqual(
    projects.map((project) => project.title),
    originalOrder,
  );
  assert.notStrictEqual(highlightedProjects, projects);
});

test("getNonHighlightedProjects excludes highlighted projects and sorts newest first", () => {
  const projects = [
    { title: "Older Project", highlight: false, startDate: "2023-01-01" },
    { title: "Highlight", highlight: true, startDate: "2025-01-01" },
    { title: "Newest Project", highlight: false, startDate: "2024-01-01" },
    { title: "Same Date Project", highlight: false, startDate: "2024-01-01" },
  ];

  const originalOrder = projects.map((project) => project.title);
  const nonHighlightedProjects = getNonHighlightedProjects(projects);

  assert.deepEqual(
    nonHighlightedProjects.map((project) => project.title),
    ["Newest Project", "Same Date Project", "Older Project"],
  );
  assert.deepEqual(
    projects.map((project) => project.title),
    originalOrder,
  );
  assert.notStrictEqual(nonHighlightedProjects, projects);
});
