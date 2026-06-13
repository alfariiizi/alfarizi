import { projects as allProjects } from ".velite/index";
import { getHighlightedProjects } from "@/lib/content-utils.js";
import { env } from "@/env";
import { experiences } from "../experience/data";
import { vandor } from "../organization/data";
import { socials } from "../data";

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

export type ResumeLength = "full" | "compact";

export type ResumeProfile = {
  identity: {
    name: string;
    title: string;
    headline: string;
  };
  summary: string[];
  contact: {
    email: string;
    website: string;
    location: string;
    links: ResumeContactLink[];
  };
  experience: ResumeExperience[];
  organization: {
    name: string;
    summary: string;
    description: string;
    href: string;
    highlights: string[];
  } | null;
  projects: ResumeProject[];
  skills: string[];
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

function buildProjectSelection(projects: Project[], limit = 3): ResumeProject[] {
  return getHighlightedProjects(projects).slice(0, limit).map((project) => ({
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

function buildSkills(
  experienceEntries: ResumeExperience[],
  limit?: number,
): string[] {
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

  const skillList = [...skills];
  return typeof limit === "number" ? skillList.slice(0, limit) : skillList;
}

function buildContactLinks(length: ResumeLength): ResumeContactLink[] {
  const links = socials
    .filter(({ label }) => label !== "Instagram")
    .map(({ label, href }) => ({ label, href }));

  return length === "compact"
    ? links.filter(({ label }) => label === "Github" || label === "LinkedIn")
    : links;
}

function buildResumeProfile(length: ResumeLength): ResumeProfile {
  const isCompact = length === "compact";
  const compactExperience = experiences.slice(0, 2).map((experience) => ({
    ...experience,
    bullets: experience.bullets.slice(0, 2),
  }));
  const compactProjects = buildProjectSelection(allProjects).slice(0, 2);

  return {
    identity: {
      name: "Moh Rizal Alfarizi",
      title: "Fullstack Engineer",
      headline: isCompact
        ? "Fullstack engineer focused on product surfaces, internal tools, and delivery-heavy systems."
        : "Fullstack engineer building product surfaces, internal tools, and delivery-heavy systems.",
    },
    summary: isCompact
      ? [
          "I work across product, frontend, backend, and delivery when the system needs to stay understandable after handoff.",
        ]
      : [
          "I work across product, frontend, backend, and delivery when the system needs to stay understandable after handoff.",
          "Recent work has centered on Go, Next.js, TypeScript, Docker, and Kubernetes for customer-facing and internal systems with real operational constraints.",
          "I have led delivery across multi-product teams and production environments where reliability matters as much as speed.",
        ],
    contact: {
      email: "rizal.alfariiiziii@gmail.com",
      website: env.APP_URL,
      location: "Indonesia",
      links: buildContactLinks(length),
    },
    experience: isCompact ? compactExperience : experiences,
    organization: {
      name: vandor.name,
      summary: vandor.summary,
      description: vandor.description,
      href: vandor.href,
      highlights: isCompact
        ? [
            "Backend-oriented tools and workflows",
            "Spec-first Go templating and packaging work",
          ]
        : [
            "Backend-oriented tools and workflows",
            "Spec-first Go templating, packaging, and CLI work",
            "Documentation that explains the reasoning behind the choices",
          ],
    },
    projects: isCompact
      ? compactProjects.slice(0, 1)
      : buildProjectSelection(allProjects),
    skills: isCompact ? buildSkills(compactExperience, 6) : buildSkills(experiences),
  };
}

export const resumeProfiles = {
  full: buildResumeProfile("full"),
  compact: buildResumeProfile("compact"),
} as const;

export const resumeData = resumeProfiles.full;

export function getResumeProfile(length: ResumeLength): ResumeProfile {
  return resumeProfiles[length];
}
