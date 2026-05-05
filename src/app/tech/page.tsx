import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaBrain,
  FaBoxesStacked,
  FaDatabase,
  FaLayerGroup,
  FaShieldHalved,
} from "react-icons/fa6";
import {
  SiDocker,
  SiGo,
  SiGnubash,
  SiGit,
  SiKubernetes,
  SiLinux,
  SiNextdotjs,
  SiNeovim,
  SiOpenapiinitiative,
  SiPandas,
  SiPlaywright,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiRedis,
  SiScikitlearn,
  SiStreamlit,
  SiTailwindcss,
  SiTrpc,
  SiTurso,
  SiTypescript,
  SiVisualstudiocode,
  SiVitest,
  SiZod,
  SiZsh,
} from "react-icons/si";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import DivFadeIn from "../_components/DivFadeIn";
import {
  AsideBracketAnnotation,
  HeroLeadAnnotation,
  SectionEyebrowAnnotation,
  SectionTitleAnnotation,
} from "./_components/RoughTechAnnotations";

export const metadata: Metadata = {
  title: "Tech",
  description:
    "The stack I rely on most in production, from Go services and Next.js interfaces to Docker, Kubernetes, and data tooling.",
};

type Section = {
  title: string;
  eyebrow: string;
  summary: string;
  description: string[];
  tools: StackTool[];
  aside: string;
};

type StackTool = {
  name: string;
  icon?: IconType;
  mono?: string;
  tone?: "primary" | "neutral";
};

type FavoriteStackItem = StackTool & {
  className: string;
  iconClassName: string;
  toneClassName: string;
};

const favoriteStack: FavoriteStackItem[] = [
  {
    name: "Go",
    icon: SiGo,
    className: "col-span-2 row-span-2",
    iconClassName: "h-14 w-14 sm:h-16 sm:w-16",
    toneClassName: "text-primary",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    className: "col-span-2",
    iconClassName: "h-10 w-10 sm:h-11 sm:w-11",
    toneClassName: "text-foreground/88",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    className: "col-span-1",
    iconClassName: "h-9 w-9 sm:h-10 sm:w-10",
    toneClassName: "text-primary",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    className: "col-span-1",
    iconClassName: "h-9 w-9 sm:h-10 sm:w-10",
    toneClassName: "text-foreground/82",
  },
  {
    name: "Docker",
    icon: SiDocker,
    className: "col-span-2",
    iconClassName: "h-10 w-10 sm:h-11 sm:w-11",
    toneClassName: "text-primary",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    className: "col-span-2",
    iconClassName: "h-10 w-10 sm:h-11 sm:w-11",
    toneClassName: "text-foreground/84",
  },
];

const frontendTools: StackTool[] = [
  { name: "TypeScript", icon: SiTypescript, tone: "primary" },
  { name: "Next.js", icon: SiNextdotjs, tone: "neutral" },
  { name: "React", icon: SiReact, tone: "primary" },
  { name: "Tailwind CSS", icon: SiTailwindcss, tone: "primary" },
  { name: "shadcn/ui", icon: FaBoxesStacked, tone: "neutral" },
  { name: "Radix UI", icon: SiRadixui, tone: "neutral" },
  { name: "TanStack Query", icon: SiReactquery, tone: "primary" },
  { name: "Zustand", mono: "zt", tone: "neutral" },
  { name: "NextAuth", icon: FaShieldHalved, tone: "neutral" },
  { name: "tRPC", icon: SiTrpc, tone: "primary" },
  { name: "Zod", icon: SiZod, tone: "neutral" },
];

const backendTools: StackTool[] = [
  { name: "Go", icon: SiGo, tone: "primary" },
  { name: "DDD", icon: FaLayerGroup, tone: "neutral" },
  { name: "OpenAPI", icon: SiOpenapiinitiative, tone: "primary" },
  { name: "Docker", icon: SiDocker, tone: "neutral" },
  { name: "Kubernetes", icon: SiKubernetes, tone: "primary" },
  { name: "PostgreSQL", icon: SiPostgresql, tone: "neutral" },
  { name: "Prisma", icon: SiPrisma, tone: "primary" },
  { name: "Redis", icon: SiRedis, tone: "neutral" },
  { name: "Turso", icon: SiTurso, tone: "primary" },
  { name: "Linux", icon: SiLinux, tone: "neutral" },
  { name: "Git", icon: SiGit, tone: "primary" },
];

