import { Card, Group, Text, Title } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";

/**
 * Props for SpacesOverviewCard component.
 *
 * TODO: maxSpaceCount should be calculated based on window size of the Dashboard
 * @param maxSpaceCount - Maximum number of spaces to display in the card.
 */
interface SpacesCardProps {
  maxSpaceCount?: number;
  spaces: Array; // TODO:: Replace Array with actual Space model type, e.g., Space[]
}

/**
 * SpacesOverviewCard component displays an overview of recent user spaces.
 * The overview card shows a list of spaces with recent activity.
 * Each space card is designed statically and then rendered with data within this component.
 *
 *
 */
export function SpacesOverviewCard({
  maxSpaceCount = 4,
  spaces,
}: SpacesCardProps) {
  return (
    <Card withBorder={true} p="lg" shadow="md" radius="lg">
      <Group gap="md" align="center" mb="xs">
        <IconFolder size={20} />
        <Title order={4}>Your Spaces</Title>
      </Group>
      <Text c="dimmed">Overview of your spaces with recent activity</Text>
    </Card>
  );
}
