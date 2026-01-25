"use client";

import { useState } from "react";
import {
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  TextInput,
  Button,
} from "@mantine/core";
import {
  IconDownload,
  IconFilter,
  IconFlask,
  IconSearch,
} from "@tabler/icons-react";
import { SpaceOverview } from "@/lib/spaces/model";
import { formatUserName } from "@/lib/utils/userFunctions";
import { SortableTable } from "../shared/SortableTable/Table.client";

export interface ProjectsTableProps {
  projects: SpaceOverview["projects"];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [search, setSearch] = useState("");

  const tableData = projects.map((project) => ({
    code: project.code,
    description: project.description || "",
    numberOfCollections: project.numberOfCollections,
    numberOfObjects: project.numberOfObjects,
    registratedBy: formatUserName(project.registratedBy),
    modificationDate: project.modificationDate.toLocaleDateString(),
  }));

  return (
    <Card withBorder={true} p="lg" shadow="md" radius="lg">
      {/* Table Header */}
      <Flex>
        <Stack gap={0}>
          <Group gap="sm" align="center">
            <IconFlask size={25} stroke={1.5} />
            <Title order={4}>Projects</Title>
          </Group>
          <Text c="dimmed">
            List of projects and experiment series in this space
          </Text>
        </Stack>
        <Group ml="auto">
          <TextInput
            placeholder="Search projects..."
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button
            variant="outline"
            leftSection={<IconFilter size={16} stroke={1.5} />}
          >
            Filter
          </Button>
          <Button
            variant="outline"
            leftSection={<IconDownload size={16} stroke={1.5} />}
          >
            Export
          </Button>
        </Group>
      </Flex>
      {/* Table */}
      <SortableTable
        data={tableData}
        columns={[
          { key: "code", label: "Code" },
          { key: "description", label: "Description" },
          { key: "numberOfCollections", label: "Collections" },
          { key: "numberOfObjects", label: "Objects" },
          { key: "registratedBy", label: "Registrated By" },
          { key: "modificationDate", label: "Last Modified" },
        ]}
        showSearch={false}
        rowKey="code"
        searchValue={search}
        highlightOnHover={true}
        withRowBorders={false}
        mt="md"
      />
    </Card>
  );
}
