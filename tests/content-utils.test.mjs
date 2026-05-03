import test from "node:test";
import assert from "node:assert/strict";

import {
  sortPostsByDate,
  sortProjectsByStartDate,
} from "../src/lib/content-utils.js";

test("sortPostsByDate returns a descending copy without mutating input", () => {
  const posts = [
    { slug: "older-post", date: "2024-02-01" },
    { slug: "newer-post", date: "2025-03-01" },
  ];

  const originalOrder = posts.map((post) => post.slug);
  const sortedPosts = sortPostsByDate(posts);

  assert.deepEqual(
    sortedPosts.map((post) => post.slug),
    ["newer-post", "older-post"],
  );
  assert.deepEqual(
    posts.map((post) => post.slug),
    originalOrder,
  );
  assert.notStrictEqual(sortedPosts, posts);
});

test("sortProjectsByStartDate returns a descending copy without mutating input", () => {
  const projects = [
    { title: "Older Project", startDate: "2023-01-01" },
    { title: "Newer Project", startDate: "2024-06-01" },
  ];

  const originalOrder = projects.map((project) => project.title);
  const sortedProjects = sortProjectsByStartDate(projects);

  assert.deepEqual(
    sortedProjects.map((project) => project.title),
    ["Newer Project", "Older Project"],
  );
  assert.deepEqual(
    projects.map((project) => project.title),
    originalOrder,
  );
  assert.notStrictEqual(sortedProjects, projects);
});
