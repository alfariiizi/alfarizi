import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { getPostFromParams, type PostProps } from "./lib/getPostFromParams";

export default async function Page({ params }: PostProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const Mdx = dynamic(
    () => import(`/content/blog/${post.metadata.slug}/index.mdx`),
    {
      loading: () => (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ),
    },
  );

  return <Mdx />;
}
