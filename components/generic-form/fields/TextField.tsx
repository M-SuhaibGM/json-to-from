"use client";

import type { FormField } from "../types";

export function TextField({
  field, 
  value, 
  onChange,
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  // Determine appropriate input type (supports text, email, password, tel, url, number, etc.)
  const getInputType = () => {
    if (["email", "password", "tel", "url", "number"].includes(field.type)) {
      return field.type;
    }
    return "text";
  };

  return (
    <input
      className={`form-control shadow-none bg-white ${field.disabled ? "bg-light text-muted" : ""}`}
      type={getInputType()}
      name={field.name}
      placeholder={field.placeholder}
      value={value ?? ""}
      disabled={field.disabled}
      readOnly={field.readOnly}
      min={field.min}
      max={field.max}
      maxLength={field.maxLength}
      pattern={field.validation?.pattern}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}