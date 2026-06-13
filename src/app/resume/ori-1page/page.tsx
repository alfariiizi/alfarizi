import { type Metadata } from "next";
import { ResumeDocument } from "../_components/ResumeDocument";

export const metadata: Metadata = {
  title: "Resume Original 1 Page",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OriginalOnePageResumePage() {
  return <ResumeDocument variant="ori" length="compact" />;
}
