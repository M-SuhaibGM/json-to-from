"use client";

import { useFormContext } from "./FormContext";
import { FieldWrapper } from "./FieldWrapper";
import { fieldRegistry } from "./fieldRegistry";
import type { FormField } from "./types";

export function FieldRenderer({ field }: { field: FormField }) {
  const { values, errors, layout, handleChange } = useFormContext();

  // Skip rendering if field is explicitly hidden
  if (field.hidden) {
    return null;
  }
  
  const Component = fieldRegistry[field.type];

  if (!Component) {
    return (
      <div className={`col-${field.col || 12} mb-3`}>
        <div className="alert alert-warning border-0 shadow-sm py-2 px-3 small d-flex align-items-center gap-2 mb-0">
          <span>⚠️</span>
          <span>Unknown field type: <strong>{field.type}</strong></span>
        </div>
      </div>
    );
  }

  return (
    <FieldWrapper field={field} layout={layout} error={errors[field.name]}>
      <Component
        field={field}
        value={values[field.name]}
        onChange={(v: any) => handleChange(field.name, v)}
      />
    </FieldWrapper>
  );
}