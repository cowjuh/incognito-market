import React, { memo } from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

interface TextAreaFieldProps {
  field: any;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
}

const TextAreaField = memo(({
  field,
  label,
  placeholder,
  description,
  isRequired,
}: TextAreaFieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}{isRequired && <span className="text-red-500 ml-1">*</span>}</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          rows={4}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.field.value === nextProps.field.value &&
    prevProps.field.name === nextProps.field.name &&
    prevProps.label === nextProps.label
  );
});

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;