import { type Metadata } from "next";
import { ResumeDocument } from "../_components/ResumeDocument";

export const metadata: Metadata = {
  title: "Resume Original",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OriginalResumePage() {
  return <ResumeDocument variant="ori" />;
}