const dataTools: StackTool[] = [
  { name: "Python", icon: SiPython, tone: "primary" },
  { name: "Pandas", icon: SiPandas, tone: "neutral" },
  { name: "scikit-learn", icon: SiScikitlearn, tone: "primary" },
  { name: "Streamlit", icon: SiStreamlit, tone: "neutral" },
  { name: "Data analysis", icon: FaDatabase, tone: "neutral" },
  { name: "Machine learning", icon: FaBrain, tone: "primary" },
];

const opsTools: StackTool[] = [
  { name: "Vitest", icon: SiVitest, tone: "primary" },
  { name: "Playwright", icon: SiPlaywright, tone: "neutral" },
  { name: "Bash", icon: SiGnubash, tone: "neutral" },
  { name: "Zsh", icon: SiZsh, tone: "primary" },
  { name: "Neovim", icon: SiNeovim, tone: "neutral" },
  { name: "VS Code", icon: SiVisualstudiocode, tone: "primary" },
];

const sections: Section[] = [
  {
    title: "TypeScript product surfaces",
    eyebrow: "Default frontend stack",
    summary:
      "This is the part of the stack I reach for when the product surface needs to stay fast to build, easy to reason about, and stable after the first release.",
    description: [
      "Next.js with the App Router is the center of gravity. It gives me a clean way to mix server-first rendering, typed application code, and pragmatic delivery without turning the project into ceremony.",
      "Around that, I usually keep the UI layer restrained: Tailwind CSS for control, shadcn/ui and Radix UI for accessible primitives, then TanStack Query, Zustand, NextAuth, tRPC, and Zod when the product needs stronger client-state, auth, transport, or validation boundaries.",
    ],
    tools: frontendTools,
    aside:
      "Usually where product polish, frontend architecture, and day-to-day shipping meet.",
  },
  {
    title: "Go services and delivery",
    eyebrow: "Backend and systems work",
    summary:
      "The more a system needs clear boundaries, operational reliability, and predictable long-term behavior, the more likely I am to move toward Go and explicit service design.",
    description: [
      "The backend work I enjoy most is not just writing handlers. It is shaping services so the model stays understandable under pressure: domain boundaries that make sense, interfaces that age well, and deployment paths that do not become a source of drama later.",
      "That usually means Go, DDD-flavored service structure, OpenAPI-driven contracts, and infrastructure that is boring in the right way: Docker, Kubernetes, VPS environments, Linux, and familiar relational storage.",
    ],
    tools: backendTools,
    aside:
      "This is the layer I trust for systems that need to survive scale, change, and handoff.",
  },
  {
    title: "Data and applied AI",
    eyebrow: "When the problem is analytical",
    summary:
      "Python remains the tool I use when the work shifts from product flow into analysis, experiments, and lightweight machine learning.",
    description: [
      "I do not treat data work as a separate identity from engineering. It is another way of making decisions concrete: inspect the shape of the data, build the smallest useful model, and give the result an interface people can actually use.",
      "Most of that work stays practical. Pandas, scikit-learn, and Streamlit cover a lot when the goal is analysis, iteration, and clear delivery rather than research theater.",
    ],
    tools: dataTools,
    aside:
      "Best suited for analytical workflows, internal tools, and applied experimentation.",
  },
  {
    title: "Operational defaults",
    eyebrow: "Tools I keep close",
    summary:
      "A good stack is not only frameworks and runtimes. It is also the smaller tools that make execution cleaner, review easier, and maintenance less expensive.",
    description: [
      "For testing and reliability work, I prefer lightweight tools that pull their weight. Vitest and Playwright are usually enough for fast feedback and end-to-end confidence without inflating the setup.",
      "For day-to-day work, I still prefer the terminal as a first-class place to think. Bash, Zsh, Neovim, and VS Code all have their place, but I lean toward the tools that stay out of the way once the real work starts.",
    ],
    tools: opsTools,
    aside:
      "The supporting layer that keeps build speed, review quality, and iteration cadence healthy.",
  },
];

function StackBadge({
  tool,
  className,
  iconClassName,
}: {
  tool: StackTool;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = tool.icon;

  return (
    <div className={cn("group/stack relative", className)}>
      <div
        tabIndex={0}
        aria-label={tool.name}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-primary/10 shadow-[inset_0_1px_0_hsl(var(--background)/0.12)] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          tool.tone === "primary"
            ? "bg-primary/[0.07] text-primary"
            : "text-foreground/84 bg-background/75",
        )}
      >
        {Icon ? (
          <Icon className={cn("h-5 w-5", iconClassName)} />
        ) : (
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
            {tool.mono}
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+0.65rem)] opacity-0 transition-all duration-200 ease-out group-focus-within/stack:-translate-y-[calc(100%+0.85rem)] group-focus-within/stack:opacity-100 group-hover/stack:-translate-y-[calc(100%+0.85rem)] group-hover/stack:opacity-100">
        <div className="border-primary/12 rounded-full border bg-background/95 px-3 py-1 text-xs leading-none text-foreground shadow-sm">
          {tool.name}
        </div>
      </div>
    </div>
  );
}

