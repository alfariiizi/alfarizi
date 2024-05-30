import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import TechItem from "./_components/TechItem";

export const metadata: Metadata = {
  title: "Tech",
  description:
    "Explore the technologies I'm proficient in, including web development, computer graphics, data science, and data analysis.",
};

const webDevList: string[] = [
  "reactjs",
  "nextjs",
  "tailwindcss",
  "radix-ui",
  "shadcn-ui",
  "react-query",
  "zod",
  "next-auth",
  "prisma",
  "turso",
  "trpc",
];

const cgList: string[] = ["cpp", "vulkan-api"];

const dataList: string[] = [
  "python",
  "pandas",
  "matplotlib",
  "seaborn",
  "scikit-learn",
];

export default function page() {
  return (
    <Maxwidthdiv className="mb-10 mt-10 flex max-w-4xl flex-col gap-8">
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-bold text-primary">
          Tech 🧰
        </h1>
      </div>

      {/* List Tech */}
      <div className="mx-auto flex max-w-3xl flex-col">
        {/* Web Development */}
        <TechItem heading="Web Development" techList={webDevList}>
          <p>
            I will divide this section into 3, namely the framework, styling
            libraries, and other libraries used in the framework.
          </p>
          <p>
            For{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-400">
              framework
            </span>
            , I usually use Nextjs. I personally quite like the React Server
            Component, so the Nextjs I use is Nextjs App Router.
          </p>
          <p>
            For{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-400">
              styling
            </span>
            , I usually use TailwindCSS. For component level styling I use
            Shadcn-UI which is a combination of several unstyled libraries such
            as Radix-UI combined with TailwindCSS.
          </p>
          <p>
            <span className="font-semibold text-zinc-800 dark:text-zinc-400">
              Other libraries
            </span>{" "}
            that I usually use in Nextjs framework are: tRPC, React-Query, Zod,
            and Nextauth.
          </p>
        </TechItem>
        {/* Computer Graphics */}
        <TechItem heading="Computer Graphics" techList={cgList}>
          <p>
            Computer graphics is an interesting topic. I use C++ with the Vulkan
            API to render things on the computer. This use of C++ is because C++
            is the first programming language I learned.
          </p>
        </TechItem>

        {/* Data Science / Data Analyst */}
        <TechItem heading="Data Science and Data Analysis" techList={dataList}>
          <p>
            Apart from web development and computer graphics, in my spare time,
            I sometimes do data processing and data modeling. The main language
            I use on DS/DA is Python. For data processing, I use Pandas. For
            data visualization, I use Matplotlib and Seaborn. As for modeling,
            so far I have used a simple model from Scikit-Learn.
          </p>
        </TechItem>

        {/* Scripting */}
        <TechItem heading="Scripting" techList={["python", "bash", "zsh"]}>
          <p>
            For scripting, I usually use python, bash script or zsh script. Most
            of the time I just use python. I do bash/zsh script if needed, but
            for me, python is really simple to write.
          </p>
        </TechItem>

        {/* System */}
        <TechItem heading="System" techList={["manjaro", "arch", "hyprland"]}>
          <p>
            It is been years that I use Manjaro. I like that Manjaro is Arch
            Based Distro, so it have access to AUR Package, and also Manjaro has
            easier installation than Arch. For desktop environment, I use tiling
            window manager called Hyprland.
          </p>
        </TechItem>

        {/* Code editor */}
        <TechItem heading="Code Editor" techList={["neovim", "vim", "vscode"]}>
          <p>
            Most of the time, I use Neovim or Vim. But when I need more UI
            feature like example REPL in Jupyter Notebook, I will use VSCode.
          </p>
        </TechItem>
      </div>
    </Maxwidthdiv>
  );
}
