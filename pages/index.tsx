import React, { useRef } from "react"
import { PostProps } from "../components/Post"
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import PaddedLayout from "../layout/PaddedLayout";
import ShopPreviewCard from "@/shop/ShopPreviewCard";
import { formatPlural } from "utils/stringUtils";

type Props = {
  feed: PostProps[]
}

const Home: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const { shops, loading: shopsLoading, error: shopsError } = useShops();
  const router = useRouter();

  return (
    <MainLayout>
      <main>
        <div>
          {shopsLoading && <p>Loading...</p>}
          <PaddedLayout >
            <div>
              {formatPlural(shops.length, 'shop', 'shops')}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {shops.map((shop) => (
                <ShopPreviewCard key={shop.id} shop={shop} />
              ))}
            </div>
          </PaddedLayout>
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
