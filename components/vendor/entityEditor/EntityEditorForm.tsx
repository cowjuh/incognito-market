'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { entityFormSchema } from 'forms/entityForm';
import { TypeOf, z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { createShop } from 'services/api/shop';
import { isFieldRequired } from 'utils/zod/zodUtils';
import InputField from '@/form/InputField';
import { Button } from '@/ui/button';
import { uploadFile } from 'services/uploadService';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ImageIcon } from '@radix-ui/react-icons';
import ImageCropDialog from '@/dialog/ImageCropDialog';

async function onSubmit(values: z.infer<typeof entityFormSchema>) {
    const { country, state, ...otherValues } = values;
    try {
        const response = await createShop(otherValues);
        console.log('Shop created successfully:', response);
    } catch (error) {
        console.error('Error creating shop:', error);
    }
}

type EntityFormSchema = TypeOf<typeof entityFormSchema>;
type FormFieldName = keyof EntityFormSchema;

export function EntityEditorForm() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const form = useForm<z.infer<typeof entityFormSchema>>({
        resolver: zodResolver(entityFormSchema)
    })

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (form.watch("country")) {
            setStates(State.getStatesOfCountry(form.watch("country")));
        }
    }, [form.watch("country")]);

    useEffect(() => {
        if (form.watch("state")) {
            setCities(City.getCitiesOfState(form.watch("country"), form.watch("state")));
        }
    }, [form.watch("state")]);

    const formFields: { name: FormFieldName, label: string, placeholder: string, description: string }[] = [
        { name: 'name', label: 'Entity Name', placeholder: 'Name', description: 'This is your entity name.' },
        { name: 'username', label: 'Username', placeholder: 'Username', description: 'This is your public display name.' },
        { name: 'email', label: 'Email', placeholder: 'Email', description: '' },
        { name: 'phoneNumber', label: 'Phone Number', placeholder: 'Phone Number', description: '' },
        { name: 'websiteLink', label: 'Website Link', placeholder: 'Website Link', description: '' },
        { name: 'bio', label: 'Bio', placeholder: 'Bio', description: '' },
        { name: 'description', label: 'Description', placeholder: 'Description', description: '' },
        { name: 'physicalAddress', label: 'Physical Address', placeholder: 'Physical Address', description: '' },
    ];

    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setProfilePictureFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (profilePictureFile) {
            const publicURL = await uploadFile(profilePictureFile);
            console.log('File uploaded at: ', publicURL);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setProfilePictureFile(acceptedFiles[0]);
        }
    });

    const handleSaveImage = async (blob: Blob) => {
        const file = new File([blob], 'profilePicture.png', { type: 'image/png' });
        setProfilePictureFile(file);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full">
                <div className='flex items-start gap-16'>
                    <div className='flex flex-col gap-4'>
                        <div className='h-36 w-36 bg-gray-200 rounded-full relative'>
                            {profilePictureFile &&
                                <Image
                                    src={URL.createObjectURL(profilePictureFile)}
                                    alt="Profile Picture"
                                    width={200}
                                    height={200}
                                    className='h-36 w-36 object-cover object-center rounded-full'
                                />
                            }
                            <div className={`absolute inset-0 bg-black flex items-center justify-center rounded-full cursor-pointer ${profilePictureFile ? 'hover:opacity-60 opacity-0' : 'opacity-60'}`} onClick={() => document.getElementById('fileInput')?.click()}>
                                <ImageIcon className='text-white w-6 h-6' />
                            </div>
                            <input id='fileInput' type='file' onChange={handleFileChange} className='hidden' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 flex-grow'>
                        {profilePictureFile &&
                            <ImageCropDialog src={URL.createObjectURL(profilePictureFile)} onSave={handleSaveImage} />
                        }

                        {formFields.map(({ name, label, placeholder, description }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <InputField
                                        field={field}
                                        label={label}
                                        placeholder={placeholder}
                                        description={description}
                                        isRequired={isFieldRequired(entityFormSchema, name as FormFieldName)}
                                    />
                                )}
                            />
                        ))}
                        <FormField
                            key="profilePicture"
                            control={form.control}
                            name="profilePicture"
                            render={({ field }) => (
                                <InputField
                                    field={field}
                                    label="Profile Picture URL"
                                    placeholder="Profile Picture URL"
                                    description=""
                                    isRequired={isFieldRequired(entityFormSchema, "profilePicture" as FormFieldName)}
                                />
                            )}
                        />
                        <FormField
                            key="headerImage"
                            control={form.control}
                            name="headerImage"
                            render={({ field }) => (
                                <InputField
                                    field={field}
                                    label="Header Image URL"
                                    placeholder="Header Image URL"
                                    description=""
                                    isRequired={isFieldRequired(entityFormSchema, "headerImage" as FormFieldName)}
                                />
                            )}
                        />
                        <div className='flex items-center gap-3 flex-grow'>
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className='flex-grow'>
                                        <FormLabel>Country</FormLabel>
                                        <Select value={field.value} onValueChange={(val) => form.setValue('country', val)} defaultValue={field.value} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.isoCode} value={country.isoCode}>{country.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select your country.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className='flex-grow'>
                                        <FormLabel>State/Province</FormLabel>
                                        <Select value={field.value} onValueChange={(val) => { form.setValue('state', val); setCities([]); }} defaultValue={field.value} disabled={!form.watch("country")} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a state/province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem key={state.isoCode} value={state.isoCode}>{state.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select your state/province.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className='flex-grow'>
                                        <FormLabel>City</FormLabel>
                                        <Select value={field.value} onValueChange={(val) => form.setValue('city', val)} defaultValue={field.value} disabled={!form.watch("state")} name={field.name}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select your city.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div {...getRootProps()} className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md w-full">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <div className='flex flex-col gap-2 items-center'>
                                        <div>Drag image here</div>
                                        <div className='text-neutral-400'>OR</div>
                                        <Button type='button'>Browse</Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}