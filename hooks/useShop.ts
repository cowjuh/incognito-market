import { useState, useEffect } from 'react';
import { getShop } from '../services/api/shop';
import { ShopWithRelations } from 'pages/api/shop';

export const useShop = (shopID: string) => {
    const [shop, setShop] = useState<ShopWithRelations | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!shopID) return;
        const fetchShop = async () => {
            setLoading(true);
            try {
                const shop = await getShop(shopID);
                setShop(shop);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchShop();
    }, [shopID]);

    return { shop, loading, error };
};