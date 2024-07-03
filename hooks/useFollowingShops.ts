import { useState, useCallback, useEffect } from 'react';
import { ShopWithRelations } from 'pages/api/shop';
import { getFollowingShops } from 'services/api/follow';
import { useSession } from 'next-auth/react';

export const useFollowingShops = () => {
    const [shops, setShops] = useState<ShopWithRelations[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const session = useSession();

    useEffect(() => {
        setLoading(true);

        getFollowingShops(session.data?.user?.id).then((data) => {
            setShops(data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, [session.data?.user?.id]);

    return { shops, loading, error };
};
