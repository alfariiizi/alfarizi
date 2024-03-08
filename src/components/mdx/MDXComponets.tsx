import CounterDemo from "@content/blog/CounterDemo";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { Callout } from "./Callout";
import { Image } from "./Image";
import { Math } from "./Math";
import { elements } from "./basic-element";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const components = {
  Image,
  Callout,
  Link,
  Math,
  ...elements,
  CounterDemo,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
