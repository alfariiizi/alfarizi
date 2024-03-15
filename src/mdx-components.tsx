import { Callout } from "@/components/mdx/Callout";
import { Image } from "@/components/mdx/Image";
import { Math } from "@/components/mdx/Math";
import { elements } from "@/components/mdx/basic-element";
// import CounterDemo from "@content/blog/CounterDemo";
import type { MDXComponents, MDXContent } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image,
    Callout,
    Link,
    Math,
    ...elements,
    ...components,
  };
}

export function useMDXContent(content: MDXContent) {
  console.log({ content });
}
