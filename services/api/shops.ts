import axios from 'axios';

export const getAllShops = async () => {
    try {
        const response = await axios.get('/api/shops');
        return response.data;
    } catch (error) {
        console.error('Error fetching shops: ', error);
        throw error;
    }
};

export const getShopsByOwner = async (ownerId: string) => {
    try {
        const response = await axios.get(`/api/shops?ownerId=${ownerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shops for owner: ', ownerId, error);
        throw error;
    }
}