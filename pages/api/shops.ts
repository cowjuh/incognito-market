import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const shops = await prisma.shop.findMany({
                include: {
                    owner: true,
                    socialMedia: true,
                    featuredItems: true
                }
            });
            res.status(200).json({ message: 'Shops retrieved successfully', shops });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving shops', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}