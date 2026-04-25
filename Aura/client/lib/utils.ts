import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  const anyErr = err as any;
  if (anyErr) {
    if (anyErr.response?.data?.message) return String(anyErr.response.data.message);
    if (anyErr.response?.data?.error) return String(anyErr.response.data.error);

    if (anyErr.data?.message) return String(anyErr.data.message);
    if (anyErr.payload?.message) return String(anyErr.payload.message);

    if (typeof anyErr === "string") return anyErr;

    if (anyErr.message) return String(anyErr.message);
  }
  return "An unexpected error occurred";
}