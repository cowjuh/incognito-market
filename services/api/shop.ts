import { Shop } from '@prisma/client';
import axios from 'axios';

export const getShop = async (id: string): Promise<Shop> => {
    try {
        const response = await axios.get(`/api/shop?id=${id}`);
        console.log('getShop response', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching shop: ', error);
        throw error;
    }
};

export const updateShop = async (id: string, data: Partial<Shop>) => {
    try {
        const response = await axios.post(`/api/shop`, {
            id,
            ...data
        });
        return response.data;
    } catch (error) {
        console.error('Error updating shop: ', error);
        throw error;
    }
};

