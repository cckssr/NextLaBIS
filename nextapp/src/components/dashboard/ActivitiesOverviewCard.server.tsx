import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";

interface ActivitiesOverviewCardProps {
  maxActivityCount?: number;
  activities: Array; // TODO:: Replace Array with actual Activity model type, e.g., Activity[]
}

export function ActivitiesOverviewCard({
  maxActivityCount = 4,
  activities,
}: ActivitiesOverviewCardProps) {
  return (
    <Card withBorder={true} p="lg" shadow="md" radius="lg">
      <Group gap="md" align="center" mb="xs">
        <IconActivity size={20} />
        <Title order={4}>Your Activities</Title>
      </Group>
      <Text c="dimmed">Overview of your recent activities</Text>
      <Stack align="stretch" justify="flex-start" spacing="md" mt="md"></Stack>
    </Card>
  );
}
