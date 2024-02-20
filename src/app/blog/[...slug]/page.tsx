import { notFound } from "next/navigation";

import { displayFont } from "@/app/_components/fonts";
import { Mdx } from "@/components/mdx/MDXComponets";
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
    <>
      <div className="flex justify-start gap-4">
        {post.icon && <h1 className="text-3xl md:text-4xl">{post.icon}</h1>}
        <h1
          className={cn(
            "text-3xl text-primary md:text-4xl",
            displayFont.className,
          )}
        >
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
            "mt-1 text-base font-semibold text-blue-700 dark:text-blue-300",
            displayFont.className,
          )}
        >
          {formatter.format(new Date(post.date))}
        </p>
        <div className="mb-5 h-2 w-2 rounded-full bg-text" />
        <p
          className={cn(
            "mt-1 text-base font-semibold text-blue-700 dark:text-blue-300",
            displayFont.className,
          )}
        >
          {readingTime(post.body.raw).text}
        </p>
      </div>

      <div className="mb-10 mt-0 border-t-2 border-dashed border-gray-300 dark:border-gray-800" />

      <Mdx code={post.body.code} />

      <div className="mb-10 mt-10 border-t-2 border-dashed border-gray-300 dark:border-gray-800" />

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
    </>
  );
}
