import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import { resumeData } from "../data";

type ResumeVariant = "ats" | "ori";

type Props = {
  variant: ResumeVariant;
  preview?: boolean;
};

function SectionTitle({
  children,
  variant,
}: {
  children: ReactNode;
  variant: ResumeVariant;
}) {
  return (
    <h2
      className={cn(
        "font-display text-xl font-semibold tracking-tight",
        variant === "ats" ? "text-black" : "text-foreground",
      )}
    >
      {children}
    </h2>
  );
}

export function ResumeDocument({ variant, preview = false }: Props) {
  const isAts = variant === "ats";
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
          isAts ? "p-8 sm:p-10" : "rounded-[2rem] border border-primary/10 bg-background/90 p-6 shadow-sm sm:p-8",
          preview && "overflow-hidden",
        )}
      >
        <header className="space-y-4 border-b border-primary/10 pb-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Resume
            </p>
            <h1
              className={cn(
                "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
                isAts ? "text-black" : "text-primary",
              )}
            >
              {resumeData.identity.name}
            </h1>
            <p
              className={cn(
                "text-base font-medium sm:text-lg",
                isAts ? "text-black" : "text-foreground/80",
              )}
            >
              {resumeData.identity.title}
            </p>
          </div>

          <p
            className={cn(
              "max-w-4xl text-sm leading-7 sm:text-base",
              isAts ? "text-black/90" : "text-foreground/90",
            )}
          >
            {resumeData.identity.headline}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
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

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
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

        <section className="space-y-3">
          <SectionTitle variant={variant}>Summary</SectionTitle>
          <div className="space-y-3 text-sm leading-7 sm:text-base">
            {resumeData.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle variant={variant}>Experience</SectionTitle>
          <div className="space-y-5">
            {resumeData.experience.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className={cn(
                  "space-y-3",
                  isAts
                    ? "border-b border-black/10 pb-4 last:border-b-0"
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
                <p className="text-sm leading-7 sm:text-base">
                  {experience.headline}
                </p>
                <ul className="space-y-2 text-sm leading-7 sm:text-base">
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

        <section className="space-y-4">
          <SectionTitle variant={variant}>Selected Projects</SectionTitle>
          <div className="grid gap-4">
            {resumeData.projects.map((project) => (
              <article
                key={`${project.company}-${project.title}`}
                className={cn(
                  "space-y-3",
                  isAts
                    ? "border-b border-black/10 pb-4 last:border-b-0"
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
                <p className="text-sm leading-7 sm:text-base">
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

        <section className="space-y-4">
          <SectionTitle variant={variant}>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
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
