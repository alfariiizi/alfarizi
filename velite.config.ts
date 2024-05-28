import GithubSlugger from "github-slugger";
import { defineCollection, defineConfig, s } from "velite";
import { rehypePlugins } from "./src/mdx-plugins/rehype-plugins";
import { remarkPlugins } from "./src/mdx-plugins/remark-plugins";

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const icon = s.enum(["github", "instagram", "medium", "twitter", "youtube"]);
const count = s
  .object({ total: s.number(), posts: s.number() })
  .default({ total: 0, posts: 0 });

const tags = defineCollection({
  name: "Tag",
  pattern: "tags/index.yml",
  schema: s
    .object({
      name: s.string().max(20),
      slug: s.slug("global", ["admin", "login"]),
      cover: s.image().optional(),
      description: s.string().max(999).optional(),
      count,
    })
    .transform((data) => ({ ...data, permalink: `/${data.slug}` })),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("global", ["admin", "login"]),
      body: s.mdx(),
    })
    .transform((data, { meta }) => ({
      ...data,
      permalink: `/${data.slug}`,
      path: meta.path,
    })),
});

const meta = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    keywords: s.array(s.string()).optional(),
  })
  .default({});

// const posts = defineCollection({
//   name: "Post",
//   pattern: "posts/**/*.md",
//   schema: s
//     .object({
//       title: s.string().max(99),
//       slug: s.slug("post"),
//       date: s.isodate(),
//       updated: s.isodate().optional(),
//       cover: s.image().optional(),
//       video: s.file().optional(),
//       description: s.string().max(999).optional(),
//       draft: s.boolean().default(false),
//       featured: s.boolean().default(false),
//       categories: s.array(s.string()).default(["Journal"]),
//       tags: s.array(s.string()).default([]),
//       meta: meta,
//       toc: s.toc(),
//       metadata: s.metadata(),
//       excerpt: s.excerpt(),
//       content: s.markdown(),
//     })
//     .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
// });

// Regular expression to match the pattern
// It captures the text within the square brackets as the first group
// and the text within the parentheses as the second group
const regex = /\[([^\]]+)]\(([^)]+)\)/;

