"use client";

import type { FormField } from "../types";
import { useRemoteOptions } from "../hooks/useRemoteOptions";

export function CheckboxField({
  field, 
  value, 
  onChange,
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  const { options } = useRemoteOptions(field);
  const arr: any[] = Array.isArray(value) ? value : [];

  const toggle = (v: any) => {
    if (arr.includes(v)) {
      onChange(arr.filter((x) => x !== v));
    } else {
      onChange([...arr, v]);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {options.map((o) => {
        const isChecked = arr.includes(o.value);
        return (
          <div 
            key={o.value} 
            className="form-check form-check-inline m-0 d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => toggle(o.value)}
          >
            <input
              type="checkbox"
              className="form-check-input shadow-none"
              style={{ cursor: "pointer" }}
              checked={isChecked}
              // Prevent duplicate toggle triggers since the wrapper div handles clicks too
              onChange={() => {}} 
            />
            <label className="form-check-label small user-select-none" style={{ cursor: "pointer" }}>
              {o.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}