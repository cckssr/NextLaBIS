"use client";

import { Text, Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { VocabularyOption } from "@/lib/objects/model";

interface ControlledVocabularyRendererProps {
  code: string;
  label: string;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  options?: VocabularyOption[];
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Renderer for CONTROLLEDVOCABULARY property type.
 * View: Shows the label of the selected option.
 * Edit: Select dropdown with available options.
 */
export function ControlledVocabularyRenderer({
  code,
  label,
  value,
  isEditing,
  mandatory,
  options = [],
  form,
}: ControlledVocabularyRendererProps) {
  const stringValue = value != null ? String(value) : "";

  // Find the matching option to get the label
  const selectedOption = options.find((opt) => opt.code === stringValue);
  const displayLabel = selectedOption?.label ?? stringValue;

  // Transform options for Mantine Select
  const selectData = options.map((opt) => ({
    value: opt.code,
    label: opt.label,
  }));

  if (!isEditing) {
    return (
      <div>
        <Text size="sm" c="dimmed" mb={4}>
          {label}
        </Text>
        <Text size="sm">{displayLabel || "—"}</Text>
      </div>
    );
  }

  return (
    <Select
      label={label}
      value={(form?.values[code] as string) ?? null}
      onChange={(val) => form?.setFieldValue(code, val)}
      data={selectData}
      required={mandatory}
      placeholder={`Select ${label.toLowerCase()}`}
      searchable={options.length > 5}
      clearable={!mandatory}
    />
  );
}
