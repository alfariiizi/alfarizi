import { cn } from "@/lib/utils";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AlertDescription, Alert as AlertRoot, AlertTitle } from "../ui/alert";

type Status = "info" | "warning";

type Props = {
  variant?: Status;
  title?: string;
  children?: React.ReactNode;
};

export function Alert({ title, children, variant = "info" }: Props) {
  const titleDisplay =
    title ?? `${variant.split("")[0]?.toUpperCase()}${variant.slice(1)}`;

  return (
    <AlertRoot
      variant="default"
      className="border-text bg-teal-400 shadow-lg shadow-gray-500 dark:bg-teal-800"
    >
      <AlertTitle
        className={cn("font-display flex items-center gap-2 font-semibold")}
      >
        {variant === "info" && (
          <IoInformationCircleOutline className="h-5 w-5" />
        )}
        {titleDisplay}
      </AlertTitle>
      <AlertDescription className="text-base">{children}</AlertDescription>
    </AlertRoot>
  );
}
