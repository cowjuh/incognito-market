import { Shop } from '@prisma/client';
import axios from 'axios';
import { ShopWithRelations } from 'pages/api/shop';

const buildQueryString = (params: { [key: string]: string | number | undefined }): string => {
    const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&');
    return query ? `?${query}` : '';
};

export const getAllShops = async (params: { term?: string; city?: string; country?: string; averageRating?: number }): Promise<ShopWithRelations[]> => {
    const response = await axios.get('/api/search', { params });
    return response.data;
};

export const searchShops = async (term: string, filters: { [key: string]: string | number | undefined } = {}): Promise<Shop[]> => {
    try {
        const queryString = buildQueryString({ term, ...filters });
        console.log('searchShops queryString', queryString);
        const response = await axios.get(`/api/search${queryString}`);
        console.log('searchShops response', response);
        return response.data;
    } catch (error) {
        console.error('Error searching shops with term:', term, error);
        throw error;
    }
};
