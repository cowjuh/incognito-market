import { z } from 'zod';

export const updateFormSchema = z.object({
    title: z.string().min(1, "Title is required."),
    content: z.string().min(1, "Description is required.").max(250, "Description cannot exceed 250 characters."),
    callToActionText: z.string().optional(),
    callToActionLink: z.string().url("Invalid URL format.").optional(),
    shopId: z.string().optional()
});