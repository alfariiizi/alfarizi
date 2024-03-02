import { type Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Blogpost",
};

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return children;
}
