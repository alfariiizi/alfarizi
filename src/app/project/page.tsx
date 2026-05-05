import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { RoughUnderline } from "../_components/RoughNotation";
import Projects from "./_components/Projects";
import DivFadeIn from "../_components/DivFadeIn";
import { highlightedProjects, nonHighlightedProjects } from "./shared";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A curated selection of work that reflects product thinking, systems design, and practical execution.",
};

export default function page() {
  return (
    <DivFadeIn>
      <Maxwidthdiv className="my-10 flex flex-col gap-10">
        <div className="space-y-3">
          <h2
            className={cn(
              "place-self-start text-3xl font-bold text-primary",
              "font-display",
            )}
          >
            Selected Work
          </h2>
          <p>
            A curated selection of work that reflects{" "}
            <RoughUnderline>
              product thinking, systems design, and practical execution
            </RoughUnderline>
            .
          </p>
        </div>
        <section className="flex flex-col gap-5">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-semibold text-primary">
              Highlighted Projects
            </h3>
            <p className="text-muted-foreground">
              Three projects that best represent the current shape of my work.
            </p>
          </div>
          <Projects projects={highlightedProjects} />
        </section>
        <section className="flex flex-col gap-5">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-semibold text-primary">
              All Projects
            </h3>
            <p className="text-muted-foreground">
              Professional systems, public products, and personal projects,
              sorted from newest to oldest.
            </p>
          </div>
          <Projects projects={nonHighlightedProjects} />
        </section>
        {/* <Timeline /> */}
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
