import Link from "next/link";
import { buildResumePdfHref } from "../utils.js";
import { resumeBuildTimestamp } from "../data";

type Props = {
  className?: string;
};

const downloads = [
  { label: "ATS Friendly", variant: "ats" as const },
  { label: "Original", variant: "ori" as const },
];

export function ResumeDownloadHeader({ className }: Props) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/10 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Download Resume
          </p>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            The links below point to build-generated PDFs. The timestamp stays
            stable for the current deploy.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {downloads.map((download) => (
            <Link
              key={download.variant}
              href={buildResumePdfHref(resumeBuildTimestamp, download.variant)}
              download
              className="rounded-md bg-primary px-4 py-2 text-sm text-background duration-150 hover:opacity-80"
            >
              {download.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

