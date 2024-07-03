import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import { ShopWithRelations } from './shop';

const prisma = new PrismaClient();

type ResponseData = {
    followers?: User[];
    following?: ShopWithRelations[];
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { userId, shopId } = req.query;

    if (req.method === 'GET') {
        try {
            if (userId) {
                // Get shops followed by the user
                const following = await prisma.shopFollow.findMany({
                    where: { userId: String(userId) },
                    include: {
                        shop: {
                            include: {
                                owner: true,
                                socialMedia: true,
                                featuredItems: true,
                                updates: true,
                                shopTags: {
                                    include: {
                                        tag: true
                                    }
                                },
                                followers: true,
                                ratings: true
                            }
                        }
                    }
                });
                res.status(200).json({ following: following.map(f => f.shop) });
            } else if (shopId) {
                // Get users following the shop
                const followers = await prisma.shopFollow.findMany({
                    where: { shopId: String(shopId) },
                    include: { user: true }
                });
                res.status(200).json({ followers: followers.map(f => f.user) });
            } else {
                res.status(400).json({ message: 'User ID or Shop ID is required' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving follows: ' + error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
