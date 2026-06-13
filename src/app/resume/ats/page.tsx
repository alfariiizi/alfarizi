import { type Metadata } from "next";
import { ResumeDocument } from "../_components/ResumeDocument";

export const metadata: Metadata = {
  title: "Resume ATS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AtsResumePage() {
  return <ResumeDocument variant="ats" />;
}

