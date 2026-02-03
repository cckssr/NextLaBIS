"use client";

import { Text, NumberInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface RealRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for REAL property type.
 * View: Shows formatted decimal value.
 * Edit: NumberInput with decimal support.
 */
export function RealRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: RealRendererProps) {
  // Parse float from string or number
  const numValue = value != null ? parseFloat(String(value)) : null;
  const displayValue = !isNaN(numValue as number) ? numValue : null;

  if (!isEditing) {
    return (
      <div>
        <Text size="sm" c="dimmed" mb={4}>
          {label}
        </Text>
        <Text size="sm">{displayValue ?? "—"}</Text>
      </div>
    );
  }

  return (
    <NumberInput
      label={label}
      value={(form?.values[code] as number) ?? ""}
      onChange={(val) => form?.setFieldValue(code, val)}
      required={mandatory}
      allowDecimal
      decimalScale={4}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  );
}
