import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import TechItem from "./_components/TechItem";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "A practical list of the tools and technologies I reach for most often.",
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
        <h1 className="font-display text-4xl font-bold text-primary">Tools</h1>
        <p className="max-w-3xl leading-7 text-muted-foreground">
          A practical list of the tools and technologies I reach for most
          often. The stack changes when the work asks for it, but the standard
          stays the same: keep it clear, maintainable, and useful.
        </p>
      </div>

      {/* List Tech */}
      <div className="mx-auto flex max-w-3xl flex-col">
        {/* Web Development */}
        <TechItem heading="Web Development" techList={webDevList}>
          <p>
            My default stack is Next.js, TypeScript, and Tailwind CSS. I use it
            when I want a balance of speed, structure, and long-term
            maintainability.
          </p>
          <p>
            For component work, I lean on shadcn/ui and Radix because they stay
            flexible without adding much ceremony.
          </p>
          <p>
            When a project needs data fetching, validation, or auth, I usually
            reach for tRPC, React Query, Zod, NextAuth, Prisma, and Turso.
          </p>
        </TechItem>
        {/* Computer Graphics */}
        <TechItem heading="Computer Graphics" techList={cgList}>
          <p>
            For graphics work, I use C++ and Vulkan when I need direct control
            over performance and rendering behavior.
          </p>
        </TechItem>

        {/* Data Science / Data Analyst */}
        <TechItem heading="Data Science and Data Analysis" techList={dataList}>
          <p>
            For data work, Python is usually enough. Pandas handles shaping the
            data, Matplotlib and Seaborn handle the visuals, and scikit-learn
            covers lightweight modeling.
          </p>
        </TechItem>

        {/* Scripting */}
        <TechItem heading="Scripting" techList={["python", "bash", "zsh"]}>
          <p>
            For quick automation, I prefer Python. Shell scripts still have a
            place, but only when the work belongs closer to the terminal.
          </p>
        </TechItem>

        {/* System */}
        <TechItem heading="System" techList={["manjaro", "arch", "hyprland"]}>
          <p>
            I have used Arch-based systems and Hyprland for years. I like a
            setup that stays fast, predictable, and out of the way.
          </p>
        </TechItem>

        {/* Code editor */}
        <TechItem heading="Code Editor" techList={["neovim", "vim", "vscode"]}>
          <p>
            Neovim is my default editor. VSCode is useful when the job calls for
            a heavier interface or better built-in tooling.
          </p>
        </TechItem>
      </div>
    </Maxwidthdiv>
  );
}
