export function formatPublicUrl(bucketName: string, fullPath: string): string {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fullPath}`
}