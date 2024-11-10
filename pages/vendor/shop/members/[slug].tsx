import { Button } from "@/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import MembersList from "@/vendor/manage/MembersList";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import VendorShopLayout from "layout/VendorShopLayout";
import { useRouter } from "next/router";
import { useShop } from "hooks/api/shops";

const MemberShopPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data: shop, isLoading } = useShop(slug as string);
    const showSkeleton = !shop || isLoading;

    if (!shop) return null;

    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-between p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">Members</h1>
                    <p className="text-sm text-muted-foreground">Manage team members</p>
                </div>
            </div>
            <div className="p-4 pt-0 flex items-center">
                <MembersList members={[shop.owner]} />
            </div>
        </div>
    )
}

MemberShopPage.getLayout = (page) => {
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

export default MemberShopPage;

