import React, { useRef } from "react"
import { PostProps } from "../components/Post"
import Image from "next/image";
// import { handleUpload } from "../services/uploadService";
import { useShops } from "../hooks/useShops";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import PaddedLayout from "../layout/PaddedLayout";

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
            <PaddedLayout>
              {shops.map((shop) => (
                <div
                  onClick={() => router.push(`/shop/${shop.id}`)}
                  key={shop.id}
                  className="border rounded-md flex flex-col gap-2 p-2"
                >
                  <span>{shop.name}</span>
                  <p>{shop.bio}</p>
                  <p>{shop.email}</p>
                  <Image src={shop.profilePicture} alt="Picture of the author" width={500} height={500} className="w-[200px] h-auto rounded-sm" />
                  {/* <input type="file" ref={fileInput} />
                <button onClick={() => handleUpload(fileInput.current, shop.id)}>Upload image</button> */}
                </div>
              ))}
            </PaddedLayout>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Blog
