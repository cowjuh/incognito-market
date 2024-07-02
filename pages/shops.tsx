import React, { useEffect } from "react";
import { PostProps } from "../components/Post";
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { formatPlural } from "utils/stringUtils";
import ShopperLayout from "layout/ShopperLayout";

type Props = {
    feed: PostProps[];
};

const Shops: React.FC<Props> = () => {
    const router = useRouter();
    const { shops, loading: shopsLoading, error: shopsError, searchShops } = useShops();

    useEffect(() => {
        const query = router.query;

        const term = query.term as string;
        const city = query.city as string;
        const country = query.country as string;
        const averageRating = query.averageRating ? Number(query.averageRating) : undefined;

        if (term || city || country || averageRating !== undefined) {
            searchShops(term, city, country, averageRating);
        }
    }, [router.query, searchShops]);

    return (
        <ShopperLayout>
            <div className="flex flex-col p-4 gap-2 w-full">
                <div className="text-neutral-400">
                    {!shopsLoading && shops && formatPlural(shops.length, "shop", "shops")}
                    {shopsLoading && "Loading shops..."}
                </div>
                <div className="flex flex-wrap gap-4">
                    {!shopsLoading && shops && shops.map((shop) => (
                        <ShopPreviewCard key={shop.id} shop={shop} />
                    ))}
                    {shopsLoading && <div>Loading...</div>}
                </div>
            </div>
        </ShopperLayout>
    );
};

export default Shops;
