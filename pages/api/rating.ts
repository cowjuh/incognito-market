import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type RatingResponseData = {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RatingResponseData | Prisma.RatingGetPayload<{}>>
) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            return await handlePost(req, res);
        case 'PUT':
            return await handlePut(req, res);
        case 'GET':
            return await handleGet(req, res);
        case 'DELETE':
            return await handleDelete(req, res);
        default:
            res.setHeader('Allow', ['POST', 'PUT', 'GET', 'DELETE']);
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<RatingResponseData>) {
    try {
        const { score, comment, userId, shopId } = req.body;
        const result = await prisma.$transaction(async (prisma) => {
            const newRating = await prisma.rating.create({
                data: { score, comment, userId, shopId },
            });

            const shop = await prisma.shop.findUnique({
                where: { id: shopId },
                include: { ratings: true }
            });

            const numberOfRatings = shop.ratings.length;
            const currentAverage = shop.averageRating || 0;
            const newAverage = ((currentAverage * numberOfRatings) + newRating.score) / (numberOfRatings + 1);

            await prisma.shop.update({
                where: { id: shopId },
                data: { averageRating: newAverage }
            });

            return newRating;
        });

        res.status(201).json({ message: 'Rating created successfully: ' + result.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rating: ' + error.message });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse<RatingResponseData>) {
    try {
        const { id, score, comment } = req.body;
        const result = await prisma.$transaction(async (prisma) => {
            const existingRating = await prisma.rating.findUnique({ where: { id } });
            const updatedRating = await prisma.rating.update({
                where: { id },
                data: { score, comment },
            });

            const shop = await prisma.shop.findUnique({
                where: { id: existingRating.shopId },
                include: { ratings: true }
            });

            const numberOfRatings = shop.ratings.length;
            const currentAverage = shop.averageRating;
            const oldScore = existingRating.score;
            const newAverage = ((currentAverage * numberOfRatings) - oldScore + updatedRating.score) / numberOfRatings;

            await prisma.shop.update({
                where: { id: shop.id },
                data: { averageRating: newAverage }
            });

            return updatedRating;
        });

        res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating rating: ' + error.message });
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Prisma.RatingGetPayload<{}> | RatingResponseData>) {
    try {
        const { id } = req.query;
        const rating = await prisma.rating.findUnique({
            where: { id: String(id) },
        });
        if (!rating) {
            res.status(404).json({ message: 'Rating not found' });
        } else {
            res.status(200).json(rating);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rating: ' + error.message });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<RatingResponseData>) {
    try {
        const { id } = req.body; // Assuming the rating ID to delete is sent in the body
        const result = await prisma.$transaction(async (prisma) => {
            const ratingToDelete = await prisma.rating.findUnique({
                where: { id },
                include: { shop: true }
            });

            if (!ratingToDelete) {
                throw new Error("Rating not found");
            }

            const shopId = ratingToDelete.shopId;
            const oldScore = ratingToDelete.score;

            await prisma.rating.delete({
                where: { id }
            });

            const shop = await prisma.shop.findUnique({
                where: { id: shopId },
                include: { ratings: true }
            });

            const numberOfRatings = shop.ratings.length;
            let newAverage;

            // Check if there are remaining ratings after deletion
            if (numberOfRatings > 1) {
                newAverage = ((shop.averageRating * (numberOfRatings + 1)) - oldScore) / numberOfRatings;
            } else {
                // If no ratings left, reset average rating
                newAverage = 0;
            }

            await prisma.shop.update({
                where: { id: shopId },
                data: { averageRating: newAverage }
            });

            return { deletedRatingId: id, newAverage };
        });

        res.status(200).json({ message: 'Rating deleted successfully and average updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rating: ' + error.message });
    }
}

