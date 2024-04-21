import axios from 'axios';
import { Update } from '@prisma/client';

export const getUpdate = async (id: string): Promise<Update> => {
    try {
        const response = await axios.get(`/api/update?id=${id}`);
        console.log('getUpdate response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching update: ', error);
        throw error;
    }
};

export const updateUpdate = async (id: string, data: Partial<Update>) => {
    try {
        const response = await axios.put(`/api/update`, {
            id,
            ...data
        });
        console.log('updateUpdate response', response);
        return response.data;
    } catch (error) {
        console.error('Error updating update: ', error);
        throw error;
    }
};

export const createUpdate = async (data: Partial<Update>) => {
    try {
        console.log('createUpdate data', data);
        const response = await axios.post(`/api/update`, data);
        console.log('createUpdate response', response);
        return response.data;
    } catch (error) {
        console.error('Error creating update: ', error);
        throw error;
    }
};

export const deleteUpdate = async (id: string) => {
    try {
        const response = await axios.delete(`/api/update`, { data: { id } });
        console.log('deleteUpdate response', response);
        return response.data;
    } catch (error) {
        console.error('Error deleting update: ', error);
        throw error;
    }
};