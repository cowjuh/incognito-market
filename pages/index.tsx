import React, { useRef } from "react"
import { PostProps } from "../components/Post"
import Image from "next/image";
// import { handleUpload } from "../services/uploadService";
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import PaddedLayout from "../layout/PaddedLayout";
import Avatar from "@/Avatar";
import ShopPreviewCard from "@/shop/ShopPreviewCard";

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const { shops, loading: shopsLoading, error: shopsError } = useShops();
  const router = useRouter();

  return (
    <MainLayout>
      <div className="page">
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
      </div>
    </MainLayout>
  )
}

export default Blog
