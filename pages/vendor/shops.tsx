import ShopPreviewCard from '@/shop/ShopPreviewCard'
import { useUserShops } from 'hooks/useUserShops'
import MainLayout from 'layout/MainLayout'
import { NextPageWithLayout } from 'layout/NextPageWithLayout'
import PaddedLayout from 'layout/PaddedLayout'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const UserShops: NextPageWithLayout = () => {
    const { data: session } = useSession();
    const { shops, loading: shopsLoading } = useUserShops(session?.user?.id);

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl'>My shops</h1>
                <div className="flex flex-wrap gap-4">
                    {shopsLoading && <div>Loading...</div>}
                    {session?.user?.id && !shopsLoading && shops.map((shop) => (
                        <ShopPreviewCard key={shop.id} shop={shop} isVendorView={true} />
                    ))}
                </div>
            </div>
        </div>
    )
}

UserShops.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <PaddedLayout>
                {page}
            </PaddedLayout>
        </MainLayout>
    )
}


export default UserShops