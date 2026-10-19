import { z } from "zod";
import type { FormField } from "../types";

// 1. Helper to generate a single Zod rule based on the JSON field
function buildFieldSchema(field: FormField) {
  let schema: z.ZodTypeAny;

  // Base schema based on type
  switch (field.type) {
    case "number":
      schema = z.coerce.number(); // Coerces string inputs to numbers safely
      break;
    case "checkbox":
      schema = z.array(z.any()).default([]); // Arrays for checkboxes
      break;
    case "email":
      schema = z.string().email();
      break;
    default:
      schema = z.string();
  }

  // Apply JSON Validation rules
  const v = field.validation;
  if (v) {
    const errorMsg = v.message || `${field.label || field.name} is invalid`;

    // Required check
    if (v.required) {
      if (field.type === "email" || field.type === "text" || field.type === "textarea" || field.type === "select" || field.type === "dropdown") {
        schema = (schema as z.ZodString).min(1, { message: errorMsg });
      }
    } else {
      // If not required, allow empty string
      schema = z.union([schema, z.literal("")]);
    }

    // Number min/max
    if (field.type === "number" && schema instanceof z.ZodNumber) {
      if (v.min !== undefined) schema = schema.min(v.min, { message: errorMsg });
      if (v.max !== undefined) schema = (schema as z.ZodNumber).max(v.max, { message: errorMsg });
    }

    // Regex pattern
    if (v.pattern && schema instanceof z.ZodString) {
      schema = schema.regex(new RegExp(v.pattern), { message: errorMsg });
    }
  }

  return schema;
}

// 2. Validate a single field (used for live typing / onBlur if needed)
export function validateField(field: FormField, value: any): string | null {
  const schema = buildFieldSchema(field);
  const result = schema.safeParse(value);

  if (!result.success) {
    // Return the first error message
    return result.error.issues[0]?.message || "Invalid value";
  }
  return null;
}

// 3. Validate all fields at once (used on Submit)
export function validateAll(
  fields: FormField[],
  values: Record<string, any>
): Record<string, string> {
  // Build a shape object for the Zod object
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    shape[field.name] = buildFieldSchema(field);
  }

  const formSchema = z.object(shape);
  const result = formSchema.safeParse(values);

  if (result.success) return {};

  // Map Zod errors to a simple Record<fieldName, errorMessage>
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0] as string;
    // Only keep the first error per field to keep UI clean
    if (!errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  }

  return errors;
}