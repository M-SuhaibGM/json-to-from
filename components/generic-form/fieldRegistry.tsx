import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { SelectField } from "./fields/SelectField";
import { RadioField } from "./fields/RadioField";
import { CheckboxField } from "./fields/CheckboxField";
import { DateField } from "./fields/DateField";
import { FileField } from "./fields/FileField";
import { TextareaField } from "./fields/TextareaField";

export const fieldRegistry: Record<string, React.ComponentType<any>> = {
  text: TextField,
  email: TextField,
  number: NumberField,
  select: SelectField,
  dropdown: SelectField, // Alias
  radio: RadioField,
  checkbox: CheckboxField,
  date: DateField,
  file: FileField,
  textarea: TextareaField,
};