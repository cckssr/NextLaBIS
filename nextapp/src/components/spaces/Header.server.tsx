"use server";
import { Button, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";

interface HeaderProps {
  spaceName: string;
  spaceDescription?: string;
}

export async function Header({ spaceName, spaceDescription }: HeaderProps) {
  return (
    <Flex align="center">
      <Stack justify="flex-start" align="flex-start">
        <Title order={2}>{spaceName}</Title>
        <Text size="md" c="dimmed">
          {spaceDescription || ""}
        </Text>
      </Stack>
      <Group justify="flex-end" ml="auto">
        <Button // TODO: Link to edit space details page
          variant="filled"
          size="md"
          leftSection={<IconSettings />}
          visibleFrom="sm"
        >
          Settings
        </Button>
        <Button // TODO: Link to create new project page within the space
          variant="filled"
          size="md"
          leftSection={<IconPlus />}
          visibleFrom="sm"
        >
          Create New Project
        </Button>
      </Group>
    </Flex>
  );
}
