"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import type { FormField } from "../types";
import { useRemoteOptions } from "../hooks/useRemoteOptions";

export function SelectField({
  field, 
  value, 
  onChange,
}: { 
  field: FormField; 
  value: any; 
  onChange: (v: any) => void 
}) {
  const { options, loading } = useRemoteOptions(field);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selected = options.find((o) => String(o.value) === String(value));

  return (
    <div className="position-relative" ref={containerRef}>
      <button
        type="button"
        disabled={field.disabled}
        className={`form-select text-start d-flex justify-content-between align-items-center bg-white shadow-none ${
          field.disabled ? "bg-light text-muted" : ""
        }`}
        onClick={() => !field.disabled && setOpen((o) => !o)}
      >
        <span className={selected ? "text-dark" : "text-muted"}>
          {selected ? selected.label : field.placeholder ?? "Select option..."}
        </span>
        <span className="text-muted small ms-2" style={{ fontSize: "0.75rem" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          className="border rounded-3 bg-white shadow-sm position-absolute w-100 mt-1 overflow-hidden"
          style={{ zIndex: 1050, maxHeight: 260 }}
        >
          <div className="p-2 border-bottom bg-light">
            <input
              autoFocus
              className="form-control form-control-sm shadow-none"
              placeholder="Search options..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="overflow-auto" style={{ maxHeight: 200 }}>
            {loading && <div className="p-3 text-muted small text-center">Loading options…</div>}
            
            {!loading && filtered.length === 0 && (
              <div className="p-3 text-muted small text-center">No matching options</div>
            )}
            
            {!loading && filtered.map((o) => {
              const isSelected = String(o.value) === String(value);
              return (
                <div
                  key={o.value}
                  className={`px-3 py-2 small d-flex align-items-center justify-content-between ${
                    isSelected ? "bg-primary text-white" : "text-dark hover-bg-light"
                  }`}
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(o.value);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span>{o.label}</span>
                  {isSelected && <span className="small">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}