import { useState, useEffect } from 'react';
import { Update } from '@prisma/client';
import { getShopUpdates } from '../services/api/updates';

interface UseShopUpdatesProps {
    shopId: string;
}

export const useShopUpdates = ({ shopId }: UseShopUpdatesProps) => {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUpdates = async () => {
            setLoading(true);
            try {
                const data = await getShopUpdates(shopId);
                setUpdates(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        if (shopId) {
            fetchUpdates();
        }
    }, [shopId]);

    return { updates, loading, error };
};