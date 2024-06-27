import React, { Suspense, useRef } from "react"
import { PostProps } from "../components/Post"
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { formatPlural } from "utils/stringUtils";
import ShopperLayout from "layout/ShopperLayout";

type Props = {
  feed: PostProps[]
}

const Home: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const { shops, loading: shopsLoading, error: shopsError } = useShops();
  const router = useRouter();

  return (
    <ShopperLayout>
      <div className="flex flex-col p-4 gap-2 w-full">
        <div className=" text-neutral-400">
          {!shopsLoading && formatPlural(shops.length, 'shop', 'shops')}
          {shopsLoading && 'Loading shops...'}
        </div>
        <div className="flex flex-wrap gap-4">
          {!shopsLoading && shops.map((shop) => (
            <ShopPreviewCard key={shop.id} shop={shop} />
          ))}
          {shopsLoading &&
            <div>Loading...</div>

          }
        </div>
      </div>
    </ShopperLayout>
  )
}

export default Home
