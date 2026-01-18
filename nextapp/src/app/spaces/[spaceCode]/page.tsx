import { Header } from "@/components/spaces/Header.server";
import { Stack } from "@mantine/core";

export interface SpaceOverviewPageProps {
  params: { spaceCode: string };
}
export default async function SpaceOverviewPage({
  params,
}: SpaceOverviewPageProps) {
  // TODO: convert spaceCode to spaceName if latter empty, include transformation of _ to space
  const { spaceCode } = await params;
  const spaceDescription = "An example space description to be replaced later."; // TODO: Fetch space description from backend

  return (
    <Stack>
      <Header spaceName={spaceCode} spaceDescription={spaceDescription} />
    </Stack>
  );
}
