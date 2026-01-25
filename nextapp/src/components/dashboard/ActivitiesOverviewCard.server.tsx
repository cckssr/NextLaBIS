"use server";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";

/**
 * Props for ActivitiesOverviewCard component.
 *
 * @property {number} [maxActivityCount=4] - Maximum number of activities to display
 * @property {unknown[]} [activities=[]] - Array of activity objects (TODO: Replace with Activity model type)
 */
interface ActivitiesOverviewCardProps {
  maxActivityCount?: number;
  activities?: Array<unknown>;
}

/**
 * Server Component: Displays overview of recent user activities.
 *
 * @param {ActivitiesOverviewCardProps} props - Component props
 * @returns {Promise<React.ReactElement>} Rendered activities card
 */
export async function ActivitiesOverviewCard({
  // maxActivityCount = 4,
  // activities = [],
}: ActivitiesOverviewCardProps = {}) {
  return (
    <Card withBorder={true} p="lg" shadow="md" radius="lg">
      <Group gap="md" align="center" mb="xs">
        <IconActivity size={20} />
        <Title order={4}>Your Activities</Title>
      </Group>
      <Text c="dimmed">Overview of your recent activities</Text>
      <Stack align="stretch" justify="flex-start" gap="md" mt="md"></Stack>
    </Card>
  );
}
