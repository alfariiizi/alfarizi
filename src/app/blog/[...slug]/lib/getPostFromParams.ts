import { posts } from "@/velite/posts";

export interface PostProps {
  params: {
    slug: string[];
  };
}

export function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.metadata.slug === slug);

  if (!post) {
    null;
  }

  return post;
}
