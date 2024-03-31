import { useState, useEffect } from 'react';
import { getShops } from '../services/api/shops';
import { Shop } from '@prisma/client';

export const useShops = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true);
            try {
                const data = await getShops();
                setShops(data.shops);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    return { shops, loading, error };
};