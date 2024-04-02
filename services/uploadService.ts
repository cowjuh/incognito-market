import { getShop, updateShop } from '../services/api/shop';
import { formatPublicUrl } from "../utils/supabase/supabaseHelpers";
import { deleteImage } from '../utils/supabase/supabaseClient';
import supabase, { SupabaseStorageUploadResponse } from '../utils/supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ShopWithRelations } from 'pages/api/shop';

export const uploadFile = async (file: File) => {
    const uniqueId = uuidv4();
    const uniqueFilename = `${uniqueId}-${file.name}`;
    const filePath = `users/${uniqueFilename}`;

    let { error, data } = await supabase.storage.from('media').upload(filePath, file);
    if (error) {
        console.error('Error uploading file: ', error);
        return null;
    } else {
        const uploadData = data as SupabaseStorageUploadResponse;
        const publicURL = formatPublicUrl('media', uploadData.path);
        return publicURL;
    }
};

export const updateShopProfilePicture = async (shopId: string, newProfilePictureURL: string) => {
    try {
        const responseData = await updateShop(shopId, { profilePicture: newProfilePictureURL });
        return responseData;
    } catch (error) {
        console.error('Error updating Shop: ', error);
        return null;
    }
};

export const deleteOldProfilePicture = async (oldProfilePicturePublicURL: string) => {
    if (oldProfilePicturePublicURL) {
        const filename = path.basename(oldProfilePicturePublicURL);
        await deleteImage(`users/${filename}`);
    }
};

export const handleUpload = async (file: File, shopId: string) => {
    const shop: ShopWithRelations = await getShop(shopId)

    if (!shop) {
        console.error('Shop not found');
        return;
    }

    const newProfilePictureURL = await uploadFile(file);
    if (newProfilePictureURL) {
        await updateShopProfilePicture(shopId, newProfilePictureURL);
        await deleteOldProfilePicture(shop.profilePicture);
    }
};