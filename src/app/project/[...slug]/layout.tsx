import Comments from "@/app/_components/Comments";
import { Maxwidthdiv } from "@/app/_components/Maxwindthdiv";
import "@/styles/content.css";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <Maxwidthdiv smallPadding className="mb-28 space-y-10">
      {children} <Comments className="max-w-4xl" />
    </Maxwidthdiv>
  );
}
