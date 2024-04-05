import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

interface TextAreaFieldProps {
    field: any;
    label: string;
    placeholder: string;
    description: string;
    isRequired: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ field, label, placeholder, description, isRequired }) => {
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
            <FormDescription>
                {description}
            </FormDescription>
            <FormMessage />
        </FormItem>
    );
}

export default TextAreaField;