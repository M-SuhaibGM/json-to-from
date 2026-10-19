"use client";

import { useMemo, useState } from "react";
import type { FormSchema, FormField } from "../types";
import { validateAll } from "../validation/validateField";

function getAllFields(schema: FormSchema): FormField[] {
    if (schema.tabs?.length) return schema.tabs.flatMap((t) => t.fields);
    return schema.fields ?? [];
}

export interface UseFormEngineOptions {
    schema: FormSchema;
    onSubmit?: (data: any) => void;
    onClose?: () => void;
}

export function useFormEngine({ schema, onSubmit }: UseFormEngineOptions) {
    const allFields = useMemo(() => getAllFields(schema), [schema]);

    const [values, setValues] = useState<Record<string, any>>(() => {
        return allFields.reduce((acc, f) => ({ ...acc, [f.name]: f.value ?? "" }), {});
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateAll(allFields, values);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0 && onSubmit) {
            onSubmit(values);
        }
    };

    const layout = schema.layout ?? "vertical";
    const mode = schema.path ? "inline" : "popup";

    return {
        allFields,
        values,
        errors,
        layout,
        mode,
        handleChange,
        handleSubmit,
    };
}