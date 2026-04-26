"use client";

import type { UseFormReturnType } from "@mantine/form";
import type { OpenbisPropertyDataType } from "@/lib/model/OpenBISModel";
import type { VocabularyOption } from "@/lib/objects/model";

import { BooleanRenderer } from "./BooleanRenderer";
import { VarcharRenderer } from "./VarcharRenderer";
import { IntegerRenderer } from "./IntegerRenderer";
import { RealRenderer } from "./RealRenderer";
import { DateRenderer } from "./DateRenderer";
import { ControlledVocabularyRenderer } from "./ControlledVocabularyRenderer";
import { MultilineRenderer } from "./MultilineRenderer";
import { FallbackRenderer } from "./FallbackRenderer";

export interface PropertyRendererProps {
  code: string;
  label: string;
  dataType: OpenbisPropertyDataType;
  value: unknown;
  isEditing: boolean;
  mandatory?: boolean;
  vocabularyOptions?: VocabularyOption[];
  form?: UseFormReturnType<Record<string, unknown>>;
}

/**
 * Factory component that selects the appropriate renderer based on dataType.
 * Central entry point for all property rendering.
 */
export function PropertyRenderer({
  code,
  label,
  dataType,
  value,
  isEditing,
  mandatory,
  vocabularyOptions,
  form,
}: PropertyRendererProps) {
  // Format label from property code (e.g., "EQUIPMENT.SERIAL_NUMBER" -> "Serial Number")
  const formattedLabel = formatLabel(label);

  const commonProps = {
    code,
    label: formattedLabel,
    value,
    isEditing,
    mandatory,
    form,
  };

  switch (dataType) {
    case "BOOLEAN":
      return <BooleanRenderer {...commonProps} />;

    case "VARCHAR":
      return <VarcharRenderer {...commonProps} />;

    case "INTEGER":
    case "ARRAY_INTEGER":
      return <IntegerRenderer {...commonProps} />;

    case "REAL":
    case "ARRAY_REAL":
      return <RealRenderer {...commonProps} />;

    case "DATE":
    case "TIMESTAMP":
    case "ARRAY_TIMESTAMP":
      return <DateRenderer {...commonProps} />;

    case "CONTROLLEDVOCABULARY":
      return (
        <ControlledVocabularyRenderer
          {...commonProps}
          options={vocabularyOptions}
        />
      );

    case "MULTILINE_VARCHAR":
      return <MultilineRenderer {...commonProps} />;

    case "XML":
    case "JSON":
    case "OBJECT":
    case "MATERIAL":
    case "HYPERLINK":
    case "ARRAY_STRING":
    default:
      return <FallbackRenderer {...commonProps} dataType={dataType} />;
  }
}

/**
 * Formats a property code into a human-readable label.
 * "EQUIPMENT.SERIAL_NUMBER" -> "Serial Number"
 * "$NAME" -> "Name"
 */
function formatLabel(code: string): string {
  // Remove prefix before dot (e.g., "EQUIPMENT.")
  let label = code.includes(".") ? code.split(".").pop()! : code;

  // Remove $ prefix for system properties
  label = label.replace(/^\$/, "");

  // Replace underscores with spaces and capitalize words
  return label
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
