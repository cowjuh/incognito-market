import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { Shop } from "@prisma/client";
import FullWidthLayout from "layout/FullWidthLayout";
import MainLayout from "layout/MainLayout";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import ShopperLayout from "layout/ShopperLayout";
import { useRouter } from "next/router";
import { ShopWithRelations } from "pages/api/shop";
import { useEffect, useState } from "react";
import { getShopsByTagId } from "services/api/shopTags";
import { getTagByName } from "services/api/tags";

const TagPage: NextPageWithLayout = () => {
    const router = useRouter();
    const slug = router.query.slug as string;
    const [shops, setShops] = useState<ShopWithRelations[] | undefined>(undefined);

    useEffect(() => {
        console.log('slug', slug);
        if (slug) {
            const tagName = slug
                .replace(/-/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            if (tagName) {
                getTagByName(tagName).then(tag => {
                    if (tag) {
                        getShopsByTagId(tag.id).then(setShops);
                    }
                });
            }
        }
    }, [slug]);

    return <div>
        <div className="flex flex-wrap gap-4">
            {shops && shops.map((shop) => (
                <ShopPreviewCard shop={shop} />
            ))}
        </div>
    </div>;
};

TagPage.getLayout = (page) => {
    return (
        <ShopperLayout>
            {page}
        </ShopperLayout>
    )
};

export default TagPage;
