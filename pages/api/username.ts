import { isUsernameUnique } from 'backendServices/usernameService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username } = req.body;
        const isUnique = await isUsernameUnique(username);
        res.status(200).json({ isUnique });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}