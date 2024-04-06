import axios from 'axios';

export const getIsUsernameTaken = async (username: string) => {
    try {
        const response = await axios.post('/api/username', { username });
        return response.data.isUnique;
    } catch (error) {
        console.error('Error checking username uniqueness: ', error);
        throw error;
    }
};