import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { allTagsRaw } from "./_lib/allTags";

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
    <Maxwidthdiv className="mb-10 mt-10 flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-4xl font-bold text-primary">
          Tags 🎯
        </h2>
        <p className="font-display max-w-[800px]">
          All tags that I use in my blogpost or in my projects. You can click
          the tag and see all related blogpost or projects that use the tag.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {allTags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tag/${tag.name}`}
            className="flex items-center gap-1 rounded-full border-2 border-text bg-background px-2 py-1 opacity-70 duration-150 hover:opacity-100"
          >
            <p className="font-medium">{tag.name}</p>
            <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-secondary p-2">
              <p className="text-text">{tag.total}</p>
            </div>
          </Link>
        ))}
      </div>
    </Maxwidthdiv>
  );
}
