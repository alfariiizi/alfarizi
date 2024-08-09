import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import rehypeStringify from "rehype-stringify";

/* eslint-disable */

export const rehypePlugins = [
  () => (tree: any) => {
    visit(tree, (node) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const [codeEl] = node.children;

        if (codeEl.tagName !== "code") return;

        node.raw = codeEl.children?.[0].value;
      }
    });
  },
  rehypeSlug,
  rehypeKatex,
  rehypeAutolinkHeadings,
  [
    rehypePrettyCode,
    {
      grid: true,
      theme: "tokyo-night",
      keepBackground: true,
    },
  ],
  rehypeStringify,
];

export default rehypePlugins;
