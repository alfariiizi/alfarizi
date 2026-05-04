import Link from "next/link";
import * as runtime from "react/jsx-runtime";
import { generateMdxAssetPath } from "@/lib/mdx-paths.js";
import { Excalidraw } from "../excalidraw";
import { Callout } from "./Callout";
import { Image as MdxImageComponent } from "./Image";
import { Math } from "./Math";
import { Tabs, TabsContent } from "@/components/mdx/Tabs";
import Caption from "./Caption";
import { elements } from "./basic-element";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-implied-eval */

const useMDXComponent = (code: string) => {
  // Velite emits trusted MDX runtime code as a string. Keep this evaluation
  // confined to build-generated content from `.velite`, never user input.
  const fn = new Function(code);
  return fn({ ...runtime, baseUrl: process.cwd() }).default;
};

interface MdxProps {
  code: string;
  assetDirectory?: string;
  components?: Record<string, React.ComponentType>;
}

export const Mdx = ({ code, assetDirectory, components }: MdxProps) => {
  const Component = useMDXComponent(code);
  const mdxComponents = {
    Image: (props: React.ComponentProps<typeof MdxImageComponent>) => (
      <MdxImageComponent {...props} assetDirectory={assetDirectory} />
    ),
    Callout,
    Link,
    Math,
    Excalidraw,
    Tabs,
    TabsContent,
    Caption,
    ...elements,
    generatePath: (filename: string) =>
      generateMdxAssetPath(assetDirectory, filename),
  };

  return <Component components={{ ...mdxComponents, ...components }} />;
};

// export function Mdx({ code }: MdxProps) {
//   const Component = useMDXComponent(code);

//   return <Component components={components} />;
// }
