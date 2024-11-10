import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TypeOf } from "zod";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import supabase, { SupabaseStorageUploadResponse } from 'utils/supabase/supabaseClient';
import { formatPublicUrl } from 'utils/supabase/supabaseHelpers';
import { entityFormSchema } from 'forms/entityForm';
import { ShopWithRelations } from 'pages/api/shop';
import { FormMode } from "types/form";
import axios from 'axios';

interface SubmitShopParams {
  values: TypeOf<typeof entityFormSchema>;
  profilePictureFile: File | null;
  userId: string;
  mode: FormMode;
  shopId?: string;
}

export const useSubmitShop = () => {
  const queryClient = useQueryClient();

  const uploadFileToStorage = async (file: File): Promise<string> => {
    const uniqueId = uuidv4();
    const uniqueFilename = `${uniqueId}-${file.name}`;
    const filePath = `users/${uniqueFilename}`;

    const { error, data } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    const uploadData = data as SupabaseStorageUploadResponse;
    return formatPublicUrl('media', uploadData.path);
  };

  const deleteOldProfilePicture = async (oldProfilePictureURL: string) => {
    if (oldProfilePictureURL) {
      const filename = path.basename(oldProfilePictureURL);
      await supabase.storage
        .from('media')
        .remove([`users/${filename}`]);
    }
  };

  return useMutation({
    mutationFn: async ({ 
      values, 
      profilePictureFile, 
      userId, 
      mode, 
      shopId 
    }: SubmitShopParams) => {
      // Handle file upload if provided
      let profilePicturePublicURL = '';
      if (profilePictureFile) {
        profilePicturePublicURL = await uploadFileToStorage(profilePictureFile);
      }

      // Prepare shop data
      const shopData: Partial<ShopWithRelations> = {
        ...values,
        ...(profilePicturePublicURL && { profilePicture: profilePicturePublicURL })
      };

      let response;
      if (mode === FormMode.EDIT && shopId) {
        // Get current shop data to handle old profile picture
        const currentShop = queryClient.getQueryData<ShopWithRelations>(['shop', shopId]);
        
        response = await axios.put('/api/shop', {
          id: shopId,
          ...shopData
        });

        // Delete old profile picture if it was replaced
        if (profilePicturePublicURL && currentShop?.profilePicture) {
          await deleteOldProfilePicture(currentShop.profilePicture);
        }
      } else {
        response = await axios.post('/api/shop', {
          ...shopData,
          ownerId: userId
        });
      }

      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      if (variables.mode === FormMode.EDIT) {
        queryClient.invalidateQueries({ queryKey: ['shop', variables.shopId] });
      }
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      
      // Update the cache directly
      if (variables.mode === FormMode.EDIT && variables.shopId) {
        queryClient.setQueryData(['shop', variables.shopId], data);
      }
    },
    onError: (error) => {
      console.error('Error saving shop:', error);
    }
  });
};