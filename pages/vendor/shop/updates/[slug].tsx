import UpdateCard from "@/shop/UpdateCard";
import { Button } from "@/ui/button";
import CreateUpdateDialog from "@/vendor/updates/CreateUpdateDialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useShop } from "hooks/useShop";
import { useShopUpdates } from "hooks/useShopUpdates";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import VendorShopLayout from "layout/VendorShopLayout";
import { useRouter } from "next/router";
import { FormMode } from "types/form";
import { formatPostedAt } from "utils/stringUtils";

const ShopUpdatesPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { updates } = useShopUpdates({ shopId: slug as string });
    return <div>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">Announcements</h1>
                    <p className="text-sm text-muted-foreground">Make and modify announcements</p>
                </div>
                <CreateUpdateDialog shopId={slug as string} mode={FormMode.CREATE}>
                    <Button>
                        Create Update
                    </Button>
                </CreateUpdateDialog>
            </div>
            {updates.map((update) => (
                <UpdateCard key={update.id} update={update} shopId={slug as string} isVendorView />
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
