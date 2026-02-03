import {
  Stack,
  Divider,
  Text,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from "@mantine/core";
import {
  IconClipboardList,
  IconFile,
  IconGitBranch,
  IconHistory,
} from "@tabler/icons-react";

import type { OpenbisPermId } from "@/lib/model/OpenBISModel";
import { getObjectOverview } from "@/lib/objects";
import { formatUserName } from "@/lib/utils/userFunctions";

import { Header } from "@/components/object/Header.server";
import { BasicInfoCard } from "@/components/object/BasicInfoCard.server";
import { ObjectPropertiesForm } from "@/components/object/ObjectPropertiesForm.client";

/**
 * Props for the ObjectPage component.
 */
export interface ObjectPageProps {
  params: Promise<{ objectPermId: OpenbisPermId }>;
}

/**
 * Placeholder component for tabs that are not yet implemented.
 */
function PlaceholderPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Stack align="center" py="xl" gap="sm">
      <Text size="lg" fw={500} c="dimmed">
        {title}
      </Text>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Stack>
  );
}

/**
 * Overview page for a specific object.
 * Displays object metadata, properties grouped by section, and tabs for files/relationships/history.
 *
 * Server Component - fetches data and passes to client components.
 */
export default async function ObjectPage({ params }: ObjectPageProps) {
  const { objectPermId } = await params;

  // Fetch complete object overview data
  const overview = await getObjectOverview(objectPermId);

  // Format owner name for display
  const ownerName = formatUserName(overview.object.registratedBy);

  return (
    <Stack gap="md">
      <Header
        objectName={overview.objectName}
        objectCode={overview.object.code}
        description={overview.object.description}
      />
      <Divider />

      <Tabs defaultValue="properties" variant="pills" radius="lg">
        <TabsList mb="md">
          <TabsTab
            value="properties"
            leftSection={<IconClipboardList size={16} />}
          >
            Properties
          </TabsTab>
          <TabsTab value="files" leftSection={<IconFile size={16} />}>
            Files & Datasets
          </TabsTab>
          <TabsTab
            value="relationships"
            leftSection={<IconGitBranch size={16} />}
          >
            Relationships
          </TabsTab>
          <TabsTab value="history" leftSection={<IconHistory size={16} />}>
            History
          </TabsTab>
        </TabsList>

        <TabsPanel value="properties">
          <Stack gap="md">
            <BasicInfoCard
              permId={overview.object.permId}
              objectPath={overview.objectPath}
              objectName={overview.objectName}
              objectType={overview.object.objectType}
              description={overview.object.description}
              owner={ownerName}
              registrationDate={overview.object.registrationDate.toISOString()}
              modificationDate={overview.object.modificationDate.toISOString()}
              filesCount={overview.filesCount}
            />
            <ObjectPropertiesForm
              sections={overview.sections}
              propertyValues={overview.propertyValues}
            />
          </Stack>
        </TabsPanel>

        <TabsPanel value="files">
          <PlaceholderPanel
            title="Files & Datasets"
            description="Attached files and related datasets will be displayed here."
          />
        </TabsPanel>

        <TabsPanel value="relationships">
          <PlaceholderPanel
            title="Relationships"
            description="Parent objects, child objects, and component relationships will be displayed here."
          />
        </TabsPanel>

        <TabsPanel value="history">
          <PlaceholderPanel
            title="History"
            description="Object version history and changes will be displayed here."
          />
        </TabsPanel>
      </Tabs>
    </Stack>
  );
}
