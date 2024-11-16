import { z } from "zod";

export const entityFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email format.").min(1, "Email is required."),
  phoneNumber: z.string().min(1, "Phone number is required."),
  websiteLink: z.string().url().optional().or(z.literal('')),
  bio: z
    .string()
    .max(200, "Max 200 characters")
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  description: z
    .string()
    .max(1000, "Max 1000 characters")
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  physicalAddress: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  country: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  state: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  city: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});
