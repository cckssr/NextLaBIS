"use client";

import { Card, Grid, GridCol, Title, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { PropertyRenderer } from "@/components/masterdata";
import type { PropertySection } from "@/lib/objects/model";
import { getPropertySpan, spanToGridCols } from "@/lib/objects/model";

interface SectionCardProps {
  section: PropertySection;
  propertyValues: Record<string, unknown>;
  isEditing: boolean;
  form: UseFormReturnType<Record<string, unknown>>;
}

/**
 * SectionCard displays a group of properties within a Card.
 * Uses intelligent grid layout based on property data types:
 * - Full width for MULTILINE_VARCHAR, XML, JSON
 * - Smaller spans for simple types like BOOLEAN, INTEGER
 *
 * Client Component for form interaction.
 */
export function SectionCard({
  section,
  propertyValues,
  isEditing,
  form,
}: SectionCardProps) {
  // Filter out hidden properties in edit mode if showInEditView is false
  const visibleProperties = isEditing
    ? section.properties.filter((p) => p.showInEditView)
    : section.properties;

  if (visibleProperties.length === 0) {
    return null;
  }

  return (
    <Card withBorder radius="md" p="md">
      <Title order={5} mb="xs">
        {section.sectionName}
      </Title>
      <Text size="xs" c="dimmed" mb="md">
        {getSectionDescription(section.sectionName)}
      </Text>

      <Grid gutter="md">
        {visibleProperties.map((prop) => {
          // Get property code as key for value lookup (lowercase with dots)
          const valueKey = prop.code.toLowerCase().replace(/\./g, ".");
          const value = propertyValues[valueKey];

          // Calculate grid span based on data type
          const spanHint = getPropertySpan(prop.dataType);
          const gridSpan = spanToGridCols(spanHint);

          return (
            <GridCol key={prop.code} span={gridSpan}>
              <PropertyRenderer
                code={valueKey}
                label={prop.code}
                dataType={prop.dataType}
                value={value}
                isEditing={isEditing}
                mandatory={prop.mandatory}
                vocabularyOptions={prop.vocabularyOptions}
                form={form}
              />
            </GridCol>
          );
        })}
      </Grid>
    </Card>
  );
}

/**
 * Generate description text for common section names.
 */
function getSectionDescription(sectionName: string): string {
  const descriptions: Record<string, string> = {
    Allgemein: "General information and identification",
    Details: "Detailed specifications and status information",
    Lagerung: "Storage location and organization",
    Versuchsdurchführung: "Experiment execution details",
    "Notizen / Kommentare": "Additional notes and comments",
    Röhreninformation: "Tube specifications and properties",
    Identifikation: "Identification and classification",
  };

  return descriptions[sectionName] || `Properties in ${sectionName}`;
}
