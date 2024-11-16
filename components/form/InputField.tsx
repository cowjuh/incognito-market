import React, { memo } from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

interface InputFieldProps {
  field: any;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  type?: string;
}

const InputField = memo(({
  field,
  label,
  placeholder,
  description,
  isRequired,
  type = "text"
}: InputFieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}{isRequired && <span className="text-red-500 ml-1">*</span>}</FormLabel>
      <FormControl>
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          // Add these optimizations
          autoComplete="off" // Prevent browser autocomplete from causing re-renders
          spellCheck="false" // Prevent spell check from causing re-renders
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.field.value === nextProps.field.value &&
    prevProps.field.name === nextProps.field.name &&
    prevProps.label === nextProps.label
  );
});

InputField.displayName = 'InputField';

export default InputField;