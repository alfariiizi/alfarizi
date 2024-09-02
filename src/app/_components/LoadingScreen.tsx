import { MotionDiv, MotionH1 } from "@/lib/framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LoadingScreen({ className }: Props) {
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
        duration: 0.2,
      }}
      className={cn(
        "absolute left-0 top-[-60px] z-[1000] flex size-40 h-dvh w-full flex-col items-center justify-center gap-4 bg-background",
        className,
      )}
    >
      <MotionH1
        initial={{
          opacity: 0.4,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0.4,
        }}
        transition={{
          ease: "easeInOut",
          repeatType: "mirror",
          repeat: Infinity,
          duration: 0.8,
        }}
        className={cn("font-display text-4xl font-semibold")}
      >
        alfarizi.
      </MotionH1>
    </MotionDiv>
  );
}
