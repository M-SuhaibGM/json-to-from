"use client";

import { createContext, useContext } from "react";

export interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched?: Record<string, boolean>;
  layout: "horizontal" | "vertical";
  isSubmitting?: boolean;
  handleChange: (name: string, value: any) => void;
  handleBlur?: (name: string) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = FormContext.Provider;

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("useFormContext must be used within a FormProvider component tree.");
  }
  return ctx;
}