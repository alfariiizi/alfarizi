import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { Timeline } from "./_components/Timeline";

export const metadata: Metadata = {
  title: "Project",
};

export default function page() {
  return (
    <Maxwidthdiv className="flex flex-col gap-10">
      <h2
        className={cn(
          "place-self-center text-3xl font-bold text-primary",
          "font-display",
        )}
      >
        Projects 🏗️
      </h2>
      <Timeline />
    </Maxwidthdiv>
  );
}
