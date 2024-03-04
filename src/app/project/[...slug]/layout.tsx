import { Maxwidthdiv } from "@/app/_components/Maxwindthdiv";
import "@/styles/content.css";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <Maxwidthdiv smallPadding>{children}</Maxwidthdiv>;
}
