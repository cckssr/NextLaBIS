"use server";
import { Button, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";

/**
 * Props for Header component.
 *
 * @param spaceName - The name of the space.
 * @param spaceDescription - The description of the space.
 */
interface HeaderProps {
  spaceName: string;
  spaceDescription?: string;
}

/**
 * Header component displays the header section for a space overview page.
 *
 * Responsibilities:
 * - Show space name
 * - Show space description
 * - Provide actions to edit space settings and create new projects
 *
 * Server/Client:
 * - Server Component (static data)
 */
export async function Header({ spaceName, spaceDescription }: HeaderProps) {
  return (
    <Stack justify="flex-start" align="flex-start">
      <Group w="100%" align="center">
        <Title order={2}>{spaceName}</Title>
        <Group justify="flex-end" ml="auto">
          <Tooltip label="Edit space settings (name, description)">
            <Button // TODO: Link to edit space details page
              variant="light"
              size="md"
              leftSection={<IconSettings />}
              visibleFrom="sm"
            >
              Settings
            </Button>
          </Tooltip>
          <Tooltip label="Create a new project within this space">
            <Button // TODO: Link to create new project page within the space
              variant="filled"
              size="md"
              leftSection={<IconPlus />}
              visibleFrom="sm"
            >
              Create New Project
            </Button>
          </Tooltip>
        </Group>
      </Group>
      <Text size="md" c="dimmed">
        {spaceDescription || ""}
      </Text>
    </Stack>
  );
}
