import ShopPreviewCard from '@/shop/ShopPreviewCard'
import { useUserShops } from 'hooks/useUserShops'
import MainLayout from 'layout/MainLayout'
import { NextPageWithLayout } from 'layout/NextPageWithLayout'
import PaddedLayout from 'layout/PaddedLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const UserShops: NextPageWithLayout = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: session } = useSession();
    const { shops, loading: shopsLoading } = useUserShops(userId as string)

    return (
        <div>
            {session &&
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl'>My shops</h1>
                    <div className="flex flex-wrap gap-4">
                        {!shopsLoading && shops.map((shop) => (
                            <ShopPreviewCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                </div>
            }
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