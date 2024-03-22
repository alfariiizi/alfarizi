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
    <Maxwidthdiv className="my-10 flex justify-center">
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
              <article className="flex gap-5">
                <p
                  className={cn(
                    "min-w-[5.5rem] text-end font-semibold text-secondary md:min-w-40",
                    post.metadata.isNew && "mt-7",
                  )}
                >
                  {formatter.format(new Date(post.metadata.date))}
                </p>
                <div className="flex flex-col gap-0">
                  <div>
                    {post.metadata.isNew && (
                      <p className="mb-1 w-fit animate-pulse rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                        New 🎉
                      </p>
                    )}
                    <Link
                      href={post.metadata.permalink}
                      className="w-fit duration-150 hover:opacity-70"
                    >
                      <h3 className="text-lg font-semibold text-primary sm:text-xl">
                        {post.metadata.title}
                      </h3>
                    </Link>
                  </div>
                  <p className="font-sans text-sm leading-normal sm:text-base">
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
