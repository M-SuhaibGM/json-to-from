"use client";

import type { FormField } from "../types";

export function DateField({ 
  field, 
  value, 
  onChange 
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  return (
    <input
      type="date"
      className="form-control shadow-none bg-white"
      value={value ?? ""}
      min={field.min}
      max={field.max}
      disabled={field.disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}