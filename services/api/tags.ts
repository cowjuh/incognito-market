import { Tag } from '@prisma/client';
import axios from 'axios';

export const getAllTags = async (): Promise<Tag[]> => {
    try {
        const response = await axios.get('/api/tags');
        console.log('fetchAllTags response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching tags', error);
        throw error;
    }
};
