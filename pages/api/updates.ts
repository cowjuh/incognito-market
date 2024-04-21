import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Update } from '@prisma/client'

const prisma = new PrismaClient()

type ResponseData = {
    message: string
} | Update[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { shopId } = req.query;

    if (!shopId) {
        return res.status(400).json({ message: 'Shop ID is required' });
    }

    switch (req.method) {
        case 'GET':
            try {
                const updates = await prisma.update.findMany({
                    where: {
                        shopId: String(shopId),
                    },
                    orderBy: {
                        postedAt: 'desc'
                    },
                });
                res.status(200).json(updates);
            } catch (error) {
                res.status(500).json({ message: 'Error getting updates for shopId: ' + shopId + ' Error: ' + error.message });
            }
            break;
        case 'DELETE':
            const body = req.body;
            if (!Array.isArray(body.ids) || body.ids.length === 0) {
                return res.status(400).json({ message: 'Invalid input for batch delete' });
            }
            try {
                await prisma.update.deleteMany({
                    where: {
                        id: {
                            in: body.ids,
                        },
                        shopId: String(shopId),
                    },
                });
                res.status(200).json({ message: 'Updates for shopId: ' + shopId + ' deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting updates for shopId: ' + shopId + ' Error: ' + error.message });
            }
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}