import { cn } from "@/lib/utils";

type ProjectType = "personal" | "professional-public" | "professional-internal";

const projectTypeLabels: Record<ProjectType, string> = {
  personal: "Personal",
  "professional-public": "Professional",
  "professional-internal": "Internal System",
};

const projectTypeClasses: Record<ProjectType, string> = {
  personal: "border-accent/40 bg-accent/10 text-accent",
  "professional-public":
    "border-primary/30 bg-primary/10 text-primary dark:border-primary/40",
  "professional-internal":
    "border-muted-foreground/30 bg-muted text-muted-foreground",
};

type Props = {
  projectType: ProjectType;
  className?: string;
};

export default function ProjectTypeBadge({ projectType, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-2 py-0.5 text-xs font-medium leading-tight",
        projectTypeClasses[projectType],
        className,
      )}
    >
      {projectTypeLabels[projectType]}
    </span>
  );
}
