import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";
import GithubSlugger from "github-slugger";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOption,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { env } from "./src/env";
import { getBase64 } from "./src/lib/getBase64";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const slugger = new GithubSlugger();
      const raw = doc.body.raw as string;
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

      return headings;
    },
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    icon: {
      type: "string",
    },
    toc: {
      type: "boolean",
      default: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `project/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    company: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    tech: {
      type: "string",
      required: true,
    },
    link: {
      type: "string",
    },
    startDate: {
      type: "date",
      required: true,
    },
    endDate: {
      type: "date",
    },
    icon: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    toc: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: {
    blurData: {
      type: "string",
      resolve: async (doc) => {
        const base64 = await getBase64(`${env.NEXT_PUBLIC_URL}${doc.icon}`);
        return base64;
      },
    },
    ...computedFields,
  },
}));

const rehypePrettyCodeOption: RehypePrettyCodeOption = {
  grid: true,
  theme: "dark-plus",
  keepBackground: false,
};

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        // eslint-disable-next-line
        // @ts-ignore
        rehypePrettyCode,
        rehypePrettyCodeOption,
      ],
    ],
  },
});