// [Old post metadata]
// const postMetadata = defineCollection({
//   name: "PostMetadata",
//   pattern: "blog/**/metadata.yaml",
//   schema: s
//     .object({
//       title: s.string().max(99),
//       description: s.string().max(999),
//       date: s.isodate(),
//       icon: s.string(),
//       toc: s.boolean().default(false),
//       tags: s.string().array().default([]),
//       rcc: s.boolean().default(false), // client component
//       bib: s.string().array().default([]), // bibliography
//     })
//     .transform((data) => {
//       const slugger = new GithubSlugger();
//       const slug = slugger.slug(data.title);
//       return {
//         ...data,
//         slug,
//         permalink: `/blog/${slug}`,
//       };
//     })
//     .transform((data) => {
//       const bib = data.bib.map((b) => {
//         const result = b.match(regex);
//         return {
//           text: result?.[1],
//           link: result?.[2],
//         };
//       });
//       return {
//         ...data,
//         bib,
//       };
//     })
//     .transform((data) => {
//       const dateNow = new Date();
//       const datePost = new Date(data.date);
//
//       // Menghitung selisih dalam milidetik
//       const difference = dateNow.getTime() - datePost.getTime();
//
//       // Mengubah milidetik menjadi hari
//       const dayDifference = difference / (1000 * 60 * 60 * 24);
//
//       return {
//         ...data,
//         isNew: dayDifference < 14,
//       };
//     }),
// });

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/index.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      icon: s.string(),
      toc: s.boolean().default(false),
      tags: s.string().array().default([]),
      rcc: s.boolean().default(false), // client component
      bib: s.string().array().default([]), // bibliography
      mdx: s.mdx({ gfm: true }),
      raw: s.raw(),
    })
    .transform((data) => {
      const slugger = new GithubSlugger();
      const slug = slugger.slug(data.title);
      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
      };
    })
    .transform((data) => {
      const bib = data.bib.map((b) => {
        const result = b.match(regex);
        return {
          text: result?.[1],
          link: result?.[2],
        };
      });
      return {
        ...data,
        bib,
      };
    })
    .transform((data) => {
      const dateNow = new Date();
      const datePost = new Date(data.date);

      // Menghitung selisih dalam milidetik
      const difference = dateNow.getTime() - datePost.getTime();

      // Mengubah milidetik menjadi hari
      const dayDifference = difference / (1000 * 60 * 60 * 24);

      return {
        ...data,
        isNew: dayDifference < 14,
      };
    })
    .transform((data) => {
      const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const slugger = new GithubSlugger();
      const raw = data.raw;
      const headings = Array.from(raw.matchAll(regXHeader)).map(
        ({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          const flagLevel = [
            "one",
            "two",
            "three",
            undefined,
            undefined,
            undefined,
          ];

          return {
            level: flag?.length ? flagLevel[flag.length - 1] : undefined,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        },
      );

      return {
        ...data,
        headings,
      };
    }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "project/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      company: s.string().max(99),
      description: s.string().max(999),
      tech: s.string().max(99),
      link: s.string().url().optional(),
      repo: s.string().url().optional(),
      startDate: s.isodate(),
      endDate: s.isodate().optional(),
      icon: s.string(),
      tags: s.string().array().default([]),
      mdx: s.mdx({ gfm: true }),
      raw: s.raw(),
    })
    .transform((data) => {
      const slugger = new GithubSlugger();
      const slug = slugger.slug(data.title);
      return {
        ...data,
        slug,
        permalink: `/project/${slug}`,
      };
    }),
  // .transform(async (data) => {
  //   const base64 = await getBase64(`${env.NEXT_PUBLIC_URL}${data.icon}`);
  //   return {
  //     ...data,
  //     blurData: base64,
  //   };
  // }),
});

export default defineConfig({
  root: "public/content",
  output: {
    data: ".velite",
    // assets: "public/static",
    // base: "/static/",
    // name: "[name]-[hash:6].[ext]",
    // clean: true,
  },
  collections: { tags, pages, posts, projects },
  mdx: {
    // @ts-ignore
    remarkPlugins,
    // @ts-ignore
    rehypePlugins,
  },
  // prepare: ({ tags, posts }) => {
  //   const docs = posts.filter(
  //     (i) => process.env.NODE_ENV !== "production" || !i.draft,
  //   );

  //   // missing categories, tags from posts or courses inlined
  //   // const categoriesFromDoc = Array.from(new Set(docs.map(item => item.categories).flat())).filter(i => categories.find(j => j.name === i) == null)
  //   // categories.push(...categoriesFromDoc.map(name => ({ name, slug: slugify(name), permalink: '', count: { total: 0, posts: 0 } })))
  //   // categories.forEach(i => {
  //   //   i.count.posts = posts.filter(j => j.categories.includes(i.name)).length
  //   //   i.count.total = i.count.posts
  //   //   i.permalink = `/${i.slug}`
  //   // })

  //   const tagsFromDoc = Array.from(
  //     new Set(docs.map((item) => item.tags).flat()),
  //   ).filter((i) => tags.find((j) => j.name === i) == null);
  //   tags.push(
  //     ...tagsFromDoc.map((name) => ({
  //       name,
  //       slug: slugify(name),
  //       permalink: "",
  //       count: { total: 0, posts: 0 },
  //     })),
  //   );
  //   tags.forEach((i) => {
  //     i.count.posts = posts.filter((j) => j.tags.includes(i.name)).length;
  //     i.count.total = i.count.posts;
  //     i.permalink = `/${i.slug}`;
  //   });

  //   // return false // return false to prevent velite from writing data to disk
  // },
});
