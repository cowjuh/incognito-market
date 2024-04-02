import { Prisma } from '@prisma/client';

export function parseJson<T = Prisma.JsonValue>(json: Prisma.JsonValue): T {
    return json as T;
}