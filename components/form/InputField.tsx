import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Field } from "react-hook-form";
interface InputFieldProps {
    field: any;
    label: string;
    placeholder: string;
    description?: string;
    isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ field, label, placeholder, description, isRequired }) => {
    return (
        <FormItem>
            <FormLabel className="flex items-center gap-1">
                <span>
                    {label}
                </span>
                <span className="text-neutral-400">
                    {isRequired === true && "(Required)"}
                </span>
            </FormLabel>
            <FormControl>
                <Input placeholder={placeholder} {...field} />
            </FormControl>
            {description && (
                <FormDescription>
                    {description}
                </FormDescription>
            )}
            <FormMessage />
        </FormItem>
    );
}

export default InputField;