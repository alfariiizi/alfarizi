import { allTagsRaw } from "@/lib/tags";
import { type Metadata } from "next";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import DivFadeIn from "../_components/DivFadeIn";

export const metadata: Metadata = {
  title: "Tag",
  description:
    "Explore all tags that I use in my blogpost and in my project details.",
};

export default function page() {
  const allTags: { name: string; total: number }[] = [];

  allTagsRaw.forEach((tag) => {
    // If key found in the object
    const index = allTags.findIndex((f) => f.name === tag);
    if (index > -1) {
      allTags[index]!.total += 1;
    }
    // If key not found in the object
    else {
      allTags.push({ name: tag, total: 1 });
    }
  });

  // Sort by total -> Sort by name (if the total is same)
  allTags.sort((a, b) => {
    // Sort by name
    if (a.total === b.total) {
      return a.name > b.name ? 1 : -1;
    }

    // Sort by total
    return b.total - a.total;
  });

  return (
    <DivFadeIn>
      <Maxwidthdiv className="my-10 flex flex-col gap-14">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-4xl font-bold text-primary">
            Tags 🎯
          </h2>
          <p className="max-w-[800px]">
            All tags that I use in my blogpost or in my projects. You can click
            the tag and see all related blogpost or projects that use the tag.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          {allTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tag/${tag.name}`}
              className="border-text/80 flex items-center gap-1 rounded-full border-2 bg-background px-2 py-1 duration-150 hover:opacity-70"
            >
              <p className="font-medium">{tag.name}</p>
              <div className="flex aspect-square h-6 items-center justify-center rounded-full bg-accent p-2 sm:h-7 sm:min-w-7">
                <p className="text-accent-foreground">{tag.total}</p>
              </div>
            </Link>
          ))}
        </div>
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
