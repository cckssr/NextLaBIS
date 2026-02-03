"use client";

import { useState } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy, IconEdit, IconX } from "@tabler/icons-react";

import { SectionCard } from "./SectionCard.client";
import type { PropertySection } from "@/lib/objects/model";

interface ObjectPropertiesFormProps {
  sections: PropertySection[];
  propertyValues: Record<string, unknown>;
}

/**
 * ObjectPropertiesForm wraps all property sections with central form state.
 * Manages isEditing toggle and provides form instance to all SectionCards.
 *
 * Client Component for form state management.
 */
export function ObjectPropertiesForm({
  sections,
  propertyValues,
}: ObjectPropertiesFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with current property values
  const form = useForm<Record<string, unknown>>({
    initialValues: { ...propertyValues },
  });

  const handleSave = () => {
    // Phase 0: Just log the values, no actual API call
    console.log("Form values to save:", form.values);
    setIsEditing(false);
    // TODO(#39): Phase 1 - Call API to save changes
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Stack gap="md">
      {/* Edit mode controls */}
      <Group justify="flex-end">
        {isEditing ? (
          <>
            <Button
              variant="default"
              size="sm"
              leftSection={<IconX size={16} />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              size="sm"
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            variant="light"
            size="sm"
            leftSection={<IconEdit size={16} />}
            onClick={handleEdit}
          >
            Edit Properties
          </Button>
        )}
      </Group>

      {isEditing && (
        <Text size="sm" c="blue">
          You are in edit mode. Make changes and click "Save Changes" to apply.
        </Text>
      )}

      {/* Dynamic Section Cards */}
      {sections.map((section) => (
        <SectionCard
          key={section.sectionName}
          section={section}
          propertyValues={propertyValues}
          isEditing={isEditing}
          form={form}
        />
      ))}
    </Stack>
  );
}
