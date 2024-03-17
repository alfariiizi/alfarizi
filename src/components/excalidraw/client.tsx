"use client";

import {
  type ExcalidrawImperativeAPI,
  type ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

type Props = {
  data: ExcalidrawInitialDataState;
};

const ExcalidrawPrimitive = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[35dvh] max-h-[480px] w-full animate-pulse items-center justify-center bg-zinc-200 dark:bg-zinc-800 md:h-[50dvh] lg:h-[60dvh]">
        <p className="font-display text-lg text-foreground">
          Loading Diagram...
        </p>
      </div>
    ),
  },
);

function ExcalidrawClient({ data }: Props) {
  const [isFirstScroll, setIsFirstScroll] = useState(false);
  const [api, setApi] = useState<ExcalidrawImperativeAPI>();
  const { theme } = useTheme();
  const { width } = useWindowSize();

  useEffect(() => {
    api?.scrollToContent(undefined, {
      animate: true,
      fitToContent: true,
    });
  }, [api, width]);

  return (
    <div className="">
      <div className="">
        <button
          type="button"
          className="rounded-t-sm bg-secondary px-2 py-1 font-display text-sm text-secondary-foreground duration-150 hover:opacity-80 sm:text-base md:px-3 md:py-2"
          onClick={() => {
            api?.scrollToContent(undefined, {
              animate: true,
              fitToContent: true,
            });
          }}
        >
          Scroll to center
        </button>
      </div>
      <div className="h-[35dvh] max-h-[480px] w-full md:h-[50dvh] lg:h-[60dvh]">
        <ExcalidrawPrimitive
          initialData={{
            scrollToContent: true,
            ...data,
          }}
          theme={theme === "light" ? "light" : "dark"}
          gridModeEnabled={true}
          viewModeEnabled={true}
          zenModeEnabled={true}
          onScrollChange={() => {
            if (!isFirstScroll) {
              api?.scrollToContent(undefined, {
                animate: true,
                fitToContent: true,
              });
              setIsFirstScroll(true);
            }
          }}
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveToActiveFile: false,
              saveAsImage: false,
              toggleTheme: false,
              export: false,
              clearCanvas: false,
              changeViewBackgroundColor: false,
            },
            tools: {
              image: false,
            },
          }}
          excalidrawAPI={(eApi) => {
            eApi.scrollToContent(undefined, {
              animate: true,
              fitToContent: true,
            });
            setApi(eApi);
          }}
        />
      </div>
    </div>
  );
}

export { ExcalidrawClient };
export default ExcalidrawClient;
