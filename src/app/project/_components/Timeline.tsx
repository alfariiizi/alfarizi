"use client";

import { displayFont } from "@/app/_components/fonts";
import { cn } from "@/lib/utils";
import "@/styles/timeline.css";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { allProjects } from ".contentlayer/generated";
import Image from "next/image";

// solving issue with nextjs:
// https://github.com/stephane-monnot/react-vertical-timeline/issues/166

export function Timeline() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const sortedProjects = allProjects.sort((a, b) =>
    new Date(a.startDate) > new Date(b.startDate) ? -1 : 1,
  );

  return (
    <section ref={ref}>
      <VerticalTimeline lineColor="#aaa" className="text-gray-400">
        {sortedProjects.map((project) => {
          const startYear = project.startDate.split("-")[0];
          const endYear = project.endDate?.split("-")[0] ?? "Present";
          const displayYear =
            startYear === endYear ? startYear : `${startYear} - ${endYear}`;

          return (
            <VerticalTimelineElement
              key={project.title}
              visible={inView}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "var(--secondary)",
                color: "var(--text)",
                borderBottom: "0px",
              }}
              contentArrowStyle={{
                borderRight: "8px solid var(--secondary)",
              }}
              date={displayYear}
              iconStyle={{
                background: "var(--primary)",
                color: "#fff",
                padding: "4px",
              }}
              icon={
                <Image
                  src={project.icon ?? ""}
                  alt={project.tech ?? ""}
                  width={200}
                  height={200}
                  className="h-full w-full rounded-full bg-white p-1 md:p-2"
                />
              }
            >
              <Link href={project.slug} className="w-fit">
                <h3
                  className={cn(
                    "vertical-timeline-element-title w-fit text-lg font-semibold duration-150 hover:opacity-70",
                    displayFont.className,
                  )}
                >
                  {project.title} ({project.company})
                </h3>
              </Link>
              <h4
                className={cn(
                  "vertical-timeline-element-subtitle",
                  displayFont.className,
                )}
              >
                {project.tech}
              </h4>
              <p>{project.description}</p>
            </VerticalTimelineElement>
          );
        })}
        <VerticalTimelineElement
          visible={inView}
          iconStyle={{ background: "var(--primary)", color: "#fff" }}
          icon={<BsStarFill />}
        />
      </VerticalTimeline>
    </section>
  );
}
