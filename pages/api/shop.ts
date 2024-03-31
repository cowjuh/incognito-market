import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Shop } from '@prisma/client'

const prisma = new PrismaClient()

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const body = req.body;

        try {
            const dataToUpdate: Partial<Shop> = {};
            if (body.profilePicture) {
                dataToUpdate.profilePicture = body.profilePicture;
            }
            if (body.name) {
                dataToUpdate.name = body.name;
            }

            const shop = await prisma.shop.update({
                where: { id: body.id },
                data: dataToUpdate,
            });

            console.log('Shop updated successfully', shop);
            res.status(200).json({ message: 'Shop updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Shop: ' + error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const shop = await prisma.shop.findUnique({
                where: { id: String(id) },
            });
            if (!shop) {
                res.status(404).json({ message: 'Shop not found' });
            } else {
                res.status(200).json({ message: 'Shop found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error getting Shop: ' + error.message });
        }
    }

    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}