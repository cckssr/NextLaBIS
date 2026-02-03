"use client";

import { Text, Code, Box } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface FallbackRendererProps {
  code: string;
  label: string;
  value: unknown;
  dataType: string;
  isEditing: boolean;
  mandatory?: boolean;
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Fallback renderer for unsupported/complex property types.
 * Used for: XML, SAMPLE, JSON, MATERIAL, HYPERLINK, ARRAY_* types.
 * Shows raw value in View mode, read-only in Edit mode.
 */
export function FallbackRenderer({
  label,
  value,
  dataType,
  isEditing,
}: FallbackRendererProps) {
  const stringValue = value != null ? String(value) : "";

  // For JSON type, try to pretty-print
  let displayValue = stringValue;
  if (dataType === "JSON" && stringValue) {
    try {
      const parsed = JSON.parse(stringValue);
      displayValue = JSON.stringify(parsed, null, 2);
    } catch {
      displayValue = stringValue;
    }
  }

  // Truncate very long values in view mode
  const truncatedValue =
    displayValue.length > 500
      ? displayValue.substring(0, 500) + "..."
      : displayValue;

  return (
    <div>
      <Text size="sm" c="dimmed" mb={4}>
        {label}{" "}
        <Text span size="xs" c="dimmed">
          ({dataType})
        </Text>
      </Text>
      {stringValue ? (
        <Box>
          {dataType === "JSON" || dataType === "XML" ? (
            <Code block style={{ maxHeight: 200, overflow: "auto" }}>
              {truncatedValue}
            </Code>
          ) : (
            <Text size="sm">{truncatedValue || "—"}</Text>
          )}
          {isEditing && (
            <Text size="xs" c="dimmed" mt="xs">
              Editing not supported for {dataType} type
            </Text>
          )}
        </Box>
      ) : (
        <Text size="sm" c="dimmed">
          —
        </Text>
      )}
    </div>
  );
}
