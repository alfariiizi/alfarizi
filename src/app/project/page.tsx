import { cn } from "@/lib/utils";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { Timeline } from "./_components/Timeline";

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
