import { Button } from "@/ui/button";
import CreateUpdateDialog from "@/vendor/updates/CreateUpdateDialog";
import { useShop } from "hooks/useShop";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import VendorShopLayout from "layout/VendorShopLayout";
import { useRouter } from "next/router";
import { formatPostedAt } from "utils/stringUtils";

const ShopUpdatesPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { shop } = useShop(slug as string);
    return <div>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">Updates</h1>
                <CreateUpdateDialog shopId={shop?.id} />
            </div>
            {shop?.updates.map((update) => (
                <div key={update.id} className="flex flex-col gap-2 p-4 border rounded-md">
                    <div className="font-medium">{update.title}</div>
                    <div>{update.content}</div>
                    <div className="text-neutral-500">{formatPostedAt(String(update.postedAt))}</div>
                </div>
            ))}
        </div>
    </div>;
};

ShopUpdatesPage.getLayout = (page) => {
    return (
        <MainLayout>
            <FullWidthLayout className="flex flex-row flex-grow py-0">
                <VendorShopLayout className="p-4">
                    {page}
                </VendorShopLayout>
            </FullWidthLayout>
        </MainLayout>
    )
};

export default ShopUpdatesPage;
