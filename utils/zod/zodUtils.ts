import { z, ZodType, ZodObject } from "zod";

export function isFieldRequired(schema: ZodType<any>, fieldName: string): boolean {
    const objectSchema = schema as ZodObject<any>;
    return !(objectSchema.shape[fieldName] instanceof z.ZodOptional);
}