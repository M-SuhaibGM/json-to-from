"use client";
import type { FormField } from "./types";

export function FieldWrapper({
  field, 
  layout, 
  error, 
  children,
}: {
  field: FormField;
  layout: "horizontal" | "vertical";
  error?: string;
  children: React.ReactNode;
}) {
  const col = field.col ?? 12;
  const isRequired = field.validation?.required;

  const renderLabel = (isHorizontal = false) => {
    if (!field.label) return null;
    return (
      <label className={`form-label fw-medium text-dark ${isHorizontal ? "col-4 col-form-label text-md-end mb-0" : "mb-2"}`}>
        {field.label}
        {isRequired && <span className="text-danger ms-1" title="Required field">*</span>}
      </label>
    );
  };

  if (layout === "horizontal") {
    return (
      <div className={`col-12 col-md-${col} mb-3`}>
        <div className="row align-items-start">
          {renderLabel(true)}
          <div className="col-8">
            {children}
            {field.description && (
              <div className="form-text text-muted small mt-1">{field.description}</div>
            )}
            {error && (
              <div className="text-danger small mt-1 d-flex align-items-center gap-1">
                <span>⚠️</span> <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`col-12 col-md-${col} mb-3`}>
      {renderLabel(false)}
      {children}
      {field.description && (
        <div className="form-text text-muted small mt-1 mb-1">{field.description}</div>
      )}
      {error && (
        <div className="text-danger small mt-1 d-flex align-items-center gap-1">
          <span>⚠️</span> <span>{error}</span>
        </div>
      )}
    </div>
  );
}