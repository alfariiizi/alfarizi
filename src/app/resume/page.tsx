import { type Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { ResumeDownloadHeader } from "./_components/ResumeDownloadHeader";
import { ResumeDocument } from "./_components/ResumeDocument";
import type { ResumeLength } from "./data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Moh Rizal Alfarizi's resume as an ATS-friendly PDF or a richly styled original PDF.",
};

export default function ResumePage() {
  return (
    <Maxwidthdiv className="my-10 flex flex-col gap-10">
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Resume
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Download Resume
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            The page below mirrors the downloadable content so you can inspect
            the resume before exporting it.
          </p>
        </div>
        <ResumeDownloadHeader />
      </section>

      <ResumePreviewPanel
        title="Rendered preview"
        description="Switch between the ATS and original variants. Both are backed by the same data."
        length="full"
      />

      <ResumePreviewPanel
        title="1-page preview"
        description="This version trims the resume to a tighter selection that fits a single page more comfortably."
        length="compact"
      />
    </Maxwidthdiv>
  );
}

function ResumePreviewPanel({
  title,
  description,
  length,
}: {
  title: string;
  description: string;
  length: ResumeLength;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      <Tabs defaultValue="ori" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ori">Original</TabsTrigger>
          <TabsTrigger value="ats">ATS Friendly</TabsTrigger>
        </TabsList>
        <TabsContent value="ori" className="mt-4">
          <ResumeDocument variant="ori" length={length} preview />
        </TabsContent>
        <TabsContent value="ats" className="mt-4">
          <ResumeDocument variant="ats" length={length} preview />
        </TabsContent>
      </Tabs>
    </section>
  );
}
