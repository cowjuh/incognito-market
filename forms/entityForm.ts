import { z } from 'zod';

export const entityFormSchema = z.object({
    name: z.string().min(1, "Name is required."),
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Invalid email format.").min(1, "Email is required."),
    phoneNumber: z.string().min(1, "Phone number is required."),
    websiteLink: z.string().url("Invalid URL format.").optional(),
    bio: z.string().max(200, "Max 200 characters").optional(),
    description: z.string().max(1000, "Max 1000 characters").optional(),
    physicalAddress: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
});