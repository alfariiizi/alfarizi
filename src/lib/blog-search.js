/**
 * @template {{ title: string }} T
 * @param {T[]} posts
 * @param {string | undefined} query
 */
export function filterPostsBySearchQuery(posts, query) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  if (!normalizedQuery) {
    return [...posts];
  }

  return posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedQuery),
  );
}
