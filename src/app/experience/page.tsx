import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { experiences } from "./data";

const title = "Experience";
const description =
  "A selected record of work across product, frontend, backend, and delivery. Not a full resume, only the parts that best show how I tend to work when the constraints are real.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
};

export default function ExperiencePage() {
  return (
    <Maxwidthdiv className="mt-10 flex flex-col gap-14 pb-16 sm:gap-16">
      <section className="max-w-4xl space-y-5">
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-foreground/90 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            Most of my work sits where product decisions, engineering execution,
            and delivery pressure meet. I tend to be most useful when a team
            needs someone who can move between architecture, frontend systems,
            backend services, and the practical work of getting software into
            use.
          </p>
          <p>
            What follows is intentionally selective. It is less a chronology of
            every role, and more a record of the work that best reflects how I
            think, what I usually take ownership of, and how I operate when the
            work needs to hold up beyond the first launch.
          </p>
        </div>
      </section>

      <section aria-label="Selected experience" className="flex flex-col">
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className={cn(
              "border-t border-primary/15 py-9 first:border-t-0 first:pt-0 dark:border-primary/15 sm:py-11",
              experience.featured && "sm:pb-14",
            )}
          >
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10">
              <div className="space-y-5">
                <header className="space-y-2">
                  <h2
                    className={cn(
                      "max-w-3xl text-balance font-display text-2xl font-medium leading-tight text-foreground sm:text-[2rem]",
                      experience.featured && "sm:text-[2.35rem]",
                    )}
                  >
                    {experience.headline}
                  </h2>
                  <div className="space-y-1 text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
                    <p className="text-foreground/80">
                      {experience.role} · {experience.company}
                    </p>
                    <p>
                      {experience.period} · {experience.location}
                    </p>
                  </div>
                </header>

                <ul className="max-w-3xl space-y-3 text-sm leading-7 text-foreground/90 sm:text-base">
                  {experience.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="grid grid-cols-[auto_1fr] gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.8rem] h-1.5 w-1.5 rounded-full bg-accent/80"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="space-y-3 md:pt-1">
                <p className="text-sm text-muted-foreground">Focus areas</p>
                <p className="text-sm leading-6 text-foreground/75 md:text-right">
                  {experience.capabilities.join(", ")}
                </p>
              </aside>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-3xl border-t border-primary/20 pt-8 dark:border-primary/30">
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          If you want the concrete output behind some of this work, the{" "}
          <Link
            href="/project"
            className="font-medium text-foreground underline-offset-4 transition hover:underline"
          >
            selected projects
          </Link>{" "}
          page is the better next stop. If the shape of the work feels aligned,
          you can also{" "}
          <Link
            href="/contact"
            className="font-medium text-foreground underline-offset-4 transition hover:underline"
          >
            get in touch
          </Link>
          .
        </p>
      </section>
    </Maxwidthdiv>
  );
}
