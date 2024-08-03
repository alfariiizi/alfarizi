import { cn } from "@/lib/utils";
import { posts } from "@/velite/posts";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import Blog from "./_components/Blog";
import SearchInput from "./_components/SearchInput";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Blogpost",
  description:
    "Explore my latest posts, featuring insights and projects on React.js, Next.js, Python, Neovim, and Linux. Stay updated with fresh content designed to enhance your development skills and knowledge.",
};

type Props = {
  searchParams: {
    search?: string;
  };
};

export default function Page({ searchParams: { search } }: Props) {
  const sortedPost = posts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );
  // const filteredPost = search
  //   ? sortedPost.filter((f) =>
  //       f.title.toLowerCase().includes(search.toLowerCase()),
  //     )
  //   : sortedPost;

  return (
    <Maxwidthdiv className="my-10 flex justify-center">
      <div className="flex w-full flex-col gap-10">
        <div className="space-y-2">
          <h2
            className={cn(
              "text-4xl font-bold text-primary lg:text-5xl",
              "font-display",
            )}
          >
            Latest posts ✍️
          </h2>
          <p>
            🚀 Explore my latest posts, featuring insights and projects on{" "}
            <strong>React.js</strong>, <strong>Next.js</strong>,{" "}
            <strong>Python</strong>, <strong>Neovim</strong>, and{" "}
            <strong>Linux</strong>.{" "}
            <span className="hidden lg:inline">
              <br /> ✨ Stay updated with fresh content designed to enhance your
              development skills and knowledge.
            </span>
          </p>
        </div>
        <SearchInput initialParams={{ search }} />
        <Blog
          posts={sortedPost.map((item) => ({
            ...item,
          }))}
        />
      </div>
    </Maxwidthdiv>
  );
}
