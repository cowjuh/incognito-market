import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateFormSchema } from 'forms/updateForm';
import { TypeOf, z } from "zod";
import { Form, FormField } from '@/ui/form';
import InputField from '@/form/InputField';
import TextAreaField from '@/form/TextAreaField';
import { Button } from '@/ui/button';
import UpdateCard from '@/shop/UpdateCard';
import { createUpdate, updateUpdate } from 'services/api/update';
import { FormMode } from 'types/form';
import { Update } from '@prisma/client';

type UpdateFormSchema = TypeOf<typeof updateFormSchema>;

interface UpdateEditorFormProps {
    shopId?: string;
    onCancel: () => void;
    onSuccess: () => void;
    mode: FormMode;
    initialUpdateObj?: Update;
}

const UpdateEditorForm: React.FC<UpdateEditorFormProps> = ({ shopId, onCancel, onSuccess, mode, initialUpdateObj }) => {
    const formMethods = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: mode === FormMode.EDIT ? initialUpdateObj : {
            shopId: shopId,
        }
    });

    const { control, handleSubmit, formState: { errors, isValid }, trigger } = formMethods;

    const onSubmit = (data: UpdateFormSchema) => {
        if (mode === FormMode.CREATE) {
            createUpdate(data).then(() => {
                onSuccess();
            });
        } else if (mode === FormMode.EDIT && initialUpdateObj) {
            updateUpdate(initialUpdateObj.id, data).then(() => {
                onSuccess();
            });
        }
    };

    const watchedFields = useWatch({ control });

    const { title, content, callToActionLink, callToActionText } = watchedFields;

    return (
        <Form {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <h1 className='text-2xl font-bold'>New Announcement</h1>
                <div className='flex divide-x'>
                    <div className='flex flex-col gap-8 flex-grow pr-4'>
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <InputField
                                    field={field}
                                    label="Title"
                                    placeholder="ie: New website!"
                                    isRequired={true}
                                />
                            )}
                        />
                        <FormField
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <TextAreaField
                                    field={{
                                        ...field,
                                        onChange: async (e) => {
                                            field.onChange(e);
                                            await trigger("content");
                                        },
                                    }}
                                    label="Description"
                                    placeholder="ie: the 4o4.space website is live!"
                                    isRequired={true}
                                    error={errors.content?.message}
                                />
                            )}
                        />
                        <FormField
                            control={control}
                            name="callToActionLink"
                            render={({ field }) => (
                                <InputField
                                    field={field}
                                    label="Link"
                                    placeholder="ie: https://www.4o4.space"
                                    description="Optional link."
                                    isRequired={false}
                                />
                            )}
                        />
                        {callToActionLink && (
                            <FormField
                                control={control}
                                name="callToActionText"
                                render={({ field }) => (
                                    <InputField
                                        field={field}
                                        label="Link Preview Text"
                                        placeholder={callToActionLink}
                                        description="The text that will be displayed on the link."
                                        isRequired={false}
                                    />
                                )}
                            />
                        )}
                        <div className='flex gap-4'>
                            <Button type='button' variant="outline" onClick={onCancel}>Cancel</Button>
                            <Button type="submit" disabled={!isValid}>{mode === FormMode.CREATE ? "Post" : "Save"}</Button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 pl-4'>
                        <div className='font-medium text-sm p-0'>Preview</div>
                        <UpdateCard
                            isPreview={true}
                            update={{
                                title: title || "Preview Title",
                                content: content || "Preview Content",
                                postedAt: new Date(),
                                callToActionLink: callToActionLink || "",
                                callToActionText: callToActionLink ? callToActionText || callToActionLink : "",
                                id: "preview-update",
                                shopId: shopId,
                            }}
                            shopId={shopId}
                            className='w-[300px]'
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default UpdateEditorForm;