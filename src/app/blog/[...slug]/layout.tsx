import Comments from "@/app/_components/Comments";
import { Maxwidthdiv } from "@/app/_components/Maxwindthdiv";
import Tag from "@/app/_components/Tag";
import { Mdx } from "@/components/mdx/MDXComponets";
import {
  Article,
  ArticleContent,
  ArticleFooter,
  ArticleHeader,
} from "@/components/ui/article";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import readingTime from "reading-time";
import { getPostFromParams, type PostProps } from "./lib/getPostFromParams";

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }));
// }

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

type Props = {
  children: React.ReactNode;
  params: PostProps["params"];
};

export default function layout({ params, children }: Props) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const headings = post.content.headings;

  return (
    <div className="mb-28 space-y-10">
      <Maxwidthdiv smallPadding className="flex gap-6" lang="id">
        {post.metadata.toc && <div className="hidden w-[100px] lg:block" />}
        {/* Article */}
        <Article lang="id">
          <ArticleHeader>
            <div className="flex justify-start gap-4">
              {post.metadata.icon && (
                <h1 className="text-2xl md:text-3xl">{post.metadata.icon}</h1>
              )}
              <h1
                className={cn(
                  "font-display text-2xl font-semibold text-primary sm:text-3xl",
                )}
              >
                {post.metadata.title}
              </h1>
            </div>
            <p className={cn("text-base sm:text-lg")}>
              {post.metadata.description}
            </p>
            <div className="flex h-auto items-center gap-3 sm:gap-7">
              <p
                className={cn(
                  "font-display text-base font-semibold text-slate-500 sm:text-lg",
                )}
              >
                {formatter.format(new Date(post.metadata.date))}
              </p>
              <div className="h-2 w-2 rounded-full bg-accent" />
              <p
                className={cn(
                  "font-display text-base font-semibold text-slate-500 sm:text-lg",
                )}
              >
                {readingTime(post.content.raw).text}
              </p>
            </div>
          </ArticleHeader>

          {/* <div className="mb-10 mt-0 border-t-2 border-dashed border-gray-300 dark:border-gray-800" /> */}

          <ArticleContent>
            {post.metadata.rcc ? (
              <>{children}</>
            ) : (
              <Mdx code={post.content.mdx} />
            )}
          </ArticleContent>

          {/* <div className="mb-10 mt-10 border-t-2 border-dashed border-gray-300 dark:border-gray-800" /> */}

          <ArticleFooter>
            <p
              className={cn("font-display text-base font-semibold sm:text-lg")}
            >
              Tags:
            </p>
            <div className="flex flex-wrap gap-3">
              {post.metadata.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </ArticleFooter>
        </Article>

        {/* Table of content */}
        {post.metadata.toc && (
          <div className="sticky left-0 top-0 hidden h-fit w-[260px] flex-col gap-4 pt-20 text-base lg:flex">
            <h3 className="font-semibold text-gray-400 dark:text-gray-600">
              On this page
            </h3>
            <div className="flex flex-col gap-3">
              {headings.map((heading) => {
                if (!heading.level) {
                  return undefined;
                }

                return (
                  <div key={`#${heading.slug}`}>
                    <a
                      data-level={heading.level}
                      href={`#${heading.slug}`}
                      className="flex leading-tight opacity-60 duration-150 hover:opacity-100 data-[level=four]:pl-[2rem] data-[level=three]:pl-4 data-[level=two]:pl-0"
                    >
                      {heading.text}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Maxwidthdiv>

      {/* Comments */}
      <Comments />
    </div>
  );
}
