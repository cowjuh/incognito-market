import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient, Shop } from '@prisma/client'

const prisma = new PrismaClient()

const shopWithRelations = Prisma.validator<Prisma.ShopDefaultArgs>()({
    include: { owner: true, socialMedia: true, featuredItems: true, updates: true, shopTags: true },
});

export type ShopWithRelations = Prisma.ShopGetPayload<typeof shopWithRelations>;

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ShopWithRelations>
) {
    const body = req.body;

    if (req.method === 'POST') {
        // Handle shop creation
        try {
            console.log('Creating Shop with body:', body);
            const shop = await prisma.shop.create({
                data: body,
            });

            console.log('Shop created successfully', shop);
            res.status(200).json({ message: 'Shop created successfully:' + shop.id });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Shop: ' + error.message });
        }
    } else if (req.method === 'PUT') {
        // Handle shop update
        try {
            const dataToUpdate: Partial<Shop> = {};
            const updatableFields = [
                'name',
                'username',
                'email',
                'phoneNumber',
                'websiteLink',
                'bio',
                'description',
                'physicalAddress',
                'country',
                'state',
                'city',
                'profilePicture',
                'headerImage',
            ];
            updatableFields.forEach(field => {
                if (body[field] !== undefined) {
                    dataToUpdate[field] = body[field];
                }
            });

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
                include: {
                    owner: true,
                    socialMedia: true,
                    featuredItems: true,
                    updates: true,
                    shopTags: {
                        include: {
                            tag: true
                        }
                    }
                },
            });
            if (!shop) {
                res.status(404).json({ message: 'Shop not found' });
            } else {
                res.status(200).json(shop);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error getting Shop: ' + error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}