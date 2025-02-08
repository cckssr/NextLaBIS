// component for rendering masterdata properties of type: hyperlink

// type information for the props
interface FormProps {
    code: string;
    name: string;
    description: string;
    editable?: boolean;
    mandatory?: boolean;
    error?: string;
  }
  
  // const gridSpan = { base: 12, md: 6, lg: "content" };
  
  export default function Form({
    code,
    name,
    description,
    editable = true,
    mandatory = false,
    error = null,
  }: FormProps) {
    return;
  }
  