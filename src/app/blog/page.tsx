import { filterPostsBySearchQuery } from "@/lib/blog-search.js";
import { cn } from "@/lib/utils";
import { sortPostsByDate } from "@/lib/content-utils.js";
import { posts } from "@/velite/posts";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { RoughBox, RoughUnderline } from "../_components/RoughNotation";
import Blog from "./_components/Blog";
import SearchInput from "./_components/SearchInput";
import DivFadeIn from "../_components/DivFadeIn";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays, notes, and occasional experiments on software, tools, and the tradeoffs behind both.",
};

type Props = {
  searchParams: {
    search?: string;
  };
};

const sortedPost = sortPostsByDate(posts);

export default function Page({ searchParams: { search } }: Props) {
  const filteredPosts = filterPostsBySearchQuery(sortedPost, search);

  return (
    <DivFadeIn>
      <Maxwidthdiv className="my-10 flex justify-center">
        <div className="flex w-full flex-col gap-10">
          <div className="space-y-2">
            <h2
              className={cn(
                "text-4xl font-bold text-primary lg:text-5xl",
                "font-display",
              )}
            >
              <RoughBox>Writing</RoughBox>
            </h2>
            <p>
              Essays, notes, and occasional experiments on software, tools, and
              the tradeoffs behind both.{" "}
              <span className="hidden lg:inline">
                <br /> The focus is practical:{" "}
                <RoughUnderline multiline>
                  what changes the shape of a system
                </RoughUnderline>
                , what keeps it maintainable, and what matters once work has to
                survive real use.
              </span>
            </p>
          </div>
          <SearchInput initialParams={{ search }} />
          <Blog
            posts={filteredPosts.map((item) => ({
              ...item,
            }))}
          />
        </div>
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
