import { cn } from "@/lib/utils";
import React from "react";
import { type IconType } from "react-icons";
import {
  IoInformationCircleOutline,
  IoKeyOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";
import { VscNotebook } from "react-icons/vsc";
import { AlertDescription, Alert as AlertRoot, AlertTitle } from "../ui/alert";

type Status = "info" | "warning" | "note" | "danger" | "key";

type Variant = {
  status: Status; // status must be unique
  icon: IconType;
  defaultTitle: string;
  className?: string;
};

const defaultVariant: Variant = {
  status: "info",
  icon: IoInformationCircleOutline,
  defaultTitle: "Info",
  className:
    "bg-teal-200 border-teal-800 dark:bg-teal-900 dark:border-teal-300",
};

const variants: Variant[] = [
  defaultVariant,
  {
    status: "warning",
    icon: IoWarningOutline,
    defaultTitle: "Warning",
    className:
      "bg-yellow-100 border-yellow-800 dark:bg-yellow-900 dark:border-yellow-300",
  },
  {
    status: "note",
    icon: VscNotebook,
    defaultTitle: "Note",
    className: "bg-sky-200 border-sky-800 dark:bg-sky-900 dark:border-sky-300",
  },
  {
    status: "danger",
    icon: MdOutlineDangerous,
    defaultTitle: "Danger",
    className: "bg-red-200 border-red-800 dark:bg-red-900 dark:border-red-300",
  },
  {
    status: "key",
    icon: IoKeyOutline,
    defaultTitle: "Keypoint",
    className:
      "bg-blue-200 border-blue-950 dark:bg-blue-950 dark:border-blue-200",
  },
] as const;

type Props = {
  status?: Status;
  title?: string;
  children?: React.ReactNode;
};

export function Callout({ title, children, status = "info" }: Props) {
  const variant = variants.find((v) => v.status === status) ?? defaultVariant;
  const titleDisplay = title ?? variant.defaultTitle;

  return (
    <AlertRoot
      variant="default"
      className={cn("mb-8 mt-4 border-2", variant.className)}
    >
      <AlertTitle
        className={cn(
          "flex items-start gap-2 font-display text-base font-semibold sm:text-lg",
        )}
      >
        <variant.icon className="mt-[2px] h-5 w-5" />
        {titleDisplay}
      </AlertTitle>
      <AlertDescription className="text-base">{children}</AlertDescription>
    </AlertRoot>
  );
}
