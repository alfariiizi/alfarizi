import { cn } from "@/lib/utils";
import { posts } from "@/velite/posts";
import { type Metadata } from "next";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";

export const metadata: Metadata = {
  title: "Blogpost",
};

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default function Page() {
  const sortedPost = posts.sort((a, b) =>
    new Date(a.metadata.date) < new Date(b.metadata.date) ? 1 : -1,
  );

  return (
    <Maxwidthdiv className="mt-10 flex justify-center">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <h2
          className={cn(
            "text-4xl font-bold text-primary lg:text-5xl",
            "font-display",
          )}
        >
          Latest posts ✍️
        </h2>
        <div className={cn("flex flex-col gap-10", "font-display")}>
          {sortedPost.map((post) => (
            <>
              <article key={post.metadata.slug} className="flex gap-5">
                <p className="min-w-[5.5rem] text-end font-semibold text-secondary md:min-w-40">
                  {formatter.format(new Date(post.metadata.date))}
                </p>
                <div className="flex flex-col gap-0">
                  <Link
                    href={post.metadata.permalink}
                    className="w-fit duration-150 hover:opacity-70"
                  >
                    <h3 className="text-lg font-semibold text-primary sm:text-xl">
                      {post.metadata.title}
                    </h3>
                  </Link>
                  <p className="font-sans text-sm sm:text-base">
                    {post.metadata.description}
                  </p>
                </div>
              </article>
            </>
          ))}
        </div>
      </div>
    </Maxwidthdiv>
  );
}
