// component for rendering masterdata properties of type: date

// type information for the props
interface DateFormProps {
  code: string;
  name: string;
  description: string;
  editable?: boolean;
  mandatory?: boolean;
  error?: string;
}

// const gridSpan = { base: 12, md: 6, lg: "content" };

export default function DateForm({
  code,
  name,
  description,
  editable = true,
  mandatory = false,
  error = null,
}: DateFormProps) {
  return;
}
