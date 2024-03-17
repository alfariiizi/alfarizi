import "@/styles/excalidraw.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";
import { promises as fs } from "fs";
// import { ExcalidrawClient } from "./client";
import dynamic from "next/dynamic";

const ExcalidrawClient = dynamic(async () => await import("./client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[40dvh] w-full items-center justify-center bg-gray-500 md:h-[50dvh] lg:h-[60dvh]">
      {/* <Skeleton className="h-[40dvh] w-full md:h-[50dvh] lg:h-[60dvh]" /> */}
      <p className="font-display text-lg">Loading Excalidraw</p>
    </div>
  ),
});

/* eslint-disable @typescript-eslint/ban-ts-comment */

type Props = {
  filename: string;
  caption?: string;
};

async function Excalidraw({ filename, caption }: Props) {
  const excalidrawFile = await fs.readFile(process.cwd() + filename, "utf8");

  const excalidrawData = JSON.parse(
    excalidrawFile,
  ) as ExcalidrawInitialDataState;

  return (
    <div className="space-y-2">
      <ExcalidrawClient data={excalidrawData} />
      {caption && (
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          {caption}
        </p>
      )}
    </div>
  );
}

export { Excalidraw };
export default Excalidraw;
