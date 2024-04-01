import { useRouter } from "next/router";
import { useShop } from "../../hooks/useShop";
import MainLayout from "../../layout/MainLayout";
import FullWidthLayout from "../../layout/FullWidthLayout";
import { ReactNode } from "react";
import { NextPageWithLayout } from "../../layout/NextPageWithLayout";
import Link from "next/link";
import Avatar from "@/Avatar";
import { Skeleton } from "@/ui/skeleton";

const ShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { shop, loading, error } = useShop(slug as string);
    const showSkeleton = !shop || loading;

    return (
        <div className="max-w-[1500px] w-full">
            <div className="p-4 pb-0 w-full">
                <Link href={`/`}>
                    Back
                </Link>
            </div>
            <div className="flex w-full h-full">
                <div className="w-[20%] min-w-[300px] max-w-[400px] flex flex-col gap-4 flex-grow p-4">
                    {shop &&
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Avatar src={shop.profilePicture} alt="Picture of the author" className="h-20 w-20" />
                                <h2 className="text-lg">{shop.name}</h2>
                                <p className="text-gray-400">@{shop.username}</p>
                                <p>{shop.bio}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-400">CONTACT</h3>
                                <p>{shop.websiteLink}</p>
                                <p>{shop.email}</p>
                                <p>{shop.phoneNumber}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-400">LOCATION</h3>
                                <p>{shop.city}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="p-4 flex flex-col gap-8 w-full">
                    <div className="w-full">
                        <h3 className="font-medium text-gray-400">ABOUT</h3>
                        <div className="max-w-[600px]">
                            {shop && !showSkeleton && shop.description}
                            {showSkeleton &&
                                <div className="w-full flex flex-col gap-3">
                                    <Skeleton className="w-full bg-gray-100 h-4" />
                                    <Skeleton className="w-full bg-gray-100 h-4" />
                                    <Skeleton className="w-full bg-gray-100 h-4" />
                                    <Skeleton className="w-[50%] bg-gray-100 h-4" />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-400">FEATURED ITEMS</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

ShopPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <MainLayout>
            <FullWidthLayout className="flex items-center">
                {page}
            </FullWidthLayout>
        </MainLayout>
    )
}

export default ShopPage;