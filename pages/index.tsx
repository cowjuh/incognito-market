import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout"
import { PostProps } from "../components/Post"
import supabase, { SupabaseStorageUploadResponse, deleteImage } from '../utils/supabase/supabaseClient';
import Image from "next/image";
import { PrismaClient, Shop } from '@prisma/client'
import { getShops } from "../services/api/shops";
import { formatPublicUrl } from "../utils/supabase/supabaseHelpers";
import { getShop, updateShop } from '../services/api/shop';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const prisma = new PrismaClient()

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = () => {
  const fileInput = useRef(null);

  const handleUpload = async () => {
    const file = fileInput.current.files[0];
    const uniqueId = uuidv4();
    const uniqueFilename = `${uniqueId}-${file.name}`;
    const filePath = `users/${uniqueFilename}`;
    const shop: Shop = await getShop('clufxw74e00014fxsthgnbfd7')
    console.log('the shoppp', shop)

    if (!shop) {
      console.error('Shop not found');
      return;
    }
    const oldProfilePicturePublicURL = shop.profilePicture;
    console.log('oldProfilePicturePublicURL', oldProfilePicturePublicURL)

    if (file) {
      let { error, data } = await supabase.storage.from('media').upload(filePath, file);
      if (error) {
        console.error('Error uploading file: ', error);
      } else {
        const uploadData = data as SupabaseStorageUploadResponse;
        const timestampedPath = uploadData.path
        console.log('File uploaded successfully', uploadData);

        const publicURL = formatPublicUrl('media', uploadData.path);
        console.log('publicURL', publicURL)

        // Update the Shop record with the new image path
        try {
          const responseData = await updateShop('clufxw74e00014fxsthgnbfd7', { profilePicture: publicURL });
          console.log('Response data: ', responseData);

          // Delete the old profile picture
          if (oldProfilePicturePublicURL) {
            const filename = path.basename(oldProfilePicturePublicURL);
            console.log('filename', filename)
            await deleteImage(`users/${filename}`);
          }
        } catch (error) {
          console.error('Error updating Shop: ', error);
        }
      }
    }
  };

  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops();
        console.log('Shops: ', data.shops)
        setShops(data.shops);
      } catch (error) {
        console.error('Error fetching shops: ', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <input type="file" ref={fileInput} />
          <button onClick={handleUpload}>Upload image</button>
          <div>
            {shops.map((shop) => (
              <div key={shop.id}>
                <h2>{shop.name}</h2>
                <p>{shop.description}</p>
                <div className="text-xs">{shop.profilePicture}</div>
                <Image src={shop.profilePicture} alt="Picture of the author" width={500} height={500} className="w-[200px] h-auto rounded-sm" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Blog
