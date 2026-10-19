"use client";

import { useState } from "react";
import type { FormTab } from "./types";
import { FieldRenderer } from "./FieldRenderer";
import { useFormContext } from "./FormContext";

export function TabsRenderer({ tabs }: { tabs: FormTab[] }) {
  const [active, setActive] = useState(0);
  const { errors } = useFormContext();

  // Check if any field within a specific tab contains an error
  const hasTabErrors = (tabFields: typeof tabs[0]["fields"]) => {
    return tabFields.some((f) => errors[f.name]);
  };

  return (
    <div>
      {/* Tab Navigation Header */}
      <ul className="nav nav-tabs mb-4 border-bottom" role="tablist">
        {tabs.map((t, i) => {
          const isActive = i === active;
          const hasError = hasTabErrors(t.fields);

          return (
            <li key={t.name} className="nav-item" role="presentation">
              <button
                className={`nav-link fw-medium d-flex align-items-center gap-2 position-relative ${
                  isActive 
                    ? "active bg-white text-primary border-bottom-0 shadow-none" 
                    : "text-secondary hover-text-dark"
                }`}
                onClick={() => setActive(i)}
                type="button"
                role="tab"
                aria-selected={isActive}
              >
                <span>{t.label ?? t.name}</span>
                
                {/* Error Indicator Dot */}
                {hasError && (
                  <span 
                    className="badge bg-danger rounded-circle p-1 d-inline-block" 
                    style={{ width: "7px", height: "7px" }} 
                    title="This tab contains validation errors"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Tab Content Panel */}
      <div className="tab-content">
        <div className="row g-3" role="tabpanel">
          {tabs[active].fields.map((f) => (
            <FieldRenderer key={f.name} field={f} />
          ))}
        </div>
      </div>
    </div>
  );
}