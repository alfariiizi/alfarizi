import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export const rehypePlugins = [
  rehypeSlug,
  rehypeKatex,
  [
    rehypePrettyCode,
    {
      grid: true,
      theme: "dark-plus",
      keepBackground: false,
    },
  ],
];

export default rehypePlugins;
