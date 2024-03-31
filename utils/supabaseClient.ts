import { createClient } from "@supabase/supabase-js";

export interface SupabaseStorageUploadResponse {
    fullPath: string;
    id: string;
    path: string;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default supabase;
