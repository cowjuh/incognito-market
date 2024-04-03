import React, { useRef } from "react"
import { PostProps } from "../components/Post"
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { formatPlural } from "utils/stringUtils";
import FilterPanel from "@/FilterPanel";
import FullWidthLayout from "layout/FullWidthLayout";

type Props = {
  feed: PostProps[]
}

const Home: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const { shops, loading: shopsLoading, error: shopsError } = useShops();
  const router = useRouter();

  return (
    <main>
      <MainLayout>
        {shopsLoading && <p>Loading...</p>}
        <FullWidthLayout className="flex flex-row divide-x flex-grow">
          <FilterPanel />
          <div className="flex flex-col p-4 gap-2 w-full">
            <div className=" text-neutral-400">
              {formatPlural(shops.length, 'shop', 'shops')}
            </div>
            <div className="flex flex-wrap gap-4">
              {shops.map((shop) => (
                <ShopPreviewCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>
        </FullWidthLayout>
      </MainLayout>
    </main>
  )
}

export default Home
