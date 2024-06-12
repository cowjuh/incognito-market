import { TypeOf } from "zod";
import { entityFormSchema } from 'forms/entityForm';
import { ShopWithRelations } from 'pages/api/shop';
import { uploadFile } from 'services/uploadService';
import { createShop, updateShop } from 'services/api/shop';
import { FormMode } from "types/form";

export async function onSubmit(values: TypeOf<typeof entityFormSchema>, profilePictureFile: File | null, userId: string, mode: FormMode, shopId?: string) {
    let profilePicturePublicURL = '';
    const shopObject: Partial<ShopWithRelations> = {
        ...values
    }

    if (profilePictureFile) {
        profilePicturePublicURL = await uploadFile(profilePictureFile);
        shopObject.profilePicture = profilePicturePublicURL;
    }

    if (mode === FormMode.EDIT) {
        shopObject.id = shopId;
        try {
            const response = await updateShop(shopId, shopObject);
            console.log('Shop updated successfully:', response);
        } catch (error) {
            console.error('Error updating shop:', error);
        }
    } else if (mode === FormMode.CREATE) {
        try {
            const response = await createShop({ ...values, profilePicture: profilePicturePublicURL, ownerId: userId });
            console.log('Shop created successfully:', response);
        } catch (error) {
            console.error('Error creating shop:', error);
        }
    }
}