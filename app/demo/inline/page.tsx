"use client";
import { FormEngine } from "@/components/generic-form/FormEngine";
import schema from "@/public/forms/demo-all-fields.json";
import type { FormSchema } from "@/components/generic-form/types";
import { useState } from "react";

export default function InlineDemo() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Inline Form Demo</h2>
      <p className="text-muted">This form renders inline because it has a `path` key in its JSON.</p>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <FormEngine 
            schema={schema as FormSchema} 
            onSubmit={(data) => {
              console.log("Form Submitted:", data);
              setSubmittedData(data);
              alert("Form submitted successfully! Check console for data.");
            }} 
          />
        </div>
      </div>

      {submittedData && (
        <div className="mt-4">
          <h5>Submitted Data:</h5>
          <pre className="bg-dark text-light p-3 rounded">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
