/**
 * @template {{ date: string }} T
 * @param {T[]} posts
 */
export function sortPostsByDate(posts) {
  return [...posts].sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );
}

/**
 * @template {{ startDate: string }} T
 * @param {T[]} projects
 */
export function sortProjectsByStartDate(projects) {
  return [...projects].sort((a, b) =>
    new Date(a.startDate) > new Date(b.startDate) ? -1 : 1,
  );
}
