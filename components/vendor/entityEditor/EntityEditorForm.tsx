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

    const formFields: { name: FormFieldName, placeholder: string, description: string }[] = [
        { name: 'name', placeholder: 'Name', description: 'This is your entity name.' },
        { name: 'username', placeholder: 'Username', description: 'This is your public display name.' },
        { name: 'email', placeholder: 'Email', description: '' },
        { name: 'phoneNumber', placeholder: 'Phone Number', description: '' },
        { name: 'websiteLink', placeholder: 'Website Link', description: '' },
        { name: 'bio', placeholder: 'Bio', description: '' },
        { name: 'description', placeholder: 'Description', description: '' },
        { name: 'physicalAddress', placeholder: 'Physical Address', description: '' },
        { name: 'profilePicture', placeholder: 'Profile Picture URL', description: '' },
        { name: 'headerImage', placeholder: 'Header Image URL', description: '' },
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full">
                {formFields.map(({ name, placeholder, description }) => (
                    <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <InputField
                                field={field}
                                label={name
                                    .split(/(?=[A-Z])/)
                                    .join(' ')
                                    .replace(/^\w/, (c) => c.toUpperCase())
                                }
                                placeholder={placeholder}
                                description={description}
                                isRequired={isFieldRequired(entityFormSchema, name as FormFieldName)}
                            />
                        )}
                    />
                ))}
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
                <button type="submit">Submit</button>
            </form>
        </Form>
    )
}