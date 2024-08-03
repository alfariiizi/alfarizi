import { projects as allProjects, posts as allPosts } from ".velite";
import { env } from "@/env";
import { allTags } from "@/lib/tags";
import { type MetadataRoute } from "next";

function generateUrl(route: string) {
  if (route.startsWith("/")) {
    return `${env.APP_URL}${route}`;
  }
  return `${env.APP_URL}/${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: generateUrl(post.permalink),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const projects: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: generateUrl(project.permalink),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const tags: MetadataRoute.Sitemap = allTags.map((tag) => ({
    url: generateUrl(`/tag/${tag}`),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    // Home
    {
      url: env.APP_URL,
      changeFrequency: "monthly",
      priority: 1,
    },

    // Blog
    {
      url: generateUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts,

    // Project
    {
      url: generateUrl("/project"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projects,

    // Tag
    {
      url: generateUrl("/tag"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...tags,
  ];
}
