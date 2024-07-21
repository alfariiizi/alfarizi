import { cn } from "@/lib/utils";
import { posts } from "@/velite/posts";
import { type Metadata } from "next";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { Image } from "@/components/mdx/Image";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Blogpost",
};

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

function isNew(date: string) {
  const dateNow = new Date();
  const datePost = new Date(date);

  // Menghitung selisih dalam milidetik
  const difference = dateNow.getTime() - datePost.getTime();

  // Mengubah milidetik menjadi hari
  const dayDifference = difference / (1000 * 60 * 60 * 24);
  return dayDifference < 14;
}

export default function Page() {
  const sortedPost = posts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );

  return (
    <Maxwidthdiv className="my-10 flex justify-center">
      <div className="flex w-full flex-col gap-20">
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
            This is all my posts. Mostly about React.js, Next.js, Python,
            Neovim, and Linux.
          </p>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-32 lg:grid-cols-3 xl:grid-cols-4",
            "font-display",
          )}
        >
          {sortedPost.map((post) => {
            const isPostNew = isNew(post.date);

            return <BlogItem key={post.title} post={post} isNew={isPostNew} />;
          })}
        </div>
      </div>
    </Maxwidthdiv>
  );
}

type BlogItemProps = {
  isNew?: boolean;
  post: (typeof posts)[0];
};

function BlogItem({ post, isNew }: BlogItemProps) {
  return (
    <article className="flex flex-col gap-4">
      {/* <div className="aspect-square w-full bg-gray-300" /> */}
      <Image
        src={post.image}
        alt={post.title}
        className="aspect-square object-cover"
      />
      <div className="flex flex-col gap-0">
        <div>
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
        </div>
        <p className="font-sans text-sm leading-normal text-zinc-700 dark:text-zinc-400 sm:text-base">
          {post.description}
        </p>
      </div>
      <p
        className={cn(
          "min-w-[5.5rem] font-semibold text-secondary md:min-w-40",
          isNew && "mt-7",
        )}
      >
        {formatter.format(new Date(post.date))}
      </p>
    </article>
  );
}
