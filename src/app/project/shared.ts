import { projects } from ".velite/index";

export const bookmarkProjectTitle = [
  "[This Site] Personal Website",
  "Robota",
  "Windsight",
];

export const sortedDateeProjects = projects.sort((a, b) =>
  new Date(a.startDate) > new Date(b.startDate) ? -1 : 1,
);

export const bookmarkProject = bookmarkProjectTitle.map(
  (item) => projects.find((f) => f.title === item)!,
);
export const notBookmarkProject = sortedDateeProjects.filter((item) =>
  bookmarkProjectTitle.every((s) => s !== item.title),
);

export const sortedProjects = [...bookmarkProject, ...notBookmarkProject];
