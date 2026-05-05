import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  // eslint-disable-next-line no-unsafe-optional-chaining
  return str?.charAt(0)?.toUpperCase() + (str || "")?.slice(1) ?? "";
}

export async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

function mapperLocale(locale: string) {
  switch (locale) {
    case "id":
      return "id-ID";
    case "en":
      return "en-US";
    default:
      return locale;
  }
}

export function getFormattedDate(
  locale: "id" | "en",
  date: string | Date,
  dateStyle: "long" | "full" | "medium" | "short" = "long",
): string {
  const dateRes = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(mapperLocale(locale), {
    dateStyle,
  }).format(dateRes);
}
