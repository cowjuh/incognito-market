import React, { useRef } from "react"
import { PostProps } from "../components/Post"
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import PaddedLayout from "../layout/PaddedLayout";
import Avatar from "@/Avatar";
import ShopPreviewCard from "@/shop/ShopPreviewCard";

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
          <PaddedLayout className="grid grid-cols-3 gap-4">
            {shops.map((shop) => (
              <ShopPreviewCard key={shop.id} shop={shop} />
            ))}
          </PaddedLayout>
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
