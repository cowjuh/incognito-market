import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Update } from '@prisma/client'

const prisma = new PrismaClient()

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | Update>
) {
    const body = req.body;

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const update = await prisma.update.findUnique({
                    where: { id: String(id) },
                });
                if (!update) {
                    res.status(404).json({ message: 'Update not found' });
                } else {
                    res.status(200).json(update);
                }
            } catch (error) {
                res.status(500).json({ message: 'Error getting Update: ' + error.message });
            }
            break;
        case 'POST':
            try {
                const update = await prisma.update.create({
                    data: body,
                });
                res.status(200).json({ message: 'Update created successfully:' + update.id });
            } catch (error) {
                res.status(500).json({ message: 'Error creating Update: ' + error.message });
            }
            break;
        case 'PUT':
            try {
                const dataToUpdate: Partial<Update> = {};
                const updatableFields = ['title', 'content', 'callToActionText', 'callToActionLink'];
                updatableFields.forEach(field => {
                    if (body[field] !== undefined) {
                        dataToUpdate[field] = body[field];
                    }
                });
                const update = await prisma.update.update({
                    where: { id: body.id },
                    data: dataToUpdate,
                });
                res.status(200).json({ message: 'Update updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating Update: ' + error.message });
            }
            break;
        case 'DELETE':
            try {
                await prisma.update.delete({
                    where: { id: body.id },
                });
                res.status(200).json({ message: 'Update deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting Update: ' + error.message });
            }
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}