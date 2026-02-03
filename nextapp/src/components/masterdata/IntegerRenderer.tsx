"use client";

import { Text, NumberInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface IntegerRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for INTEGER property type.
 * View: Shows formatted integer value.
 * Edit: NumberInput with step=1.
 */
export function IntegerRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: IntegerRendererProps) {
  // Parse integer from string or number
  const numValue = value != null ? parseInt(String(value), 10) : null;
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
      allowDecimal={false}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  );
}
