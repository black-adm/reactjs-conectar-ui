import { type ClassValue, clsx } from "clsx"
import { twMerge as tailwindMerge } from "tailwind-merge"

export function twMerge(...inputs: ClassValue[]) {
  return tailwindMerge(clsx(inputs))
}