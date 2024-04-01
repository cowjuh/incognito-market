import { useState, useEffect } from 'react';
import { getShops } from '../services/api/shops';
import { ShopWithRelations } from 'pages/api/shop';

export const useShops = () => {
    const [shops, setShops] = useState<ShopWithRelations[]>([]);
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