"use client";
import type { FormField } from "../types";

export function FileField({ 
  field, value, onChange 
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  return (
    <div>
      <input
        type="file"
        className="form-control"
        // 1. Restrict file types if defined in JSON (e.g., ".pdf,.doc")
        accept={field.validation?.pattern || undefined} 
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange(file);
        }}
      />
      {/* 2. Show the currently selected file name so the user knows it's attached */}
      {value && (
        <div className="form-text text-success mt-1">
          📎 Attached: {value.name} ({(value.size / 1024).toFixed(1)} KB)
        </div>
      )}
    </div>
  );
}