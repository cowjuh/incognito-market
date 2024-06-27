import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Shop } from '@prisma/client';
import { ShopWithRelations } from './shop';

const prisma = new PrismaClient();

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ShopWithRelations[]>
) {
    const tagId = req.query.tagId as string;

    if (!tagId) {
        return res.status(400).json({ message: 'Tag ID is required as a query parameter' });
    }

    if (req.method === 'GET') {
        try {
            const shops = await prisma.shop.findMany({
                where: {
                    shopTags: {
                        some: {
                            tagId: tagId
                        }
                    }
                },
                include: {
                    shopTags: {
                        include: {
                            tag: true
                        }
                    },
                    owner: true,
                    socialMedia: true,
                    featuredItems: true,
                    updates: true
                }
            });
            res.status(200).json(shops);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving shops for tag ID: ' + tagId + '. Error: ' + error.message });
        }
    } else {
        // Only GET method is allowed for this route
        res.status(405).json({ message: 'Method not allowed' });
    }
}
