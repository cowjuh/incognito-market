import { Shop } from '@prisma/client';
import axios from 'axios';
import { ShopWithRelations } from 'pages/api/shop';

export const getShopsByTagId = async (tagId: string): Promise<ShopWithRelations[]> => {
    try {
        const response = await axios.get(`/api/shopTags?tagId=${encodeURIComponent(tagId)}`);
        console.log('fetchShopsByTagId response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching shops for tagId:', tagId, error);
        throw error;
    }
};
