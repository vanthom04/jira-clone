import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required")
})

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "Minimum of 8 characters required")
})
