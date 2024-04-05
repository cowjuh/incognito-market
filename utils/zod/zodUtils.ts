import { z, ZodType, ZodObject } from "zod";

export function isFieldRequired(schema: ZodType<any>, fieldName: string): boolean {
    const objectSchema = schema as ZodObject<any>;
    return !(objectSchema.shape[fieldName] instanceof z.ZodOptional);
}

export function isFieldTextArea(schema: z.ZodType<any>, fieldName: string): boolean {
    const objectSchema = schema as z.ZodObject<any>;
    let fieldSchema = objectSchema.shape[fieldName];

    if (fieldSchema instanceof z.ZodOptional) {
        fieldSchema = fieldSchema.unwrap();
    }

    if (fieldSchema instanceof z.ZodString) {
        const maxLengthCheck = fieldSchema._def.checks.find((check) => check.kind === 'max');
        return maxLengthCheck && 'value' in maxLengthCheck && Number(maxLengthCheck.value) > 200;
    }
    return false;
};