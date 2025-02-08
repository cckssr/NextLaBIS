// component for rendering masterdata properties of type: multiline_varchar

// type information for the props
interface FormProps {
  code: string;
  name: string;
  description: string;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

// ...existing code...

export default function MultilineVarcharForm({
  code,
  name,
  description,
  editable = true,
  mandatory = false,
  error = null,
}: FormProps) {
  return;
}
