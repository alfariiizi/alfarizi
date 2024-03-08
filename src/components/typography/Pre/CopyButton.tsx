"use client";

import { useState } from "react";
import { LuCheck, LuClipboardList } from "react-icons/lu";

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute right-0 top-0 rounded-md bg-secondary px-2 pb-0 pt-1 text-secondary-foreground duration-150 hover:bg-secondary/80"
    >
      {isCopied ? (
        <div className="inline-flex items-center gap-2">
          <LuCheck className="h-4 w-4 font-semibold text-green-700 dark:text-green-500" />
          <div>Copied</div>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2">
          <LuClipboardList className="h-4 w-4" />
          <div>Copy</div>
        </div>
      )}
    </button>
  );
};
