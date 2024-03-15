import { postMetadata, projects } from ".velite";

export const allTagsRaw = [
  ...projects.map((post) => post.tags).flat(),
  ...postMetadata.map((post) => post.tags).flat(),
];

const allTags: string[] = [];
allTagsRaw.forEach((tag) => {
  if (!allTags.includes(tag)) {
    allTags.push(tag);
  }
});

export { allTags };
