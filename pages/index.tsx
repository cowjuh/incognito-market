import React, { useRef } from "react"
import Layout from "../components/Layout"
import { PostProps } from "../components/Post"
import supabase, { SupabaseStorageUploadResponse } from '../utils/supabaseClient';
import Image from "next/image";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = () => {
  const fileInput = useRef(null);
  const data = supabase.storage.from('media').getPublicUrl('users/6D167EFA-237A-4BF4-B4CE-D15BFA66B189.JPG')

  const handleUpload = async () => {
    const file = fileInput.current.files[0];
    const filePath = `users/${file.name}`;

    if (file) {
      let { error, data } = await supabase.storage.from('media').upload(filePath, file);
      if (error) {
        console.error('Error uploading file: ', error);
      } else {
        const uploadData = data as SupabaseStorageUploadResponse;
        console.log('File uploaded successfully', uploadData);
        // Construct the public URL of the uploaded file
        const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${uploadData.fullPath}`;

        // Update the Shop record with the new image path
        const response = await fetch('/api/shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 'clufxw74e00014fxsthgnbfd7',
            publicUrl: publicURL,
          }),
        });

        if (!response.ok) {
          console.error('Error updating Shop: ', await response.text());
        } else {
          const responseData = await response.json();
          console.log('Response data: ', responseData);
        }
      }
    }
  };


  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <Image src={data.data.publicUrl} alt="Picture of the author" width={500} height={500} className="w-[200px] h-auto rounded-sm" />
          <input type="file" ref={fileInput} />
          <button onClick={handleUpload}>Upload image</button>
        </main>
      </div>
    </Layout>
  )
}

export default Blog
