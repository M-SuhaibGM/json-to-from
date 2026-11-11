export type FieldType =
  | "text" | "email" | "number" | "select" | "dropdown"
  | "radio" | "checkbox" | "date" | "file" | "textarea";

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;      // regex string
  message?: string;      // shown on any failure
}

export interface FieldOption {
  value: string | number;
  label: string;
}

export interface FormField {
  description?: import("react").JSX.Element;
  hidden?: any;
  maxLength?: number;
  readOnly?: boolean;
  name: string;
  label?: string;
  type: FieldType;
  value?: any;
  col?: number;                 // 1..12, default 12
  placeholder?: string;
  className?: string;
  options?: FieldOption[];      // inline options
  optionUrl?: string;           // remote endpoint
  fetchRemote?: boolean;        // if true + optionUrl -> fetch
  slider?: boolean;             // for type: number
  min?: number;                 // for number/slider
  max?: number;
  step?: number;
  validation?: FieldValidation;
  disabled?: false;
  rows?: number,
}

export interface FormTab {
  label: string;
  name: string;
  fields: FormField[];
}

export interface FormSchema {
  title?: string;
  path?: string;                // present -> inline, absent -> popup
  layout?: "horizontal" | "vertical";
  className?: string;
  tabs?: FormTab[];
  fields?: FormField[];         // used when tabs absent
}