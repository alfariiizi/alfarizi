import { Maxwidthdiv } from "@/app/_components/Maxwindthdiv";
import { type Heading } from "@/app/types/toc";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { getPostFromParams, type PostProps } from "./lib/getPostFromParams";

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

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }));
// }

type Props = {
  children: React.ReactNode;
  params: PostProps["params"];
};

export default async function layout({ params, children }: Props) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const headings = post.headings as Heading[];

  return (
    <Maxwidthdiv smallPadding className="flex gap-6" lang="id">
      {post.toc && <div className="hidden w-[100px] lg:block" />}
      {/* Article */}
      {children}
      {/* Table of content */}
      {post.toc && (
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
  );
}
