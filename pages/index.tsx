import React from "react"
import Layout from "../components/Layout"
import { PostProps } from "../components/Post"
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const data = supabase.storage.from('media').getPublicUrl('users/6D167EFA-237A-4BF4-B4CE-D15BFA66B189.JPG')

  React.useEffect(() => {
    console.log('data', data);
  }, [data]);


  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <Image src={data.data.publicUrl} alt="Picture of the author" width={500} height={500} className="w-[200px] h-auto rounded-sm" />
        </main>
      </div>
    </Layout>
  )
}

export default Blog
