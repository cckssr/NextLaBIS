import { OpenbisPermId } from "@/lib/model/OpenBISModel";
import { Stack, Title, Text } from "@mantine/core";

/**
 * Props for the DatasetPage component.
 *
 * @param params - The route parameters containing the datasetPermId.
 */
export interface DatasetPageProps {
  params: Promise<{ datasetPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific dataset.
 */
export default async function DatasetPage({ params }: DatasetPageProps) {
  const { datasetPermId } = await params;

  return (
    <Stack>
      <Title order={2}>Dataset: {datasetPermId}</Title>
      <Text c="dimmed">Dataset details will be displayed here.</Text>
    </Stack>
  );
}
