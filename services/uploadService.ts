import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPublicUrl } from "../utils/supabase/supabaseHelpers";
import { deleteImage } from '../utils/supabase/supabaseClient';
import supabase, { SupabaseStorageUploadResponse } from '../utils/supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ShopWithRelations } from 'pages/api/shop';
import axios from 'axios';

// Helper functions that don't need to be exposed
const uploadFileToStorage = async (file: File): Promise<string | null> => {
    const uniqueId = uuidv4();
    const uniqueFilename = `${uniqueId}-${file.name}`;
    const filePath = `users/${uniqueFilename}`;

    const { error, data } = await supabase.storage.from('media').upload(filePath, file);
    if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
    }

    const uploadData = data as SupabaseStorageUploadResponse;
    return formatPublicUrl('media', uploadData.path);
};

const deleteOldProfilePicture = async (oldProfilePicturePublicURL: string | null) => {
    if (oldProfilePicturePublicURL) {
        const filename = path.basename(oldProfilePicturePublicURL);
        await deleteImage(`users/${filename}`);
    }
};

// Main mutation hook
export const useShopProfilePicture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ 
            file, 
            shopId 
        }: { 
            file: File; 
            shopId: string;
        }) => {
            // Get current shop data from the cache
            const currentShop = queryClient.getQueryData<ShopWithRelations>(['shop', shopId]);
            
            if (!currentShop) {
                throw new Error('Shop not found');
            }

            // 1. Upload new file
            const newProfilePictureURL = await uploadFileToStorage(file);
            if (!newProfilePictureURL) {
                throw new Error('Failed to upload file');
            }

            // 2. Update shop with new profile picture URL
            const { data: responseData } = await axios.put('/api/shop', {
                id: shopId,
                profilePicture: newProfilePictureURL
            });

            // 3. Delete old profile picture
            await deleteOldProfilePicture(currentShop.profilePicture);

            return responseData;
        },
        onSuccess: (updatedShop) => {
            // Update shop data in the cache
            queryClient.setQueryData(['shop', updatedShop.id], updatedShop);
        },
        onError: (error) => {
            console.error('Error updating profile picture:', error);
        }
    });
};