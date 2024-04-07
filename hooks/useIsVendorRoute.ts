import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useIsVendorRoute = () => {
    const router = useRouter();
    const [isVendorRoute, setIsVendorRoute] = useState(router.pathname.startsWith('/vendor'));

    useEffect(() => {
        setIsVendorRoute(router.pathname.startsWith('/vendor'));
    }, [router.pathname]);

    return isVendorRoute;
};