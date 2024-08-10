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
