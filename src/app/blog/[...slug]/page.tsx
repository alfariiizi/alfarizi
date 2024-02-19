import { allPosts } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/app/_components/MDXComponets";
import { displayFont } from "@/app/_components/fonts";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import readingTime from "reading-time";

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
    title: `${post.title} | ${env.PROJECT_NAME}`,
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
    <article className="prose mx-auto px-4 pb-16 pt-14 text-text dark:prose-invert">
      <div className="flex justify-start gap-4">
        {post.icon && <h1 className="">{post.icon}</h1>}
        <h1 className={cn("text-primary", displayFont.className)}>
          {post.title}
        </h1>
      </div>
      {post.description && (
        <p className={cn("mb-1 mt-3 text-xl", displayFont.className)}>
          {post.description}
        </p>
      )}
      <div className="flex h-auto items-center gap-7">
        <p
          className={cn(
            "mt-1 text-base font-semibold text-secondary",
            displayFont.className,
          )}
        >
          {formatter.format(new Date(post.date))}
        </p>
        <div className="mb-5 h-2 w-2 rounded-full bg-text" />
        <p
          className={cn(
            "mt-1 text-base font-semibold text-secondary",
            displayFont.className,
          )}
        >
          {readingTime(post.body.raw).text}
        </p>
      </div>

      <div className="mb-10 mt-0 border-t-2 border-dashed border-primary" />

      <Mdx code={post.body.code} />

      <div className="mb-10 mt-10 border-t-2 border-dashed border-primary" />

      <div>
        <p className={cn("mb-0 font-semibold", displayFont.className)}>Tags:</p>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className={cn(
                "bg-text/80 rounded-md px-2 py-1",
                displayFont.className,
              )}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
