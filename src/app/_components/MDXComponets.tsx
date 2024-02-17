import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  // eslint-disable-next-line
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
