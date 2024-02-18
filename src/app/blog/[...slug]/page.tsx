import { allPosts } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/app/_components/MDXComponets";
import { displayFont } from "@/app/_components/fonts";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert mx-auto px-4 pb-16 pt-14 text-text">
      <h1 className={cn("mb-6 text-primary", displayFont.className)}>
        {post.title}
      </h1>
      {post.description && (
        <p className={cn("mb-1 mt-3 text-xl", displayFont.className)}>
          {post.description}
        </p>
      )}
      {post.date && (
        <p
          className={cn("mt-1 text-base text-secondary", displayFont.className)}
        >
          {formatter.format(new Date(post.date))}
        </p>
      )}

      <hr className="mb-10 mt-0" />

      <Mdx code={post.body.code} />
    </article>
  );
}
