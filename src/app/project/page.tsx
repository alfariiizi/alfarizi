import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import Projects from "./_components/Projects";
import DivFadeIn from "../_components/DivFadeIn";
import { sortedProjects } from "./shared";

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
            A curated selection of work that reflects product thinking, systems
            design, and practical execution.
          </p>
        </div>
        <Projects projects={sortedProjects} />
        {/* <Timeline /> */}
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
