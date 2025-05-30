import { useRouter } from "next/router";
import { ReactNode } from "react";
import ShopSettingsSidebar from "@/vendor/manage/ShopSettingsSidebar";
import FullWidthLayout from "./FullWidthLayout";
import { cn } from "@/lib/utils";
import { useShop } from "hooks/api/shop";
interface VendorShopLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const VendorShopLayout: React.FC<VendorShopLayoutProps> = ({ children, className }) => {
    const router = useRouter();
    const { slug } = router.query;
    const { data: shop } = useShop(slug as string);
    return (
        <div className="flex w-full flex-grow divide-x">
            <ShopSettingsSidebar activeShop={shop} />
            <div className={cn("w-full", className)}>
                {children}
            </div>
        </div>
    )
};

export default VendorShopLayout;
