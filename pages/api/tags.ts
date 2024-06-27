import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tag | { message: string } | Tag[]>
) {
    const { tagId, tagName } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    try {
        if (tagId) {
            const tag = await prisma.tag.findUnique({
                where: { id: tagId as string },
            });
            tag ? res.status(200).json(tag) : res.status(404).json({ message: 'Tag not found' });
            return;
        }

        if (tagName) {
            const tag = await prisma.tag.findUnique({
                where: { name: tagName as string },
            });
            tag ? res.status(200).json(tag) : res.status(404).json({ message: 'Tag not found' });
            return;
        }

        // Default to fetching all tags if no specific identifier is provided
        const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: `Error retrieving tags: ${error.message}` });
    }
}
