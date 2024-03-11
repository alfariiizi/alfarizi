import { allPosts, allProjects } from ".contentlayer/generated";
import { Maxwidthdiv } from "@/app/_components/Maxwindthdiv";
import { allTags } from "@/lib/tags";
import "@/styles/content.css";
import { type Metadata } from "next";
import Link from "next/link";
import { PiWarningOctagonFill } from "react-icons/pi";

type From = "Project" | "Blog";

type Content = {
  title: string;
  description?: string;
  slug: string;
  from: From;
};

type Props = {
  params: {
    tag: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Tag: ${params.tag}`,
  };
}

export function generateStaticParams() {
  return allTags.map((tag) => ({
    tag,
  }));
}

export default function page({ params }: Props) {
  const contents: Content[] = [
    ...allProjects
      .filter((f) => f.tags.includes(params.tag))
      .map(
        (project) =>
          ({
            title: project.title,
            description: project.description,
            slug: project.slug,
            from: "Project",
          }) as Content,
      ),
    ...allPosts
      .filter((f) => f.tags.includes(params.tag))
      .map(
        (post) =>
          ({
            title: post.title,
            description: post.description,
            slug: post.slug,
            from: "Blog",
          }) as Content,
      ),
  ];

  contents.sort((a, b) => (a.title > b.title ? 1 : -1));

  return (
    <Maxwidthdiv className="mb-10 mt-10 flex max-w-[800px] flex-col gap-16">
      <h2 className="font-display text-4xl font-bold text-primary">
        Tags:{" "}
        <span className="underline decoration-secondary underline-offset-[6px]">
          {params.tag}
        </span>
      </h2>
      {contents.length === 0 ? (
        <div className="flex gap-3 rounded-md border-2 border-red-900 bg-red-200 px-3 py-2 text-red-900 dark:border-red-100 dark:bg-red-950 dark:text-red-100 md:items-center">
          <PiWarningOctagonFill className="size-6 min-w-6" />
          <p className="min-w-0">
            There are no projects or posts that use this tag yet. See{" "}
            <Link
              href="/tag"
              className="underline decoration-2 underline-offset-2 duration-150 hover:opacity-75"
            >
              other tags
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="ml-[6%] flex flex-col gap-8">
          {contents.map((content) => (
            <div key={content.slug}>
              <Link
                href={content.slug}
                className="font-display text-xl font-semibold text-primary duration-150 hover:opacity-70"
              >
                {content.title}
              </Link>
              {content.description && <p>{content.description}</p>}
              <p className="text-sm">
                From:{" "}
                <span className="font-semibold text-secondary">
                  {content.from}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </Maxwidthdiv>
  );
}
