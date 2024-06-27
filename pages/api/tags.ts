import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Tag } from '@prisma/client'

const prisma = new PrismaClient()

type ResponseData = {
    message: string
} | Tag[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        try {
            const tags = await prisma.tag.findMany({
                orderBy: {
                    name: 'asc'  // Assuming you'd like to return tags alphabetically
                },
            });
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tags: ' + error.message });
        }
    } else {
        // Only GET method is allowed for this route
        res.status(405).json({ message: 'Method not allowed' });
    }
}
