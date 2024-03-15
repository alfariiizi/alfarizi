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
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-[20%]" />
            <Skeleton className="h-6 w-[35%]" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[20%]" />
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[35%]" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[35%]" />
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[20%]" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-[20%]" />
            <Skeleton className="h-6 w-[35%]" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[20%]" />
            <Skeleton className="h-6 w-[35%]" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[40%]" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[35%]" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-[20%]" />
          </div>
          <div className="flex w-full gap-1 md:gap-3">
            <Skeleton className="h-6 w-[35%]" />
            <Skeleton className="h-6 w-[20%]" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[40%]" />
          </div>
        </div>
      ),
    },
  );

  return <Mdx />;
}
