"use client";
import type { FormField } from "../types";
import { useRemoteOptions } from "../hooks/useRemoteOptions";

export function RadioField({
  field, value, onChange,
}: { field: FormField; value: any; onChange: (v: any) => void }) {
  const { options, loading } = useRemoteOptions(field);

  if (loading) {
    return <div className="text-muted small">Loading options…</div>;
  }

  if (!options.length) {
    return <div className="text-muted small">No options available</div>;
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {options.map((o) => {
        const id = `${field.name}-${o.value}`; // unique id for accessibility
        return (
          <label
            key={o.value}
            htmlFor={id}
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              id={id}
              name={field.name}
              value={o.value}
              checked={String(value) === String(o.value)}
              onChange={() => onChange(o.value)}
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}