"use client";

import { FormProvider } from "./FormContext";
import { FieldRenderer } from "./FieldRenderer";
import { TabsRenderer } from "./TabsRenderer";
import { FormModal } from "./FormModal";
import { useFormEngine } from "./hooks/useFormEngine";
import type { FormSchema } from "./types";

export function FormEngine({ 
  schema, 
  onClose, 
  onSubmit 
}: { 
  schema: FormSchema; 
  onClose?: () => void; 
  onSubmit?: (data: any) => void;
}) {
  const {
    values,
    errors,
    layout,
    mode,
    handleChange,
    handleSubmit,
  } = useFormEngine({ schema, onSubmit });

  const formBody = (
    <form onSubmit={handleSubmit} noValidate>
      <FormProvider value={{ values, errors, layout, handleChange }}>
        {schema.tabs?.length ? (
          <TabsRenderer tabs={schema.tabs} />
        ) : (
          <div className="row g-3">
            {schema.fields?.map((f) => (
              <FieldRenderer key={f.name} field={f} />
            ))}
          </div>
        )}
      </FormProvider>
      
      <div className={`d-flex gap-2 mt-4 ${mode === "popup" ? "justify-content-end" : ""}`}>
        {mode === "popup" && (
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary px-4">
          Submit
        </button>
      </div>
    </form>
  );

  if (mode === "popup") {
    return (
      <FormModal open onClose={onClose ?? (() => {})} title={schema.title}>
        {formBody}
      </FormModal>
    );
  }

  return <div className={schema.className ?? ""}>{formBody}</div>;
}