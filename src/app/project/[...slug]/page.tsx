import { allProjects } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import Tag from "@/app/_components/Tag";
import { Mdx } from "@/components/mdx/MDXComponets";
import {
  Article,
  ArticleContent,
  ArticleFooter,
  ArticleHeader,
} from "@/components/ui/article";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import readingTime from "reading-time";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allProjects.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const project = await getPostFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allProjects.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const startYear = post.startDate.split("-")[0];
  const endYear = post.endDate?.split("-")[0] ?? "Present";
  const displayYear =
    startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    // <article
    //   lang="id"
    //   className="text-foreground prose mx-auto px-4 pb-16 pt-14 dark:prose-invert"
    // >
    //   <h1 className={cn("text-3xl text-primary sm:text-4xl", "font-display")}>
    //     {post.title} ({post.company})
    //   </h1>
    //   <p className={cn("mb-1 mt-0 text-base sm:text-lg", "font-display")}>
    //     {post.description}
    //   </p>
    //   <div className="mb-0 flex h-fit items-center gap-7">
    //     <p
    //       className={cn(
    //         "mt-1 text-base font-semibold text-blue-700 dark:text-blue-300 sm:text-lg",
    //         "font-display",
    //       )}
    //     >
    //       {displayYear}
    //     </p>
    //     <div className="mb-5 h-2 w-2 rounded-full bg-text" />
    //     <p
    //       className={cn(
    //         "mt-1 text-base font-semibold text-blue-700 dark:text-blue-300 sm:text-lg",
    //         "font-display",
    //       )}
    //     >
    //       {readingTime(post.body.raw).text}
    //     </p>
    //   </div>

    //   )}

    //   <div className="mb-10 mt-0 border-t-2 border-dashed border-gray-300 dark:border-gray-800" />

    //   {post.body.raw.length === 0 ? (
    //     <p>The project detail is in process to be made.</p>
    //   ) : (
    //     <Mdx code={post.body.code} />
    //   )}

    //   <div className="mb-10 mt-10 border-t-2 border-dashed border-gray-300 dark:border-gray-800" />

    //   <div>
    //     <p
    //       className={cn(
    //         "mb-0 text-base font-semibold sm:text-lg",
    //         "font-display",
    //       )}
    //     >
    //       Tags:
    //     </p>
    //     <div className="flex flex-wrap gap-3">
    //       {post.tags.map((tag) => (
    //         <Link
    //           key={tag}
    //           href={`/tag/${tag}`}
    //           className={cn(
    //             "rounded-md bg-text/80 px-2 py-1 text-background duration-150 hover:opacity-70",
    //             "font-display",
    //           )}
    //         >
    //           {tag}
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </article>
    <Article lang="id">
      <ArticleHeader>
        <h1
          className={cn(
            "font-display text-2xl font-semibold text-primary sm:text-3xl",
          )}
        >
          {post.title} ({post.company})
        </h1>
        {post.description && (
          <p className={cn("text-base sm:text-lg")}>{post.description}</p>
        )}
        <div className="flex h-auto items-center gap-3 sm:gap-7">
          <p
            className={cn(
              "font-display text-base font-semibold text-slate-500 sm:text-lg",
            )}
          >
            {displayYear}
          </p>
          <div className="h-2 w-2 rounded-full bg-accent" />
          <p
            className={cn(
              "font-display text-base font-semibold text-slate-500 sm:text-lg",
            )}
          >
            {readingTime(post.body.raw).text}
          </p>
        </div>
        {post.link && (
          <h4 className={cn("font-semibold")}>
            <span className="font-display">Link:</span>{" "}
            <Link
              href={post.link}
              target="_blank"
              className="inline h-fit underline decoration-foreground underline-offset-2 duration-150 hover:opacity-80"
            >
              {post.link}
            </Link>
          </h4>
        )}
      </ArticleHeader>

      <ArticleContent>
        <Mdx code={post.body.code} />
      </ArticleContent>

      <ArticleFooter>
        <p className={cn("font-display text-base font-semibold sm:text-lg")}>
          Tags:
        </p>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </ArticleFooter>
    </Article>
  );
}
