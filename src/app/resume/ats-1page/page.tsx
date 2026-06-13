import { type Metadata } from "next";
import { ResumeDocument } from "../_components/ResumeDocument";

export const metadata: Metadata = {
  title: "Resume ATS 1 Page",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AtsOnePageResumePage() {
  return <ResumeDocument variant="ats" length="compact" />;
}
