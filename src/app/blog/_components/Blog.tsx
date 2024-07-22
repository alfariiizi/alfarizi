import { type posts } from ".velite/index";
import { cn } from "@/lib/utils";
import React from "react";
import { formatter, isNew } from "./utils";
// import Image from "next/image";
import { Image } from "@/components/mdx/Image";
import Link from "next/link";
import Tag from "@/app/_components/Tag";

type PostsVelite = (typeof posts)[0];
type PostMetadata = Omit<PostsVelite, "mdx" | "raw">;

type Props = {
  posts: PostMetadata[];
};

export default function Blog({ posts }: Props) {
  // const [search] = useQueryState("search", parseAsString.withDefault(""));
  // const filteredPost = posts.filter((f) =>
  //   f.title.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-24 lg:grid-cols-3",
        "font-display",
      )}
    >
      {posts.map((post) => {
        const isPostNew = isNew(post.date);

        return <BlogItem key={post.title} post={post} isNew={isPostNew} />;
      })}
    </div>
  );
}

type BlogItemProps = {
  isNew?: boolean;
  post: PostMetadata;
};

function BlogItem({ post, isNew }: BlogItemProps) {
  return (
    <article className="flex flex-col gap-3 rounded-md border bg-card px-3 pb-4 text-card-foreground shadow-sm">
      {/* <div className="aspect-square w-full bg-gray-300" /> */}
      <Link
        href={post.permalink}
        className="group relative aspect-video w-full transition-all duration-300"
      >
        <Image
          src={post.image}
          alt={post.title}
          // width={512}
          // height={512}
          // quality={100}
          className="aspect-video w-full rounded-sm object-cover opacity-100 duration-300 group-hover:opacity-20"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent opacity-0 duration-300 group-hover:opacity-100">
          <p>Click to read</p>
        </div>
      </Link>
      <div className="flex h-full flex-col justify-between gap-3 py-2">
        <div className="flex flex-col">
          {/* {isNew && ( */}
          {/*   <p className="mb-1 w-fit animate-pulse rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground"> */}
          {/*     New 🎉 */}
          {/*   </p> */}
          {/* )} */}
          <Link
            href={post.permalink}
            className="w-fit duration-150 hover:opacity-70"
          >
            <h3 className="text-lg font-semibold text-primary sm:text-xl">
              {post.title}
            </h3>
          </Link>
          <p className="font-sans text-sm leading-normal text-zinc-700 dark:text-zinc-400 sm:text-base">
            {post.description}
          </p>
          <div className="my-4 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                className="font-sans text-sm sm:text-sm"
              />
            ))}
          </div>
        </div>
        <p
          className={cn(
            "min-w-[5.5rem] font-semibold text-secondary md:min-w-40",
            isNew && "mt-7",
          )}
        >
          {formatter.format(new Date(post.date))}
        </p>
      </div>
    </article>
  );
}
