import React, { useEffect } from "react";
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { formatPlural } from "utils/stringUtils";
import { NextPageWithLayout } from "layout/NextPageWithLayout";
import MainLayout from "layout/MainLayout";
import FullWidthLayout from "layout/FullWidthLayout";
import { getFollowingShops } from "services/api/follow";
import { useSession } from "next-auth/react";
import { useFollowingShops } from "hooks/useFollowingShops";

const AccountPage: NextPageWithLayout = () => {
    const { shops, loading, error } = useFollowingShops();

    return (
        <div className="flex flex-col p-4 gap-2 w-full">
            <div className="flex flex-wrap gap-4">
                {!loading && shops && shops.map((shop) => (
                    <ShopPreviewCard key={shop.id} shop={shop} />
                ))}
            </div>
        </div>
    );
};

AccountPage.getLayout = (page) => (
    <MainLayout>
        <FullWidthLayout className="flex flex-row flex-grow py-0">
            {page}
        </FullWidthLayout>
    </MainLayout>
);


export default AccountPage;
