import React, { useRef } from "react"
import Layout from "../components/Layout"
import { PostProps } from "../components/Post"
import Image from "next/image";
import { handleUpload } from "../services/uploadService";
import { useShops } from "../hooks/useShops";

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const { shops, loading: shopsLoading, error: shopsError } = useShops();

  return (
    <Layout>
      <div className="page">
        <main>
          <div>
            {shopsLoading && <p>Loading...</p>}
            {shops.map((shop) => (
              <div key={shop.id} className="border rounded-md p-2 flex flex-col gap-2">
                <span>{shop.name}</span>
                <p>{shop.bio}</p>
                <p>{shop.email}</p>
                <Image src={shop.profilePicture} alt="Picture of the author" width={500} height={500} className="w-[200px] h-auto rounded-sm" />
                {/* <input type="file" ref={fileInput} />
                <button onClick={() => handleUpload(fileInput.current, shop.id)}>Upload image</button> */}
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Blog
