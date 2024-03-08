import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { Callout } from "./Callout";
import { Image } from "./Image";
import { elements } from "./basic-element";

const components = {
  Image,
  Callout,
  Link,
  ...elements,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
