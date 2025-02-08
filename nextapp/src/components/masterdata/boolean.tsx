// component for rendering masterdata properties of type: boolean

// type information for the props
interface FormProps {
  code: string;
  name: string;
  description: string;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

export default function BooleanForm({
  code,
  name,
  description,
  editable = true,
  mandatory = false,
  error = null,
}: FormProps) {
  return;
}
