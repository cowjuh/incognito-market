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

type UpdateFormSchema = TypeOf<typeof updateFormSchema>;
type FormFieldName = keyof UpdateFormSchema;

interface CreateUpdateFormProps {
    shopId?: string;
    onCancel: () => void;
}

const CreateUpdateForm: React.FC<CreateUpdateFormProps> = ({ shopId, onCancel }) => {
    const formMethods = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            shopId: shopId,
        }
    });

    const { control, handleSubmit, formState: { errors, isValid }, trigger } = formMethods;

    const onSubmit = (data: UpdateFormSchema) => {
        console.log(data);
    };

    const watchedFields = useWatch({ control });

    const { title, description: content, callToActionLink, callToActionText } = watchedFields;

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
                            name="description"
                            render={({ field }) => (
                                <TextAreaField
                                    field={{
                                        ...field,
                                        onChange: async (e) => {
                                            // Update the value
                                            field.onChange(e);
                                            // Trigger validation
                                            await trigger("description");
                                        },
                                    }}
                                    label="Description"
                                    placeholder="ie: the 4o4.space website is live!"
                                    isRequired={true}
                                    error={errors.description?.message} // Assuming TextAreaField accepts an error prop
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
                            <Button type="submit" disabled={!isValid}>Post</Button>
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
                                callToActionText: callToActionLink ? callToActionText || callToActionLink : ""
                            }}
                            className='w-[300px]'
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CreateUpdateForm;