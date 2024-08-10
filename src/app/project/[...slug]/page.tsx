import { projects } from ".velite";
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
import { LuArrowLeft } from "react-icons/lu";
import { MotionDiv } from "@/lib/framer-motion";
import DivFadeIn from "@/app/_components/DivFadeIn";

interface PostProps {
  params: {
    slug: string[];
  };
}

function getProjectFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = projects.find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}

export function generateMetadata({ params }: PostProps): Metadata {
  const project = getProjectFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
  };
}

// You can comment this if you want to show loading states
export function generateStaticParams(): PostProps["params"][] {
  return projects.map((project) => ({
    slug: [project.slug],
  }));
}

export default function PostPage({ params }: PostProps) {
  const post = getProjectFromParams(params);

  if (!post) {
    notFound();
  }

  const startYear = post.startDate.split("-")[0];
  const endYear = post.endDate?.split("-")[0] ?? "Present";
  const displayYear =
    startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    <DivFadeIn>
      <Article lang="id">
        <ArticleHeader>
          <Link
            href="/project"
            className="-mt-4 mb-6 flex w-fit items-center gap-1 text-sm leading-tight opacity-60 duration-150 hover:opacity-100"
          >
            <LuArrowLeft className="size-4" /> See all projects
          </Link>
          <h1
            className={cn(
              "font-display text-2xl font-semibold text-primary sm:text-3xl",
            )}
          >
            {post.title} ({post.team})
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
              {readingTime(post.raw).text}
            </p>
          </div>
          {post.link && (
            <h4 className={cn("font-semibold")}>
              <span className="font-display">Link:</span>{" "}
              <Link
                href={post.link}
                target="_blank"
                className="inline h-fit text-sm underline decoration-foreground underline-offset-2 duration-150 hover:opacity-80"
              >
                {post.link}
              </Link>
            </h4>
          )}
          {post.repo && (
            <h4 className={cn("font-semibold")}>
              <span className="font-display">Repo:</span>{" "}
              <Link
                href={post.repo}
                target="_blank"
                className="inline h-fit text-sm underline decoration-foreground underline-offset-2 duration-150 hover:opacity-80"
              >
                {post.repo}
              </Link>
            </h4>
          )}
        </ArticleHeader>

        <ArticleContent>
          <Mdx code={post.mdx} />
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
    </DivFadeIn>
  );
}
