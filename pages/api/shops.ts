import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const ownerId = req.query.ownerId as string;
            let shops;

            if (ownerId) {
                shops = await prisma.shop.findMany({
                    where: {
                        ownerId: ownerId
                    },
                    include: {
                        owner: true,
                        socialMedia: true,
                        featuredItems: true,
                        updates: true
                    },
                });
            } else {
                shops = await prisma.shop.findMany({
                    include: {
                        owner: true,
                        socialMedia: true,
                        featuredItems: true,
                        updates: true
                    },
                });
            }

            res.status(200).json({ message: 'Shops retrieved successfully', shops });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving shops', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}