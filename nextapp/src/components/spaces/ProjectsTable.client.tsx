"use client";

import {
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Table,
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

export interface ProjectsTableProps {
  projects: SpaceOverview["projects"];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const rows = projects.map((element) => (
    <Table.Tr key={element.code}>
      <Table.Td>{element.code}</Table.Td>
      <Table.Td>{element.description || ""}</Table.Td>
      <Table.Td>{element.numberOfCollections}</Table.Td>
      <Table.Td>{element.numberOfObjects}</Table.Td>
      <Table.Td>{formatUserName(element.registratedBy)}</Table.Td>
      <Table.Td>{element.modificationDate.toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

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
      <Table.ScrollContainer minWidth={500} mt="md">
        <Table highlightOnHover stickyHeader withRowBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Code</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Collections</Table.Th>
              <Table.Th>Objects</Table.Th>
              <Table.Th>Registrated By</Table.Th>
              <Table.Th>Last Modified</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
}
