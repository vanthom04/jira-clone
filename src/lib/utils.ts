import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

import { ENDPOINT_URL, PROJECT_ID } from "@/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateFileUrl = (bucketId: string, fileId: string) => {
  return `${ENDPOINT_URL}/storage/buckets/${bucketId}/files/${fileId}/view?project=${PROJECT_ID}`
}

export const generateInviteCode = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export const snakeCaseToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
