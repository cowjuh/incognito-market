import axios from 'axios';
import { Rating } from '@prisma/client';

export const getRating = async (id: string): Promise<Rating> => {
    try {
        const response = await axios.get(`/api/rating?id=${id}`);
        console.log('getRating response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching rating: ', error);
        throw error;
    }
};

export const updateRating = async (id: string, data: Partial<Rating>) => {
    try {
        const response = await axios.put(`/api/rating`, {
            id,
            ...data
        });
        console.log('updateRating response', response);
        return response.data;
    } catch (error) {
        console.error('Error updating rating: ', error);
        throw error;
    }
};

export const createRating = async (data: Partial<Rating>) => {
    try {
        console.log('createRating data', data);
        const response = await axios.post(`/api/rating`, data);
        console.log('createRating response', response);
        return response.data;
    } catch (error) {
        console.error('Error creating rating: ', error);
        throw error;
    }
};

export const deleteRating = async (id: string) => {
    try {
        const response = await axios.delete(`/api/rating`, { data: { id } });
        console.log('deleteRating response', response);
        return response.data;
    } catch (error) {
        console.error('Error deleting rating: ', error);
        throw error;
    }
};
