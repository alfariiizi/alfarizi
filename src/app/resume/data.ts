import { projects as allProjects } from ".velite/index";
import { getHighlightedProjects } from "@/lib/content-utils.js";
import { env } from "@/env";
import { experiences } from "../experience/data";
import { socials } from "../data";
import { RESUME_BUILD_TIMESTAMP } from "@/lib/resume/build-info.js";

type ResumeExperience = (typeof experiences)[number];
type Project = (typeof allProjects)[number];
type ResumeProject = {
  title: string;
  company: string;
  role: string | null;
  period: string;
  description: string;
  tech: string;
  projectTypeLabel: string;
  link?: string | null;
  repo?: string | null;
  tags: string[];
};

type ResumeContactLink = {
  label: string;
  href: string;
};

function formatProjectPeriod(startDate: string, endDate?: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const start = formatter.format(new Date(startDate));
  const end = endDate ? formatter.format(new Date(endDate)) : "Present";

  return `${start} - ${end}`;
}

function buildProjectSelection(projects: Project[]): ResumeProject[] {
  return getHighlightedProjects(projects).slice(0, 3).map((project) => ({
    title: project.title,
    company: project.company,
    role: project.position ?? null,
    period: formatProjectPeriod(project.startDate, project.endDate),
    description: project.description,
    tech: project.tech,
    projectTypeLabel: project.projectTypeLabel,
    link: project.link ?? null,
    repo: project.repo ?? null,
    tags: project.tags,
  }));
}

function buildSkills(experienceEntries: ResumeExperience[]): string[] {
  const skills = new Set<string>([
    "Go",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Docker",
    "Kubernetes",
    "OpenAPI",
    "React Server Components",
    "System design",
    "Technical leadership",
  ]);

  for (const entry of experienceEntries) {
    for (const capability of entry.capabilities) {
      skills.add(capability);
    }
  }

  return [...skills];
}

export const resumeBuildTimestamp = RESUME_BUILD_TIMESTAMP;

export const resumeData = {
  identity: {
    name: "Moh Rizal Alfarizi",
    title: "Fullstack Engineer",
    headline: "Building thoughtful software for real-world use.",
  },
  summary: [
    "I work across product, frontend, backend, and delivery to build systems that are clear, reliable, and useful under real constraints.",
    "Most of my work sits where product decisions, engineering execution, and delivery pressure meet.",
  ],
  contact: {
    email: "rizal.alfariiiziii@gmail.com",
    website: env.APP_URL,
    location: "Indonesia",
    links: socials.map(({ label, href }): ResumeContactLink => ({ label, href })),
  },
  experience: experiences,
  projects: buildProjectSelection(allProjects),
  skills: buildSkills(experiences),
} as const;
