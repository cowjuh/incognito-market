import axios from 'axios';

export const getShopUpdates = async (shopId: string): Promise<any[]> => {
    try {
        const response = await axios.get(`/api/updates?shopId=${shopId}`);
        console.log('fetchUpdates response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching updates for shopId:', shopId, error);
        throw error;
    }
};

export const batchDeleteShopUpdates = async (shopId: string, updateIds: string[]): Promise<any> => {
    try {
        const response = await axios.delete('/api/updates', { data: { shopId, ids: updateIds } });
        console.log('batchDeleteUpdates response', response);
        return response.data;
    } catch (error) {
        console.error('Error in batch deleting updates for shopId:', shopId, error);
        throw error;
    }
};