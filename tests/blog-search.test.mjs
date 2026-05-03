import test from "node:test";
import assert from "node:assert/strict";

import { filterPostsBySearchQuery } from "../src/lib/blog-search.js";

const posts = [
  {
    title: "React Server Components in Practice",
    slug: "react-server-components",
  },
  {
    title: "Linux Workflow Notes",
    slug: "linux-workflow",
  },
  {
    title: "React Query Patterns",
    slug: "react-query-patterns",
  },
];

test("filterPostsBySearchQuery returns all posts for an empty query", () => {
  const filteredPosts = filterPostsBySearchQuery(posts, "");

  assert.deepEqual(filteredPosts, posts);
  assert.notStrictEqual(filteredPosts, posts);
});

test("filterPostsBySearchQuery matches titles case-insensitively", () => {
  const filteredPosts = filterPostsBySearchQuery(posts, "rEaCt");

  assert.deepEqual(filteredPosts.map((post) => post.slug), [
    "react-server-components",
    "react-query-patterns",
  ]);
});

test("filterPostsBySearchQuery preserves the incoming order", () => {
  const filteredPosts = filterPostsBySearchQuery(posts, "react");

  assert.deepEqual(filteredPosts.map((post) => post.slug), [
    "react-server-components",
    "react-query-patterns",
  ]);
});
