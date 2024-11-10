"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entityFormSchema } from "forms/entityForm";
import { TypeOf, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { isFieldRequired, isFieldTextArea } from "utils/zod/zodUtils";
import InputField from "@/form/InputField";
import { Button } from "@/ui/button";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "@radix-ui/react-icons";
import ImageCropDialog from "@/dialog/ImageCropDialog";
import TextAreaField from "@/form/TextAreaField";
import { useSession } from "next-auth/react";
import { Shop } from "@prisma/client";
import { FormMode } from "types/form";
import { useRouter } from "next/router";
import { Crop, RotateCcw } from "lucide-react";
import { useSubmitShop } from "hooks/api/submitShop";

type EntityFormSchema = TypeOf<typeof entityFormSchema>;
type FormFieldName = keyof EntityFormSchema;

interface EntityEditorFormProps {
  mode: FormMode;
  entity?: Shop;
}
interface ImageState {
    originalFile: File | null;
    originalUrl: string | null;
    croppedFile: File | null;
    croppedUrl: string | null;
    showCropDialog: boolean;
  }

const EntityEditorForm = ({ mode, entity }: EntityEditorFormProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { mutate: submitShop } = useSubmitShop();

  const [imageState, setImageState] = useState<ImageState>({
    originalFile: null,
    originalUrl: null,
    croppedFile: null,
    croppedUrl: mode === FormMode.EDIT ? entity?.profilePicture : null,
    showCropDialog: false,
  });

  const defaultValues: EntityFormSchema =
    mode === FormMode.EDIT && entity
      ? entity
      : {
          name: "",
          username: "",
          email: "",
          phoneNumber: "",
        };

  const form = useForm<z.infer<typeof entityFormSchema>>({
    resolver: zodResolver(entityFormSchema),
    defaultValues,
  });

  // Location data effects
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    const country = form.watch("country");
    if (country) {
      setStates(State.getStatesOfCountry(country));
    }
  }, [form.watch("country")]);

  useEffect(() => {
    const state = form.watch("state");
    const country = form.watch("country");
    if (state && country) {
      setCities(City.getCitiesOfState(country, state));
    }
  }, [form.watch("state"), form.watch("country")]);


  useEffect(() => {
    const initializeImageFromUrl = async () => {
      if (mode === FormMode.EDIT && entity?.profilePicture) {
        try {
          const response = await fetch(entity.profilePicture);
          const blob = await response.blob();
          const file = new File([blob], "profilePicture.png", {
            type: blob.type,
          });

          setImageState({
            originalFile: file,
            originalUrl: entity.profilePicture,
            croppedFile: file,
            croppedUrl: entity.profilePicture,
            showCropDialog: false,
          });
        } catch (error) {
          console.error("Error initializing image from URL:", error);
        }
      }
    };

    initializeImageFromUrl();
  }, [mode, entity]);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageState({
      originalFile: file,
      originalUrl: url,
      croppedFile: file,
      croppedUrl: url,
      showCropDialog: true,
    });
  };

  const handleCrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageState.originalFile) {
      setImageState((prev) => ({
        ...prev,
        showCropDialog: true,
      }));
    }
  };

  const handleResetToCrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageState.originalFile && imageState.originalUrl) {
      setImageState((prev) => ({
        ...prev,
        croppedFile: prev.originalFile,
        croppedUrl: prev.originalUrl,
      }));
    }
  };

  const handleSaveImage = async (blob: Blob) => {
    const file = new File([blob], "profilePicture.png", { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setImageState((prev) => ({
      ...prev,
      croppedFile: file,
      croppedUrl: url,
      showCropDialog: false,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles[0]);
      }
    },
  });

  // Form sections configuration
  const formSections = [
    {
      title: "Basic Information",
      fields: [
        {
          name: "name",
          label: "Entity Name",
          placeholder: "Name",
          description: "This is your entity name.",
        },
        {
          name: "username",
          label: "Username",
          placeholder: "Username",
          description: "This is your public display name.",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Email",
          description: "",
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          placeholder: "Phone Number",
          description: "",
        },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          name: "websiteLink",
          label: "Website Link",
          placeholder: "Website Link",
          description: "",
        },
        { name: "bio", label: "Bio", placeholder: "Bio", description: "" },
        {
          name: "description",
          label: "Description",
          placeholder: "Description",
          description: "",
        },
        {
          name: "physicalAddress",
          label: "Physical Address",
          placeholder: "Physical Address",
          description: "",
        },
      ],
    },
  ] as const;

  const handleSubmit = async (values: z.infer<typeof entityFormSchema>) => {
    if (!session?.user) {
      console.error("User not logged in");
      return;
    }

    const changes = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== defaultValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    const profilePictureFileToUpload =
      mode === FormMode.EDIT && imageState.croppedUrl === entity?.profilePicture
        ? undefined
        : imageState.croppedFile;

    submitShop({
        values: changes,
        profilePictureFile: profilePictureFileToUpload,
        userId: session.user.id,
        mode,
        shopId: entity?.id
    }, {
        onSuccess: () => {

            router.push(`/vendor/shops`);
        }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-full"
      >
        <div className="flex items-start gap-16">
        <div className="flex flex-col gap-4">
            <div className="relative group">
              <div
                className="h-36 w-36 bg-neutral-200 rounded-full relative cursor-pointer overflow-hidden"
                {...getRootProps()}
              >
                {imageState.croppedUrl ? (
                  <Image
                    src={imageState.croppedUrl}
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className="h-36 w-36 object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-neutral-400" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-xs">Upload</span>
                  </div>
                  {imageState.croppedUrl && (
                    <>
                      <button
                        type="button"
                        onClick={handleCrop}
                        className="flex flex-col items-center gap-2 text-white"
                      >
                        <Crop className="w-6 h-6" />
                        <span className="text-xs">Crop</span>
                      </button>
                      {imageState.originalUrl !== imageState.croppedUrl && (
                        <button
                          type="button"
                          onClick={handleResetToCrop}
                          className="flex flex-col items-center gap-2 text-white"
                        >
                          <RotateCcw className="w-6 h-6" />
                          <span className="text-xs">Reset</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <input {...getInputProps()} />
            </div>

            {imageState.originalUrl && (
              <ImageCropDialog
                src={imageState.originalUrl}
                onSave={handleSaveImage}
                open={imageState.showCropDialog}
                onOpenChange={(open) =>
                  setImageState((prev) => ({ ...prev, showCropDialog: open }))
                }
              />
            )}
          </div>

          <div className="flex flex-col gap-10 flex-grow">
            {formSections.map(({ title, fields }) => (
              <div key={title} className="flex flex-col gap-6">
                <h1 className="text-xl font-medium">{title}</h1>
                <div className="flex flex-col gap-4">
                  {fields.map(({ name, label, placeholder, description }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => {
                        const isTextArea = isFieldTextArea(
                          entityFormSchema,
                          name as FormFieldName
                        );
                        const isRequired = isFieldRequired(
                          entityFormSchema,
                          name as FormFieldName
                        );
                        return isTextArea ? (
                          <TextAreaField
                            field={field}
                            label={label}
                            placeholder={placeholder}
                            description={description}
                            isRequired={isRequired}
                          />
                        ) : (
                          <InputField
                            field={field}
                            label={label}
                            placeholder={placeholder}
                            description={description}
                            isRequired={isRequired}
                          />
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Location Fields */}
            <div className="flex items-center gap-3 flex-grow">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Country</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => form.setValue("country", val)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your country.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>State/Province</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        form.setValue("state", val);
                        setCities([]);
                      }}
                      defaultValue={field.value}
                      disabled={!form.watch("country")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state/province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </SelectItem>
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
                  <FormItem className="flex-grow">
                    <FormLabel>City</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => form.setValue("city", val)}
                      defaultValue={field.value}
                      disabled={!form.watch("state")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your city.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit">
          {mode === FormMode.EDIT ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export { EntityEditorForm };
