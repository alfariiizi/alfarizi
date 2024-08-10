import Image from "next/image";
import Link from "next/link";
import { projects } from ".velite/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Tag from "@/app/_components/Tag";
import { LuBookmark } from "react-icons/lu";
import { capitalize } from "@/lib/utils";

const bookmarkProjectTitle = [
  "[This Site] Personal Website",
  "Robota",
  "Windsight",
];

const sortedDateeProjects = projects.sort((a, b) =>
  new Date(a.startDate) > new Date(b.startDate) ? -1 : 1,
);

// const bookmarkProject = projects.filter((item) =>
//   bookmarkProjectTitle.some((s) => s === item.title),
// );
const bookmarkProject = bookmarkProjectTitle.map(
  (item) => projects.find((f) => f.title === item)!,
);
const notBookmarkProject = sortedDateeProjects.filter((item) =>
  bookmarkProjectTitle.every((s) => s !== item.title),
);
const sortedProjects = [...bookmarkProject, ...notBookmarkProject];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-24 lg:grid-cols-3">
      {sortedProjects.map((project) => (
        <ProjectItem key={project.title} project={project} />
      ))}
    </div>
  );
}

type ProjectItemProps = {
  project: (typeof projects)[0];
};

function ProjectItem({ project }: ProjectItemProps) {
  const startYear = project.startDate.split("-")[0];
  const endYear = project.endDate?.split("-")[0] ?? "Present";
  const displayYear =
    startYear === endYear ? startYear : `${startYear} - ${endYear}`;

  return (
    <Link href={project.permalink} className="group" prefetch={false}>
      <Card className="relative h-full rounded-md px-3 pb-3 pt-1">
        {bookmarkProjectTitle.some((s) => s === project.title) && (
          <LuBookmark className="absolute right-0 top-0 z-20 size-7 fill-accent" />
        )}
        <CardContent className="flex h-full flex-col justify-between gap-6 p-0 py-0">
          <div className="flex flex-col gap-4">
            <div className="group relative aspect-video w-full transition-all duration-300">
              <Image
                src={project.image.src}
                alt={project.title}
                width={
                  project.image.width > 512
                    ? project.image.width * 0.4
                    : project.image.width
                }
                height={
                  project.image.height > 512
                    ? project.image.height * 0.4
                    : project.image.height
                }
                quality={50}
                placeholder={
                  project.image.blurDataURL.length !== 0 ? "blur" : "empty"
                }
                blurDataURL={project.image.blurDataURL}
                className="aspect-video w-full rounded-sm object-cover opacity-100 duration-300 group-hover:opacity-20"
              />
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent opacity-0 duration-300 group-hover:opacity-100">
                <p>Click to view</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-semibold text-primary sm:text-xl">
                {project.title}
              </h3>
              <p className="font-sans text-sm leading-normal text-muted-foreground sm:text-base">
                {project.description}
              </p>
              <p className="text-sm text-accent">
                {project.isPersonalProject
                  ? "Personal Project"
                  : `Created with ${project.team}`}
              </p>
              {project.position && (
                <p className="text-sm text-muted-foreground">
                  as {capitalize(project.position)}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Created from {displayYear}
              </p>
              <div className="my-3 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                    className="font-sans text-xs sm:text-sm"
                  />
                ))}
              </div>
            </div>
          </div>
          <Button variant="link" className="justify-start p-0">
            View Project
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
