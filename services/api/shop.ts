import axios from 'axios';
import { ShopWithRelations } from 'pages/api/shop';

export const getShop = async (id: string): Promise<ShopWithRelations> => {
    try {
        const response = await axios.get(`/api/shop?id=${id}`);
        console.log('getShop response', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching shop: ', error);
        throw error;
    }
};

export const updateShop = async (id: string, data: Partial<ShopWithRelations>) => {
    try {
        const response = await axios.put(`/api/shop`, {
            id,
            ...data
        });
        return response.data;
    } catch (error) {
        console.error('Error updating shop: ', error);
        throw error;
    }
};

export const createShop = async (data: Partial<ShopWithRelations>) => {
    try {
        console.log('createShop data', data)
        if (!data.ownerId) {
            throw new Error('Owner ID is required to create a shop');
        }
        const response = await axios.post(`/api/shop`, data);
        console.log('createShop response', response)
        return response.data;
    } catch (error) {
        console.error('Error creating shop: ', error);
        throw error;
    }
};