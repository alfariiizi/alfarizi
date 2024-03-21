import { Callout } from "@/components/mdx/Callout";
import { Image } from "@/components/mdx/Image";
import { Math } from "@/components/mdx/Math";
import { elements } from "@/components/mdx/basic-element";
// import CounterDemo from "@content/blog/CounterDemo";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Excalidraw from "./components/excalidraw";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image,
    Callout,
    Link,
    Math,
    Excalidraw,
    ...elements,
    ...components,
  };
}
