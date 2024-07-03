import axios from 'axios';

export const followShop = async (userId: string, shopId: string) => {
    try {
        const response = await axios.post('/api/follow', { userId, shopId });
        return response.data;
    } catch (error) {
        console.error('Error following shop: ', error);
        throw error;
    }
};

export const unfollowShop = async (userId: string, shopId: string) => {
    try {
        const response = await axios.delete('/api/follow', { data: { userId, shopId } });
        return response.data;
    } catch (error) {
        console.error('Error unfollowing shop: ', error);
        throw error;
    }
};


export const getFollowingShops = async (userId: string) => {
    try {
        const response = await axios.get(`/api/follows?userId=${userId}`);
        return response.data.following;
    } catch (error) {
        console.error('Error getting following shops: ', error);
        throw error;
    }
};

export const getFollowers = async (shopId: string) => {
    try {
        const response = await axios.get(`/api/follows?shopId=${shopId}`);
        return response.data.followers;
    } catch (error) {
        console.error('Error getting followers: ', error);
        throw error;
    }
};