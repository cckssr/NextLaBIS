import { Card, Group, SimpleGrid, Text, Title, Tooltip } from "@mantine/core";
import {
  IconCalendar,
  IconFile,
  IconFolder,
  IconHash,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import { formatLocaleDateTime } from "@/lib/utils/datetimeFunctions";
import { CopyableText } from "./CopyableText.client";

/**
 * Props for BasicInfoCard component.
 * Uses string dates for serialization across Server-Client boundary.
 */
interface BasicInfoCardProps {
  permId: string;
  objectPath: string;
  objectName: string;
  objectType: string;
  description?: string | null;
  owner: string;
  registrationDate: string; // ISO string for serialization
  modificationDate: string; // ISO string for serialization
  filesCount: number;
}

/**
 * BasicInfoCard displays core metadata that is the same for all objects.
 * This is the static "Basic Information" section from the mockup.
 *
 * Server/Client: Server Component (static data)
 */
export function BasicInfoCard({
  permId,
  objectPath,
  objectName,
  objectType,
  description,
  owner,
  registrationDate,
  modificationDate,
  filesCount,
}: BasicInfoCardProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Title order={5} mb="md">
        Basic Information
      </Title>
      <Text size="xs" c="dimmed" mb="md">
        Core metadata for this object
      </Text>

      <SimpleGrid cols={2} spacing="lg" verticalSpacing="md">
        {/* Permanent ID */}
        <InfoField
          icon={<IconHash size={14} />}
          label="Permanent ID"
          value={permId}
          copyable
        />

        {/* Object Path */}
        <InfoField
          icon={<IconFolder size={14} />}
          label="Object Path"
          value={objectPath}
        />

        {/* Name */}
        <InfoField
          icon={<IconTag size={14} />}
          label="Name"
          value={objectName}
        />

        {/* Type */}
        <InfoField
          icon={<IconTag size={14} />}
          label="Type"
          value={objectType.replace(/_/g, " ")}
        />

        {/* Description - spans full width if present */}
        {description && (
          <div style={{ gridColumn: "1 / -1" }}>
            <InfoField
              icon={<IconFile size={14} />}
              label="Description"
              value={description}
            />
          </div>
        )}

        {/* Owner */}
        <InfoField icon={<IconUser size={14} />} label="Owner" value={owner} />

        {/* Created */}
        <InfoField
          icon={<IconCalendar size={14} />}
          label="Created"
          value={formatLocaleDateTime(registrationDate)}
        />

        {/* Modified */}
        <InfoField
          icon={<IconCalendar size={14} />}
          label="Modified"
          value={formatLocaleDateTime(modificationDate)}
        />

        {/* Files Count */}
        <InfoField
          icon={<IconFile size={14} />}
          label="Files"
          value={`${filesCount} Files`}
        />
      </SimpleGrid>
    </Card>
  );
}

/**
 * Helper component for consistent info field rendering.
 */
interface InfoFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyable?: boolean;
}

function InfoField({ icon, label, value, copyable }: InfoFieldProps) {
  return (
    <div>
      <Tooltip label={label}>
        <Group gap={4} mb={4}>
          {icon}
          <Text size="xs" c="dimmed">
            {label}
          </Text>
        </Group>
      </Tooltip>
      {copyable ? (
        <CopyableText value={value} />
      ) : (
        <Text size="sm" style={{ wordBreak: "break-word" }}>
          {value}
        </Text>
      )}
    </div>
  );
}
