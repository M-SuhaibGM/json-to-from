"use client";
import { FormEngine } from "@/components/generic-form/FormEngine";
import type { FormSchema } from "@/components/generic-form/types";
import { useState } from "react";

// Notice: No "path" key here, so it defaults to popup mode
const popupSchema: FormSchema = {
  title: "Subscribe to Newsletter",
  layout: "vertical",
  fields: [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      col: 12,
      placeholder: "you@xyz.com",
      validation: { 
        required: true, 
        pattern: "^[\\w.+-]+@xyz\\..+$",
        message: "Must end with @xyz domain"
      }
    },
    {
      name: "frequency",
      label: "Frequency",
      type: "select",
      col: 12,
      options: [
        { "value": "daily", "label": "Daily" },
        { "value": "weekly", "label": "Weekly" },
        { "value": "monthly", "label": "Monthly" }
      ]
    }
  ]
};

export default function PopupDemo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="container py-5 text-center">
      <h2>Popup Form Demo</h2>
      <p className="text-muted mt-2">
        This form renders as a popup because its JSON does <strong>not</strong> have a `path` key.
      </p>
      
      <button 
        className="btn btn-primary mt-4" 
        onClick={() => setIsOpen(true)}
      >
        Open Form Popup
      </button>

      {isOpen && (
        <FormEngine 
          schema={popupSchema} 
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log("Popup Form Submitted:", data);
            alert("Submitted! Check console.");
            setIsOpen(false);
          }} 
        />
      )}
    </div>
  );
}