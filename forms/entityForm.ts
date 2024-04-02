import { z } from 'zod';

export const entityFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    websiteLink: z.string().optional(),
    email: z.string(),
    phoneNumber: z.string(),
    bio: z.string().optional(),
    description: z.string().optional(),
    physicalAddress: z.string().optional(),
    city: z.string().optional(),
    profilePicture: z.string().optional(),
    headerImage: z.string().optional(),
    ownerId: z.string(),
});