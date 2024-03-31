import { createClient } from "@supabase/supabase-js";

export interface SupabaseStorageUploadResponse {
    fullPath: string;
    id: string;
    path: string;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const deleteImage = async (path: string) => {
    console.log('deleting this path', path)
    const { error } = await supabase.storage.from('media').remove([path])
    if (error) {
        console.error('Error deleting image: ', error);
    } else {
        console.log('Request to delete image was successful. If the image existed, it has been deleted.', path);

    }
}

export default supabase;
