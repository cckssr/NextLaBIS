import {
  Badge,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDownload, IconEdit } from "@tabler/icons-react";

/**
 * Props for Object Header component.
 */
interface HeaderProps {
  objectName: string;
  objectCode: string;
  description?: string | null;
}

/**
 * Header component for Object detail page.
 *
 * Responsibilities:
 * - Show object name (from $name property)
 * - Show object code as badge
 * - Show object type as badge
 * - Provide Export and Edit action buttons
 * - Show description if available
 *
 * Server/Client: Server Component (static data)
 */
export function Header({ objectName, objectCode, description }: HeaderProps) {
  return (
    <Stack gap="xs">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Group gap="sm" align="center">
          <Title order={2}>{objectName}</Title>
          <Badge variant="light" color="gray" size="lg">
            {objectCode}
          </Badge>
          <Badge variant="filled" color="teal" size="sm">
            Active
          </Badge>
        </Group>
        <Group gap="xs">
          <Tooltip label="Export object data">
            <Button
              variant="default"
              size="sm"
              leftSection={<IconDownload size={16} />}
            >
              Export
            </Button>
          </Tooltip>
          <Tooltip label="Edit object properties">
            <Button
              variant="filled"
              size="sm"
              leftSection={<IconEdit size={16} />}
            >
              Edit
            </Button>
          </Tooltip>
        </Group>
      </Group>
      {description && (
        <Text size="sm" c="dimmed" maw={800}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