function FavoriteStackPanel() {
  return (
    <aside className="border-primary/12 relative max-w-[22rem] overflow-hidden rounded-[2rem] border bg-primary/[0.03] p-5 sm:justify-self-end sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at top right, hsl(var(--primary) / 0.16), transparent 42%), radial-gradient(circle at bottom left, hsl(var(--accent) / 0.1), transparent 38%)",
        }}
      />

      <div className="relative space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
              Favorite stack
            </p>
            <p className="max-w-[16rem] text-sm leading-6 text-foreground/75">
              The stack I usually want closest when shipping product and service
              work.
            </p>
          </div>
          {/* <p className="pb-1 text-xs uppercase tracking-[0.2em] text-primary/80"> */}
          {/*   {favoriteStack.length} tools */}
          {/* </p> */}
        </div>

        <ul
          className="grid auto-rows-[4.75rem] grid-cols-4 gap-3"
          aria-label="Favorite stack"
        >
          {favoriteStack.map((item) => (
            <li key={item.name} className={item.className}>
              <StackBadge
                tool={item}
                iconClassName={item.iconClassName}
                className={cn(
                  "h-full w-full [&>div:first-child]:h-full [&>div:first-child]:w-full [&>div:first-child]:rounded-[1.35rem] [&>div:first-child]:px-3",
                  item.toneClassName,
                )}
              />
            </li>
          ))}
        </ul>

        <p className="text-xs leading-5 text-muted-foreground">
          Chosen for recurrence, not novelty.
        </p>
      </div>
    </aside>
  );
}

export default function TechPage() {
  return (
    <DivFadeIn>
      <Maxwidthdiv className="mt-10 flex flex-col gap-14 pb-16 sm:gap-16">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
          <div className="max-w-4xl space-y-5">
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                Tech
              </h1>
              <HeroLeadAnnotation />
            </div>
            <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                The priorities here come from the work itself. Across recent
                roles and projects, the pattern is consistent: Go for service
                design, TypeScript and Next.js for product surfaces, Docker and
                Kubernetes for delivery, and Python when the problem turns
                analytical.
              </p>
              <p>
                I still value breadth, but this page favors recurrence over
                novelty. If a tool appears here, it is because I trust it enough
                to keep reaching for it under real constraints.
              </p>
            </div>
          </div>
          <FavoriteStackPanel />
        </section>

        <section className="max-w-3xl border-t border-primary/20 pt-8 dark:border-primary/30">
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            For the surrounding context, the{" "}
            <Link
              href="/experience"
              className="font-medium text-foreground underline-offset-4 transition hover:underline"
            >
              experience
            </Link>{" "}
            page shows where this stack was used, and{" "}
            <Link
              href="/project"
              className="font-medium text-foreground underline-offset-4 transition hover:underline"
            >
              selected work
            </Link>{" "}
            shows what it produced.
          </p>
        </section>

        <section aria-label="Primary technologies" className="flex flex-col">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border-t border-primary/15 py-9 first:border-t-0 first:pt-0 dark:border-primary/15 sm:py-11"
            >
              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10">
                <div className="space-y-5">
                  <header className="space-y-2">
                    <SectionEyebrowAnnotation>
                      {section.eyebrow}
                    </SectionEyebrowAnnotation>
                    <SectionTitleAnnotation title={section.title} />
                    <p className="max-w-3xl text-sm leading-7 text-foreground/90 sm:text-base">
                      {section.summary}
                    </p>
                  </header>

                  <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <ul
                    className="flex flex-wrap gap-2.5"
                    aria-label={section.title}
                  >
                    {section.tools.map((tool) => (
                      <li key={tool.name}>
                        <StackBadge tool={tool} />
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="space-y-3 md:pt-1">
                  <p className="text-sm text-muted-foreground">
                    What it tends to support
                  </p>
                  <p className="text-sm leading-6 text-foreground/75 md:text-right">
                    <AsideBracketAnnotation>
                      {section.aside}
                    </AsideBracketAnnotation>
                  </p>
                </aside>
              </div>
            </article>
          ))}
        </section>
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
