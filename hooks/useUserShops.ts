import { useState, useEffect } from 'react';
import { getShopsByOwner } from '../services/api/shops';
import { ShopWithRelations } from 'pages/api/shop';

export const useUserShops = (ownerId: string | undefined) => {
    const [shops, setShops] = useState<ShopWithRelations[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ownerId) return;
        const fetchShops = async () => {
            setLoading(true);
            try {
                const data = await getShopsByOwner(ownerId);
                setShops(data.shops);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchShops();
    }, [ownerId]);

    return { shops, loading, error };
};