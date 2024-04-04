import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

function InputField({ field, label, placeholder, description, isRequired }) {
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
            <FormDescription>
                {description}
            </FormDescription>
            <FormMessage />
        </FormItem>
    );
}

export default InputField;