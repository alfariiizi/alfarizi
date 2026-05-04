import { sortProjectsByStartDate } from "@/lib/content-utils.js";
import { projects } from ".velite/index";

export const bookmarkProjectTitle = [
  "[This Site] rizalalfarizi.com",
  "Robota",
  "Windsight",
];

export const sortedDateeProjects = sortProjectsByStartDate(projects);

export const bookmarkProject = bookmarkProjectTitle.map(
  (item) => projects.find((f) => f.title === item)!,
);
export const notBookmarkProject = sortedDateeProjects.filter((item) =>
  bookmarkProjectTitle.every((s) => s !== item.title),
);

export const sortedProjects = [...bookmarkProject, ...notBookmarkProject];
