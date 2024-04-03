'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { entityFormSchema } from 'forms/entityForm';
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { createShop } from 'services/api/shop';

async function onSubmit(values: z.infer<typeof entityFormSchema>) {
    const { country, state, ...otherValues } = values;
    try {
        const response = await createShop(otherValues);
        console.log('Shop created successfully:', response);
    } catch (error) {
        console.error('Error creating shop:', error);
    }
}

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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your entity name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="websiteLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website Link</FormLabel>
                            <FormControl>
                                <Input placeholder="Website Link" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Input placeholder="Bio" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="physicalAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Physical Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Physical Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                <Input placeholder="Profile Picture URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="headerImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Header Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Header Image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
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
                <button type="submit">Submit</button>
            </form>
        </Form>
    )
}