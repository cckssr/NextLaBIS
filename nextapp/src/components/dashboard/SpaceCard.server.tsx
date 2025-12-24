import { Card, Group, Text, Title } from "@mantine/core";

/**
 * Props for SpaceCard component.
 * TODO: Replace with Space model type
 */
interface SpaceCardProps {
  code: string;
  permId: string;
  description?: string;
  registrationDate: Date;
  modificationDate: Date;
  modifiedBy: string;
  spaceRights?: string; // TODO: Define proper type for roles / rights
}
/**
 * SpaceCard component shows information about a single space.
 */
export function SpaceCard({
  code,
  permId,
  description,
  registrationDate,
  modificationDate,
  modifiedBy,
}: SpaceCardProps) {
  const formattedCode: string = code.charAt(0).toUpperCase() + code.slice(1).toLowerCase(); // FEAT: Global function for formatting codes (with _ etc.)
  return (
    formattedCode: string = code.charAt(0).toUpperCase() + code.slice(1).toLowerCase();
    <Card withBorder={true} p="lg" shadow="md" radius="lg">
      <Group gap="md" align="center" mb="xs">
        <Title order={4}>{formattedCode}</Title>
      </Group>
      <Text c="dimmed">{description}</Text>
    </Card>
  );
}
