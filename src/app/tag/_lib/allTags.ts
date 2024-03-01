import { allPosts, allProjects } from ".contentlayer/generated";

export const allTagsRaw = [
  ...allPosts.map((post) => post.tags).flat(),
  ...allProjects.map((post) => post.tags).flat(),
];
