import CppLogo from "@public/images/tools/cpp.png";
import JsLogo from "@public/images/tools/javascript.png";
import JuliaLogo from "@public/images/tools/julia.png";
import NextjsLogo from "@public/images/tools/nextjs.png";
import PythonLogo from "@public/images/tools/python.png";
import ReactjsLogo from "@public/images/tools/reactjs.png";
import TailwindLogo from "@public/images/tools/tailwindcss.png";
import TsLogo from "@public/images/tools/typescript.png";
import VulkanLogo from "@public/images/tools/vulkan.png";
import { type StaticImageData } from "next/image";

export const allToolTags = [
  "programming-language",
  "web-development",
  "styling",
  "data-science",
  "data-analyst",
  "computer-graphics",
] as const;

// export type Tag =
// | "programming-language"
//   | "web-development"
//   | "styling"
//   | "data-science"
//   | "data-analyst"
//   | "computer-graphics";
export type Tag = (typeof allToolTags)[number];

type Tool = {
  label: string;
  image: {
    src: StaticImageData;
    width: number;
    height: number;
  };
  tags: Tag[];
};

export const tools: Tool[] = [
  // {
  //   label: "C-Programming",
  //   image: {
  //     src: CLogo,
  //     width: 35,
  //     height: 35,
  //   },
  //   tags: ["programming-language", "computer-graphics"],
  // },
  {
    label: "C++",
    image: {
      src: CppLogo,
      width: 35,
      height: 35,
    },
    tags: ["programming-language", "computer-graphics"],
  },
  {
    label: "Python",
    image: {
      src: PythonLogo,
      width: 35,
      height: 35,
    },
    tags: ["programming-language", "data-analyst", "data-science"],
  },
  {
    label: "Javascript",
    image: {
      src: JsLogo,
      width: 35,
      height: 35,
    },
    tags: ["programming-language", "web-development"],
  },
  {
    label: "Typescript",
    image: {
      src: TsLogo,
      width: 35,
      height: 35,
    },
    tags: ["programming-language", "web-development"],
  },
  {
    label: "Julia",
    image: {
      src: JuliaLogo,
      width: 35,
      height: 35,
    },
    tags: ["programming-language"],
  },
  // {
  //   label: "HTML",
  //   image: {
  //     src: HtmlLogo,
  //     width: 35,
  //     height: 35,
  //   },
  //   tags: ["web-development"],
  // },
  // {
  //   label: "CSS",
  //   image: {
  //     src: CssLogo,
  //     width: 35,
  //     height: 35,
  //   },
  //   tags: ["web-development", "styling"],
  // },
  {
    label: "TailwindCSS",
    image: {
      src: TailwindLogo,
      width: 35,
      height: 35,
    },
    tags: ["web-development", "styling"],
  },
  {
    label: "Reactjs",
    image: {
      src: ReactjsLogo,
      width: 35,
      height: 35,
    },
    tags: ["web-development"],
  },
  {
    label: "Nextjs",
    image: {
      src: NextjsLogo,
      width: 35,
      height: 35,
    },
    tags: ["web-development"],
  },
  {
    label: "Vulkan API",
    image: {
      src: VulkanLogo,
      width: 80,
      height: 80,
    },
    tags: ["computer-graphics"],
  },
];
