import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx/MDXComponets";
import {
  Article,
  ArticleContent,
  ArticleFooter,
  ArticleHeader,
} from "@/components/ui/article";
import { cn } from "@/lib/utils";
import Link from "next/link";
import readingTime from "reading-time";
import { getPostFromParams, type PostProps } from "./lib/getPostFromParams";

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default async function Page({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <Article className="relative mx-auto px-4 pb-16 pt-10 text-text">
      <ArticleHeader>
        <div className="flex justify-start gap-4">
          {post.icon && <h1 className="text-3xl md:text-4xl">{post.icon}</h1>}
          <h1
            className={cn(
              "text-2xl font-semibold text-primary sm:text-3xl",
              "font-display",
            )}
          >
            {post.title}
          </h1>
        </div>
        {post.description && (
          <p className={cn("text-base sm:text-lg", "font-display")}>
            {post.description}
          </p>
        )}
        <div className="flex h-auto items-center gap-7">
          <p
            className={cn(
              "text-base font-semibold text-blue-700 dark:text-blue-300 sm:text-lg",
              "font-display",
            )}
          >
            {formatter.format(new Date(post.date))}
          </p>
          <div className="h-2 w-2 rounded-full bg-text" />
          <p
            className={cn(
              "text-base font-semibold text-blue-700 dark:text-blue-300 sm:text-lg",
              "font-display",
            )}
          >
            {readingTime(post.body.raw).text}
          </p>
        </div>
      </ArticleHeader>

      {/* <div className="mb-10 mt-0 border-t-2 border-dashed border-gray-300 dark:border-gray-800" /> */}

      <ArticleContent>
        <Mdx code={post.body.code} />
      </ArticleContent>

      {/* <div className="mb-10 mt-10 border-t-2 border-dashed border-gray-300 dark:border-gray-800" /> */}

      <ArticleFooter>
        <p className={cn("font-semibold", "font-display")}>Tags:</p>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className={cn(
                "rounded-md bg-text/80 px-2 py-1 text-background duration-150 hover:opacity-80",
                "font-display",
              )}
            >
              {tag}
            </Link>
          ))}
        </div>
      </ArticleFooter>
    </Article>
  );
}
