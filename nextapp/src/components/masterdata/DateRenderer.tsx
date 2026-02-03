"use client";

import { Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { UseFormReturnType } from "@mantine/form";

interface DateRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for DATE property type.
 * View: Shows formatted date.
 * Edit: DateInput picker.
 */
export function DateRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  form,
}: DateRendererProps) {
  // Parse date from string (YYYY-MM-DD format) or Date object
  let dateValue: Date | null = null;
  if (value instanceof Date) {
    dateValue = value;
  } else if (typeof value === "string" && value) {
    dateValue = new Date(value);
    if (isNaN(dateValue.getTime())) {
      dateValue = null;
    }
  }

  const formattedDate = dateValue
    ? dateValue.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null;

  if (!isEditing) {
    return (
      <div>
        <Text size="sm" c="dimmed" mb={4}>
          {label}
        </Text>
        <Text size="sm">{formattedDate ?? "—"}</Text>
      </div>
    );
  }

  return (
    <DateInput
      label={label}
      value={(form?.values[code] as Date) ?? null}
      onChange={(val) => form?.setFieldValue(code, val)}
      required={mandatory}
      placeholder="Select date"
      valueFormat="DD.MM.YYYY"
    />
  );
}
