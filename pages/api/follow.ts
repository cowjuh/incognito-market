import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type FollowResponseData = {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FollowResponseData>
) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            return await handlePost(req, res);
        case 'DELETE':
            return await handleDelete(req, res);
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<FollowResponseData>) {
    const { userId, shopId } = req.body;

    if (!userId || !shopId) {
        return res.status(400).json({ message: 'User ID and Shop ID are required' });
    }

    try {

        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: { ownerId: true }
        });

        if (shop?.ownerId === userId) {
            return res.status(400).json({ message: "You cannot follow your own shop." });
        }

        await prisma.$transaction(async (tx) => {
            await tx.shopFollow.create({
                data: {
                    userId,
                    shopId
                }
            });
            await tx.shop.update({
                where: { id: shopId },
                data: {
                    followersCount: {
                        increment: 1
                    }
                }
            });
        });
        res.status(200).json({ message: 'Shop followed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error following shop: ' + error.message });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<FollowResponseData>) {
    const { userId, shopId } = req.body;

    if (!userId || !shopId) {
        return res.status(400).json({ message: 'User ID and Shop ID are required' });
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.shopFollow.delete({
                where: {
                    userId_shopId: {
                        userId,
                        shopId
                    }
                }
            });
            await tx.shop.update({
                where: { id: shopId },
                data: {
                    followersCount: {
                        decrement: 1
                    }
                }
            });
        });
        res.status(200).json({ message: 'Shop unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing shop: ' + error.message });
    }
}
