import { OpenbisPermId } from "@/lib/model/OpenBISModel";
import { Stack, Title, Text } from "@mantine/core";

/**
 * Props for the ProjectOverviewPage component.
 *
 * @param params - The route parameters containing the projectPermId.
 */
export interface ProjectOverviewPageProps {
  params: Promise<{ projectPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific project.
 */
export default async function ProjectOverviewPage({
  params,
}: ProjectOverviewPageProps) {
  const { projectPermId } = await params;

  return (
    <Stack>
      <Title order={2}>Project: {projectPermId}</Title>
      <Text c="dimmed">Project details will be displayed here.</Text>
    </Stack>
  );
}
