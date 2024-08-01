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
import "@/styles/content.css";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import readingTime from "reading-time";
import { getPostFromParams, type PostProps } from "./lib/getPostFromParams";
import { MotionDiv } from "@/lib/framer-motion";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }));
// }

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

type Props = {
  params: PostProps["params"];
};

export default function page({ params }: Props) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const headings = post.headings;

  return (
    <MotionDiv
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className="mb-28 space-y-10"
    >
      <Maxwidthdiv smallPadding className="flex gap-6" lang={post.lang}>
        {post.toc && <div className="hidden w-[100px] lg:block" />}
        {/* Article */}
        <Article>
          <ArticleHeader>
            <Link
              href="/blog"
              className="-mt-4 mb-6 flex w-fit items-center gap-1 text-sm leading-tight opacity-60 duration-150 hover:opacity-100"
            >
              <LuArrowLeft className="size-4" /> See all posts
            </Link>
            <div className="flex justify-start gap-4">
              {post.icon && (
                <h1 className="text-xl sm:text-3xl">{post.icon}</h1>
              )}
              <h1
                className={cn(
                  "font-display text-xl font-semibold text-primary sm:text-3xl",
                )}
              >
                {post.title}
              </h1>
            </div>
            <div className="flex h-auto items-center gap-3 sm:gap-7">
              <p
                className={cn(
                  "pt-1 font-display text-sm font-semibold text-slate-500 sm:text-lg",
                )}
              >
                {formatter.format(new Date(post.date))}
              </p>
              <div className="h-2 w-2 rounded-full bg-accent" />
              <p
                className={cn(
                  "pt-1 font-display text-sm font-semibold text-slate-500 sm:text-lg",
                )}
              >
                {readingTime(post.raw).text}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} tag={tag} className="text-xs sm:text-sm" />
              ))}
            </div>
          </ArticleHeader>

          <ArticleContent lang={post.lang}>
            <Mdx code={post.mdx} />
          </ArticleContent>

          <ArticleFooter className="space-y-6">
            {post.bib.length !== 0 && (
              <div>
                <p className="font-display text-base font-semibold sm:text-lg">
                  Bibliography:
                </p>
                <ul className="list-disc space-y-1 [&>li]:ml-4">
                  {post.bib.map((b) => (
                    <li key={b.text} className="list-item">
                      <Link
                        target="_blank"
                        href={b.link ?? ""}
                        className="underline underline-offset-2 duration-150 hover:opacity-80"
                      >
                        {b.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p
                className={cn(
                  "font-display text-base font-semibold sm:text-lg",
                )}
              >
                Tags:
              </p>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </ArticleFooter>
        </Article>

        {/* Table of content */}
        {post.toc && (
          <div className="sticky left-0 top-0 hidden h-fit w-[260px] flex-col gap-4 pt-20 text-base lg:flex">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-600">
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
                      className="flex text-sm leading-tight opacity-60 duration-150 data-[level=four]:pl-[2rem] data-[level=three]:pl-4 data-[level=two]:pl-0 hover:opacity-100"
                    >
                      {heading.text}
                    </a>
                  </div>
                );
              })}
              <div className="mt-6 h-[2px] w-full border-t-2 border-dashed" />
              <Link
                href="/blog"
                className="mt-1 flex w-full items-center gap-1 text-sm leading-tight opacity-60 duration-150 hover:opacity-100"
              >
                See other posts <LuArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </Maxwidthdiv>

      {/* Comments */}
      <Comments />
    </MotionDiv>
  );
}
