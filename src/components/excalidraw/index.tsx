import "@/styles/excalidraw.css";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";
import fs from "fs";
import path from "path";
import ExcalidrawClient from "./client";

// const ExcalidrawClient = dynamic(
//   () => import("./client").then((data) => data),
//   {
//     ssr: false,
//     loading: () => {
//       // Grab the HTML from the DOM and use it as the loading component to prevent layout collapse/flickering
//       const lazyEl = document.getElementById("lazy")?.outerHTML;

//       return (
//         <div
//           className="flex h-[100px] max-h-[480px] w-full animate-pulse items-center justify-center bg-zinc-200 dark:bg-zinc-800 md:h-[50dvh] lg:h-[60dvh]"
//           dangerouslySetInnerHTML={{
//             __html: lazyEl ? lazyEl : "",
//           }}
//         />
//       );
//     },
//   },
// );

type Props = {
  filename: string;
  caption?: string;
};

async function Excalidraw({ filename, caption }: Props) {
  // console.log(process.cwd());
  // console.log(process.cwd() + filename);
  // const excalidrawFile = await fs.readFile(process.cwd() + filename, "utf-8");
  const excalidrawPath = path.join(process.cwd(), "public", filename);
  const excalidrawFile = fs.readFileSync(excalidrawPath, { encoding: "utf8" });
  // console.log(excalidrawFile);

  const excalidrawData = JSON.parse(
    excalidrawFile,
  ) as ExcalidrawInitialDataState;

  return (
    <div className="space-y-2">
      <ExcalidrawClient data={excalidrawData} />
      {caption && (
        <p className="text-center text-sm text-zinc-500">{caption}</p>
      )}
    </div>
  );
}

export { Excalidraw };
export default Excalidraw;
