import { OpenbisPermId } from "@/lib/model/OpenBISModel";
import { Stack, Title, Text } from "@mantine/core";

/**
 * Props for the CollectionPage component.
 *
 * @param params - The route parameters containing the collectionPermId.
 */
export interface CollectionOverviewPageProps {
  params: Promise<{ collectionPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific collection.
 */
export default async function CollectionOverviewPage({
  params,
}: CollectionOverviewPageProps) {
  const { collectionPermId } = await params;

  return (
    <Stack>
      <Title order={2}>Collection: {collectionPermId}</Title>
      <Text c="dimmed">Collection details will be displayed here.</Text>
    </Stack>
  );
}
