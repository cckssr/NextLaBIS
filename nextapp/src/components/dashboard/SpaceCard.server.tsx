import {
  Card,
  Group,
  Text,
  Title,
  Tooltip,
  Flex,
  Grid,
  GridCol,
} from "@mantine/core";
import {
  IconClock,
  IconFlask,
  IconFolder,
  IconUser,
} from "@tabler/icons-react";
import TagPill from "../shared/TagPill/TagPill";
import { OpenBISRole } from "@/types/openbis";
import RightsPill from "../shared/RightsPill/RightsPill";
import Link from "next/link";

/**
 * Props for SpaceCard component.
 * TODO: Replace with Space model type
 */
interface SpaceCardProps {
  code: string;
  modificationDate: Date;
  modifiedBy: string;
  numberOfProjects?: number;
  numberOfCollections?: number;
  description?: string;
  tags?: string[]; // TODO: Replace with proper Tag type
  spaceRights?: OpenBISRole; // TODO: Define proper type for roles / rights
}
/**
 * SpaceCard component shows information about a single space.
 */
export function SpaceCard({
  code,
  modificationDate,
  modifiedBy,
  numberOfProjects = 0,
  numberOfCollections = 0,
  description = "",
  tags = [],
  spaceRights = "observer",
}: SpaceCardProps) {
  const formattedCode =
    code.charAt(0).toUpperCase() + code.slice(1).toLowerCase(); // TODO:: Replace with proper formatting logic
  const gridSpan = { md: "content", sm: 4, xs: 6 };
  return (
    <Link
      href={`/spaces/${encodeURIComponent(code)}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card withBorder={true} p="lg" shadow="md" radius="lg">
        {/* TODO: Add hover effect with SSR still enabled */}
        <Flex gap="sm" pr="md" wrap="nowrap" style={{ overflow: "hidden" }}>
          <Title order={4} mr="lg">
            {formattedCode}
          </Title>
          <RightsPill role={spaceRights} />
          {/* FIXME: too many tags break layout / overflow */}
          {tags.map((tag, i) => (
            <TagPill key={i} label={tag} />
          ))}
        </Flex>
        <Text c="dimmed" lineClamp={2}>
          {description}
        </Text>
        <Grid mt="xs" gap={0}>
          <GridCol span={gridSpan}>
            <Group gap={0} align="left">
              <IconFlask size={16} stroke="dimmed" />
              <Text size="xs" ml="xs" mr="lg" c="dimmed">
                {numberOfProjects} projects
              </Text>
            </Group>
          </GridCol>
          <GridCol span={gridSpan}>
            <Group gap={0} align="left">
              <IconFolder size={16} stroke="dimmed" />
              <Text size="xs" ml="xs" mr="lg" c="dimmed">
                {numberOfCollections} collections
              </Text>
            </Group>
          </GridCol>
          <GridCol span={gridSpan}>
            <Tooltip label="Last modified by">
              <Group gap={0} align="left">
                <IconUser size={16} stroke="dimmed" />
                <Text size="xs" ml="xs" mr="lg" c="dimmed">
                  {modifiedBy}
                </Text>
              </Group>
            </Tooltip>
          </GridCol>
          <GridCol span={gridSpan}>
            <Tooltip label="Last modification date">
              <Group gap={0} align="left">
                <IconClock size={16} stroke="dimmed" />
                <Text size="xs" ml="xs" mr="lg" c="dimmed">
                  {formatRelativeTime(modificationDate)}
                </Text>
              </Group>
            </Tooltip>
          </GridCol>
        </Grid>
      </Card>
    </Link>
  );
}

/**
 * Formats a date to a relative time string (e.g., "2 days ago").
 *
 * @param date - The date to format.
 * @returns A string representing the relative time.
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

  if (Math.abs(diffInDays) < 1) {
    return `${Math.floor(Math.abs(diffInHours))} hours ago`;
  }
  return `${Math.floor(Math.abs(diffInDays))} days ago`;
}
