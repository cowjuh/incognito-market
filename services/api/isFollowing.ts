import axios from 'axios';

export const isUserFollowingShop = async (userId: string, shopId: string): Promise<boolean> => {
    try {
        const response = await axios.get(`/api/isFollowing`, { params: { userId, shopId } });
        return response.data.isFollowing;
    } catch (error) {
        console.error('Error checking follow status: ', error);
        throw error;
    }
};
