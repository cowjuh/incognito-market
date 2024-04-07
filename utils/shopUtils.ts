import { TypeOf } from "zod";
import { entityFormSchema } from 'forms/entityForm';
import { ShopWithRelations } from 'pages/api/shop';
import { uploadFile } from 'services/uploadService';
import { createShop } from 'services/api/shop';

export async function onSubmit(values: TypeOf<typeof entityFormSchema>, profilePictureFile: File | null, userId: string) {
    const { country, state, ...otherValues } = values;
    let profilePicturePublicURL = '';

    const shopObject: Partial<ShopWithRelations> = {
        ...otherValues,
    }

    if (profilePictureFile) {
        profilePicturePublicURL = await uploadFile(profilePictureFile);
        shopObject.profilePicture = profilePicturePublicURL;
    }

    try {
        const response = await createShop({ ...otherValues, profilePicture: profilePicturePublicURL, ownerId: userId });
        console.log('Shop created successfully:', response);
    } catch (error) {
        console.error('Error creating shop:', error);
    }
}