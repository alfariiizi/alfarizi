import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import { getResumeProfile, type ResumeLength } from "../data";

type ResumeVariant = "ats" | "ori";

type Props = {
  variant: ResumeVariant;
  length?: ResumeLength;
  preview?: boolean;
};

function SectionTitle({
  children,
  variant,
  compact = false,
}: {
  children: ReactNode;
  variant: ResumeVariant;
  compact?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-display text-xl font-semibold tracking-tight",
        compact && "text-lg sm:text-xl",
        variant === "ats" ? "text-black" : "text-foreground",
      )}
    >
      {children}
    </h2>
  );
}

export function ResumeDocument({
  variant,
  length = "full",
  preview = false,
}: Props) {
  const isAts = variant === "ats";
  const isCompact = length === "compact";
  const resumeData = getResumeProfile(length);
  const compactScaleStyle = isCompact ? { zoom: 0.8 } : undefined;
  const shellClassName = cn(
    "mx-auto w-full",
    isAts ? "max-w-4xl bg-white text-black" : "max-w-5xl",
    !preview && "print:mx-0 print:max-w-none",
  );

  return (
    <article className={shellClassName}>
      <div
        className={cn(
          "space-y-8",
          isCompact && "space-y-4",
          isAts
            ? isCompact
              ? "p-5 sm:p-6"
              : "p-8 sm:p-10"
            : isCompact
              ? "rounded-[2rem] border border-primary/10 bg-background/90 p-4 shadow-sm sm:p-5"
              : "rounded-[2rem] border border-primary/10 bg-background/90 p-6 shadow-sm sm:p-8",
          preview && "overflow-hidden",
        )}
        style={compactScaleStyle}
      >
        <header className={cn("space-y-4 border-b border-primary/10 pb-6", isCompact && "pb-3")}>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Resume
            </p>
            <h1
              className={cn(
                "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
                isCompact && "text-3xl sm:text-4xl",
                isAts ? "text-black" : "text-primary",
              )}
            >
              {resumeData.identity.name}
            </h1>
            <p
              className={cn(
                "text-base font-medium sm:text-lg",
                isCompact && "text-sm sm:text-base",
                isAts ? "text-black" : "text-foreground/80",
              )}
            >
              {resumeData.identity.title}
            </p>
          </div>

          <p
            className={cn(
              "max-w-4xl text-sm leading-7 sm:text-base",
              isCompact && "text-sm leading-6 sm:text-sm",
              isAts ? "text-black/90" : "text-foreground/90",
            )}
          >
            {resumeData.identity.headline}
          </p>

          <div className={cn("flex flex-wrap gap-x-4 gap-y-2 text-sm", isCompact && "gap-x-3 gap-y-1.5 text-[0.78rem] sm:text-sm")}>
            <span>{resumeData.contact.email}</span>
            <Link
              href={resumeData.contact.website}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-4 hover:underline"
            >
              Website
            </Link>
            <span>{resumeData.contact.location}</span>
          </div>

          <div className={cn("flex flex-wrap gap-x-4 gap-y-2 text-sm", isCompact && "gap-x-3 gap-y-1.5 text-[0.78rem] sm:text-sm")}>
            {resumeData.contact.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </header>

        <section className={cn("space-y-3", isCompact && "space-y-1.5")}>
          <SectionTitle variant={variant} compact={isCompact}>
            Summary
          </SectionTitle>
          <div className={cn("space-y-3 text-sm leading-7 sm:text-base", isCompact && "space-y-1.5 leading-5")}>
            {resumeData.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className={cn("space-y-4", isCompact && "space-y-2")}>
          <SectionTitle variant={variant} compact={isCompact}>
            Experience
          </SectionTitle>
          <div className={cn("space-y-5", isCompact && "space-y-2.5")}>
            {resumeData.experience.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className={cn(
                  "space-y-3",
                  isCompact && "space-y-1.5",
                  isAts
                    ? isCompact
                      ? "border-b border-black/10 pb-2.5 last:border-b-0"
                      : "border-b border-black/10 pb-4 last:border-b-0"
                    : isCompact
                      ? "rounded-2xl border border-primary/10 bg-secondary/10 p-2.5"
                      : "rounded-2xl border border-primary/10 bg-secondary/10 p-4",
                )}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-medium">{experience.company}</h3>
                    <span className="text-sm text-muted-foreground">
                      {experience.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {experience.period} · {experience.location}
                  </p>
                </div>
                <p className={cn("text-sm leading-7 sm:text-base", isCompact && "leading-5")}>
                  {experience.headline}
                </p>
                <ul className={cn("space-y-2 text-sm leading-7 sm:text-base", isCompact && "space-y-1 leading-5")}>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[auto_1fr] gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {resumeData.organization ? (
          <section className={cn("space-y-4", isCompact && "space-y-2")}>
            <SectionTitle variant={variant} compact={isCompact}>
              {resumeData.organization.name}
            </SectionTitle>
            <div
              className={cn(
                "space-y-3 text-sm leading-7 sm:text-base",
                isCompact && "space-y-1.5 leading-5",
              )}
            >
              <p>{resumeData.organization.summary}</p>
              <p className="text-muted-foreground">
                {resumeData.organization.description}
              </p>
              <ul
                className={cn(
                  "space-y-2",
                  isCompact && "space-y-1 leading-5",
                )}
              >
                {resumeData.organization.highlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[auto_1fr] gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-current"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={cn("space-y-4", isCompact && "space-y-2")}>
          <SectionTitle variant={variant} compact={isCompact}>
            Selected Projects
          </SectionTitle>
          <div className={cn("grid gap-4", isCompact && "gap-2.5")}>
            {resumeData.projects.map((project) => (
              <article
                key={`${project.company}-${project.title}`}
                className={cn(
                  "space-y-3",
                  isAts
                    ? isCompact
                      ? "border-b border-black/10 pb-2.5 last:border-b-0"
                      : "border-b border-black/10 pb-4 last:border-b-0"
                    : isCompact
                      ? "rounded-2xl border border-primary/10 bg-background p-2.5"
                      : "rounded-2xl border border-primary/10 bg-background p-4",
                )}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-medium">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {project.company}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.projectTypeLabel} · {project.period}
                  </p>
                </div>
                {project.role ? (
                  <p className="text-sm leading-7 sm:text-base">{project.role}</p>
                ) : null}
                <p className={cn("text-sm leading-7 sm:text-base", isCompact && "leading-5")}>
                  {project.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.tech}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {project.link ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline-offset-4 hover:underline"
                    >
                      Live project
                    </Link>
                  ) : null}
                  {project.repo ? (
                    <Link
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline-offset-4 hover:underline"
                    >
                      Repository
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={cn("space-y-4", isCompact && "space-y-2")}>
          <SectionTitle variant={variant} compact={isCompact}>
            Skills
          </SectionTitle>
          <div className={cn("flex flex-wrap gap-2", isCompact && "gap-1.5")}>
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  isCompact && "px-2 py-0.5 text-[0.72rem]",
                  isAts ? "border border-black/10 text-black" : "bg-secondary/40 text-foreground",
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
