import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
    isFollowing?: boolean;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { userId, shopId } = req.query;

    if (!userId || !shopId) {
        return res.status(400).json({ message: 'User ID and Shop ID are required' });
    }

    if (req.method === 'GET') {
        try {
            const follow = await prisma.shopFollow.findUnique({
                where: {
                    userId_shopId: {
                        userId: String(userId),
                        shopId: String(shopId),
                    },
                },
            });

            if (follow) {
                res.status(200).json({ isFollowing: true });
            } else {
                res.status(200).json({ isFollowing: false });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error checking follow status: ' + error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
