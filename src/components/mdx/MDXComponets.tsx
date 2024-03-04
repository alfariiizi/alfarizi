import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { Alert } from "./Alert";
import { Image } from "./Image";
import { elements } from "./basic-element";

const components = {
  Image,
  Alert,
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
