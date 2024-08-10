import { MotionDiv } from "@/lib/framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function DivFadeIn({ className, children }: Props) {
  return (
    <MotionDiv
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className={cn("mb-28 space-y-10", className)}
    >
      {children}
    </MotionDiv>
  );
}
