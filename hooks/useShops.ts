import { useState, useCallback } from 'react';
import { ShopWithRelations } from 'pages/api/shop';
import { getAllShops } from 'services/api/search';

export const useShops = () => {
    const [shops, setShops] = useState<ShopWithRelations[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchShops = useCallback(async (term?: string, city?: string, country?: string, averageRating?: number) => {
        setLoading(true);
        try {
            const data = await getAllShops({ term, city, country, averageRating });
            setShops(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, []);

    return { shops, loading, error, searchShops };
};
