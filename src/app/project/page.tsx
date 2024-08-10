import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import Projects from "./_components/Projects";
import DivFadeIn from "../_components/DivFadeIn";

export const metadata: Metadata = {
  title: "Project",
  description: "Check out a selection of my latest web development projects.",
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
            Explore My Projects 🏗️
          </h2>
          <p>Check out a selection of my latest web development projects.</p>
        </div>
        <Projects />
        {/* <Timeline /> */}
      </Maxwidthdiv>
    </DivFadeIn>
  );
}
