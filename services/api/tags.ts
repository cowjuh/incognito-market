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

// Function to fetch a single tag by name
export const getTagByName = async (tagName: string): Promise<Tag> => {
    try {
        const response = await axios.get(`/api/tags?tagName=${encodeURIComponent(tagName)}`);
        console.log('fetchTagByName response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching tag by name:', tagName, error);
        throw error;
    }
};

// Function to fetch a single tag by ID
export const getTagById = async (tagId: string): Promise<Tag> => {
    try {
        const response = await axios.get(`/api/tags?tagId=${encodeURIComponent(tagId)}`);
        console.log('fetchTagById response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching tag by ID:', tagId, error);
        throw error;
    }
};
