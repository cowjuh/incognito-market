import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

interface TextAreaFieldProps {
    field: any;
    label: string;
    placeholder: string;
    description?: string;
    isRequired: boolean;
    error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ field, label, placeholder, description, isRequired, error }) => {
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
                <Textarea placeholder={placeholder} className="resize-none h-36" {...field} />
            </FormControl>
            {description && (
                <FormDescription>
                    {description}
                </FormDescription>
            )}
            {error && (
                <FormMessage>
                    {error}
                </FormMessage>
            )}
        </FormItem>
    );
}

export default TextAreaField;