"use server";

import { Grid, GridCol, Group, Text, Tooltip } from "@mantine/core";
import { IconClock, IconFolder, IconUser } from "@tabler/icons-react";
import { formatLocaleDateTime } from "@/lib/utils/datetimeFunctions";

/**
 * Props for MetadataPanel component.
 *
 * @param registratedBy - The name of the user who registered the space.
 * @param modificationDate - The date when the space was last modified.
 * @param registrationDate - The date when the space was registered.
 * @param numberOfProjects - The number of projects in the space.
 */
interface MetadataPanelProps {
  registratedBy: string;
  modificationDate: Date;
  registrationDate: Date;
  numberOfProjects: number;
}

/**
 * MetadataPanel component displays metadata information about a space.
 *
 * Responsibilities:
 * - Show registrated by user
 * - Show registration date
 * - Show last modification date
 * - Show number of collections
 *
 * Server/Client:
 * - Server Component (static data)
 */
export async function MetadataPanel({
  registratedBy,
  modificationDate,
  registrationDate,
  numberOfProjects,
}: MetadataPanelProps) {
  const gridSpan = { md: "auto", sm: 6, xs: 12 } as const;

  return (
    <Grid mt="xs" gap={0}>
      <GridCol span={gridSpan}>
        <Tooltip label="Registrated by">
          <Group gap={0} align="left">
            <IconUser size={16} stroke="dimmed" />
            <Text size="xs" ml="xs" mr="lg" c="dimmed">
              {registratedBy}
            </Text>
          </Group>
        </Tooltip>
      </GridCol>
      <GridCol span={gridSpan}>
        <Tooltip label="Registration date">
          <Group gap={0} align="left">
            <IconClock size={16} stroke="dimmed" />
            <Text size="xs" ml="xs" mr="lg" c="dimmed">
              created {formatLocaleDateTime(registrationDate)}
            </Text>
          </Group>
        </Tooltip>
      </GridCol>
      <GridCol span={gridSpan}>
        <Tooltip label="Last modification date">
          <Group gap={0} align="left">
            <IconClock size={16} stroke="dimmed" />
            <Text size="xs" ml="xs" mr="lg" c="dimmed">
              modified {formatLocaleDateTime(modificationDate)}
            </Text>
          </Group>
        </Tooltip>
      </GridCol>
      <GridCol span={gridSpan}>
        <Group gap={0} align="left">
          <IconFolder size={16} stroke="dimmed" />
          <Text size="xs" ml="xs" mr="lg" c="dimmed">
            {numberOfProjects} projects
          </Text>
        </Group>
      </GridCol>
    </Grid>
  );
}
