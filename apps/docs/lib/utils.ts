import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
