import axios from 'axios';

export const getShops = async () => {
    try {
        const response = await axios.get('/api/shops');
        return response.data;
    } catch (error) {
        console.error('Error fetching shops: ', error);
        throw error;
    }
};