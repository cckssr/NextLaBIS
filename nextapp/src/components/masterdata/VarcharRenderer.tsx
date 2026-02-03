"use client";

import { Text, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface VarcharRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for VARCHAR property type.
 * View: Shows text value.
 * Edit: TextInput field.
 */
export function VarcharRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: VarcharRendererProps) {
  const stringValue = value != null ? String(value) : "";

  if (!isEditing) {
    return (
      <div>
        <Text size="sm" c="dimmed" mb={4}>
          {label}
        </Text>
        <Text size="sm">{stringValue || "—"}</Text>
      </div>
    );
  }

  return (
    <TextInput
      label={label}
      value={(form?.values[code] as string) ?? ""}
      onChange={(e) => form?.setFieldValue(code, e.currentTarget.value)}
      required={mandatory}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  );
}
