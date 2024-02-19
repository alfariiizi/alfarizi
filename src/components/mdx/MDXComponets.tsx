import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { Alert } from "./Alert";
import { Image } from "./Image";

const components = {
  Image,
  Alert,
  Link,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
