"use client";

import { Checkbox } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface BooleanRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for BOOLEAN property type.
 * View: Shows "Yes"/"No" text or Checkbox disabled.
 * Edit: Interactive Checkbox.
 */
export function BooleanRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: BooleanRendererProps) {
  // Parse boolean from various formats (string "true", boolean, null)
  const boolValue =
    value === true || value === "true" || value === "TRUE" || value === "1";

  if (!isEditing) {
    return (
      <Checkbox
        label={label}
        checked={boolValue}
        disabled
        styles={{ label: { cursor: "default" } }}
      />
    );
  }

  return (
    <Checkbox
      label={label}
      checked={form?.values[code] === true}
      onChange={(e) => form?.setFieldValue(code, e.currentTarget.checked)}
      required={mandatory}
    />
  );
}
