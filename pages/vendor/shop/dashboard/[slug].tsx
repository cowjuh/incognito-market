import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { Button } from "@/ui/button";
import DashboardStats from "@/vendor/manage/DashboardStats";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import VendorShopLayout from "layout/VendorShopLayout";
import { useRouter } from "next/router";
import { useShop } from "hooks/api/shop";

const VendorShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data: shop } = useShop(slug as string);
    const showSkeleton = !shop;

    const handleVisit = () => {
        router.push(`/shop/${slug}`);
    }

    if (!shop) return null;

    return (
        <div className="w-full">
            <div className="w-full flex items-start justify-between p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">{shop.name}</h1>
                    <p className="text-sm text-muted-foreground">Your shop at a glance</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-neutral-500">Published 20 mins ago</p>
                    <Button onClick={handleVisit}>
                        Visit
                    </Button>
                </div>
            </div>
            <div className="p-4">
                <DashboardStats views={78} clicks={123} sales={50} newCustomers={12} />
            </div>
        </div>
    )
}

VendorShopPage.getLayout = (page) => {
    return (
        <MainLayout>
            <FullWidthLayout className="flex flex-row flex-grow py-0">
                <VendorShopLayout>
                    {page}
                </VendorShopLayout>
            </FullWidthLayout>
        </MainLayout>
    )
};

export default VendorShopPage;

