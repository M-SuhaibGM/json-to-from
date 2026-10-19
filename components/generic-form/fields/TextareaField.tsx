"use client";

import type { FormField } from "../types";

export function TextareaField({ 
  field, 
  value, 
  onChange 
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  return (
    <textarea
      className={`form-control shadow-none bg-white ${field.disabled ? "bg-light text-muted" : ""}`}
      rows={field.rows ?? 3}
      placeholder={field.placeholder}
      value={value ?? ""}
      disabled={field.disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}