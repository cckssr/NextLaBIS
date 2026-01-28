import { OpenbisPermId } from "@/lib/model/OpenBISModel";
import { Stack, Title, Text } from "@mantine/core";

/**
 * Props for the ObjectPage component.
 *
 * @param params - The route parameters containing the objectPermId.
 */
export interface ObjectPageProps {
  params: Promise<{ objectPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific object.
 */
export default async function ObjectPage({ params }: ObjectPageProps) {
  const { objectPermId } = await params;

  return (
    <Stack>
      <Title order={2}>Object: {objectPermId}</Title>
      <Text c="dimmed">Object details will be displayed here.</Text>
    </Stack>
  );
}
