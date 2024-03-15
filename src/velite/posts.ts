import { postMetadata, posts as postRaw } from ".velite";

const posts = postRaw.map((post, idx) => ({
  metadata: postMetadata[idx]!,
  content: post,
}));

export { posts };
