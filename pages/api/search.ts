import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { ShopWithRelations } from './shop';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ShopWithRelations | { message: string } | ShopWithRelations[]>
) {
    const { term, city, country, averageRating } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    try {
        const filters: any = {};

        if (city) filters.city = city as string;
        if (country) filters.country = country as string;
        if (averageRating) filters.averageRating = { gte: Number(averageRating) };

        const whereClause = {
            AND: [
                term
                    ? {
                        OR: [
                            { name: { contains: term as string, mode: 'insensitive' } },
                            { description: { contains: term as string, mode: 'insensitive' } },
                            { bio: { contains: term as string, mode: 'insensitive' } }
                        ]
                    }
                    : {},
                filters
            ]
        };

        const shops = await prisma.shop.findMany({
            where: whereClause,
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
            },
            orderBy: { name: 'asc' }
        });

        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ message: `Error retrieving shops: ${error.message}` });
    } finally {
        await prisma.$disconnect();
    }
}
