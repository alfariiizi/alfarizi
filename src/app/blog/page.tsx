import { allPosts } from ".contentlayer/generated";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { displayFont } from "../_components/fonts";

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default function Page() {
  const sortedPost = allPosts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );

  return (
    <Maxwidthdiv className="mt-10 flex justify-center">
      <div className="flex w-full max-w-3xl flex-col gap-16">
        <h2
          className={cn(
            "text-4xl font-bold text-primary lg:text-5xl",
            displayFont.className,
          )}
        >
          Latest posts &#9997;
        </h2>
        <div className={cn("flex flex-col gap-10", displayFont.className)}>
          {sortedPost.map((post) => (
            <>
              <article key={post._id} className="flex gap-5">
                <p className="min-w-[5.5rem] text-end font-semibold text-secondary md:min-w-40">
                  {formatter.format(new Date(post.date))}
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href={post.slug}
                    className="w-fit duration-150 hover:opacity-70"
                  >
                    <h3 className="text-xl font-semibold text-primary">
                      {post.title}
                    </h3>
                  </Link>
                  {post.description && <p>{post.description}</p>}
                </div>
              </article>
            </>
          ))}
        </div>
      </div>
    </Maxwidthdiv>
  );
}
