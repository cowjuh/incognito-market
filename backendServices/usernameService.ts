import prisma from '../lib/prisma';

export async function isUsernameUnique(username: string): Promise<boolean> {
    const user = await prisma.shop.findUnique({
        where: { username },
    });
    return user === null;
}