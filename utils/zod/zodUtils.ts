import { z, ZodType, ZodObject } from "zod";

export function isFieldRequired(schema: ZodType<any>, fieldName: string): boolean {
    const objectSchema = schema as ZodObject<any>;
    const fieldSchema = objectSchema.shape[fieldName];
    
    // Check if field is optional
    if (fieldSchema instanceof z.ZodOptional) {
        return false;
    }
    
    // Check if field is a union that includes empty string or optional
    if (fieldSchema instanceof z.ZodUnion) {
        const unionTypes = fieldSchema._def.options;
        return !unionTypes.some(type => 
            type instanceof z.ZodLiteral || 
            type instanceof z.ZodOptional || 
            (type instanceof z.ZodString && type._def.checks.length === 0)
        );
    }
    
    return true;
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