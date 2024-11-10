import { EntityEditorForm } from "@/vendor/entityEditor/EntityEditorForm";
import MembersList from "@/vendor/manage/MembersList";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import VendorShopLayout from "layout/VendorShopLayout";
import { useRouter } from "next/router";
import { useShop } from "hooks/api/shop";
import { FormMode } from "types/form";

const ShopDetailsPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data: shop } = useShop(slug as string);
    const showSkeleton = !shop;

    if (!shop) return null;

    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-between p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">Shop Details</h1>
                    <p className="text-sm text-muted-foreground">Edit shop details</p>
                </div>
            </div>
            <div className="p-4 pt-0 flex items-center">
                <EntityEditorForm mode={FormMode.EDIT} entity={shop} key={shop.id} />
            </div>
        </div>
    )
}

ShopDetailsPage.getLayout = (page) => {
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

export default ShopDetailsPage;

