import { cn } from "@/lib/utils";
import React from "react";
import { type IconType } from "react-icons";
import { IoInformationCircleOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";
import { VscNotebook } from "react-icons/vsc";
import { AlertDescription, Alert as AlertRoot, AlertTitle } from "../ui/alert";

type Status = "info" | "warning" | "note" | "danger";

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
  className: "bg-teal-200 dark:bg-teal-800",
};

const variants: Variant[] = [
  defaultVariant,
  {
    status: "warning",
    icon: IoWarningOutline,
    defaultTitle: "Warning",
    className: "bg-yellow-100 dark:bg-yellow-800",
  },
  {
    status: "note",
    icon: VscNotebook,
    defaultTitle: "Note",
    className: "bg-sky-200 dark:bg-sky-800",
  },
  {
    status: "danger",
    icon: MdOutlineDangerous,
    defaultTitle: "Danger",
    className: "bg-red-200 dark:bg-red-900",
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
      className={cn(
        "mb-8 mt-4 border-background shadow-lg shadow-gray-500 dark:shadow-gray-700",
        variant.className,
      )}
    >
      <AlertTitle
        className={cn(
          "flex items-center gap-2 font-display text-base font-semibold sm:text-lg",
        )}
      >
        <variant.icon className="h-5 w-5" />
        {titleDisplay}
      </AlertTitle>
      <AlertDescription className="text-base">{children}</AlertDescription>
    </AlertRoot>
  );
}
