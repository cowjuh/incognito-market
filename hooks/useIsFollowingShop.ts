import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isUserFollowingShop } from 'services/api/isFollowing'; // Adjust the import path as needed

const useIsFollowingShop = ({ shopId }: { shopId: string }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkFollowStatus = async () => {
            if (session?.user?.id && shopId) {
                try {
                    const status = await isUserFollowingShop(session.user.id, shopId);
                    setIsFollowing(status);
                } catch (error) {
                    console.error('Error checking follow status:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkFollowStatus();
    }, [session?.user?.id, shopId]);

    return { isFollowing, loading };
};

export default useIsFollowingShop;
