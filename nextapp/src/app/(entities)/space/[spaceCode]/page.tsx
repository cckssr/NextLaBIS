import { Stack } from "@mantine/core";
import { Header } from "@/components/spaces/Header.server";
import { MetadataPanel } from "@/components/spaces/MetadataPanel.server";
import { ProjectsTable } from "@/components/spaces/ProjectsTable.client";
import { getSpaceOverview } from "@/lib/spaces/getSpaceOverview";

/**
 * Props for the SpaceOverviewPage component.
 *
 * @param params - The route parameters containing the spaceCode.
 */
export interface SpaceOverviewPageProps {
  params: Promise<{ spaceCode: string }>;
}

/**
 * Overview page for a specific space.
 */
export default async function SpaceOverviewPage({
  params,
}: SpaceOverviewPageProps) {
  const { spaceCode } = await params;

  const spaceOverview = await getSpaceOverview(spaceCode);

  return (
    <Stack>
      <Header
        spaceName={spaceOverview.space.code}
        spaceDescription={spaceOverview.space.description ?? undefined}
      />
      <MetadataPanel
        registratedBy={
          spaceOverview.space.registratedBy.firstName ||
          spaceOverview.space.registratedBy.userId
        }
        modificationDate={spaceOverview.space.modificationDate}
        registrationDate={spaceOverview.space.registrationDate}
        numberOfProjects={spaceOverview.projects.length}
      />
      <ProjectsTable projects={spaceOverview.projects} />
    </Stack>
  );
}
