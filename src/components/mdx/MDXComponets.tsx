import Link from "next/link";
import * as runtime from "react/jsx-runtime";
import { Excalidraw } from "../excalidraw";
import { Callout } from "./Callout";
import { Image } from "./Image";
import { Math } from "./Math";
import { elements } from "./basic-element";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-implied-eval */

export function generatePath(filename: string) {
  return `/content/blog/mengapa-kita-perlu-menggunakan-react-server-component/${filename}`;
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const mdxComponents = {
  Image,
  Callout,
  Link,
  Math,
  Excalidraw,
  ...elements,
  generatePath,
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const Mdx = ({ code, components }: MdxProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
};

// export function Mdx({ code }: MdxProps) {
//   const Component = useMDXComponent(code);

//   return <Component components={components} />;
// }
