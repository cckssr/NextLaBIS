import { SearchCard } from "@/components/dashboard/SearchCard.server";
import { Header } from "@/components/dashboard/Header.server";
import { SpacesOverviewCard } from "@/components/dashboard/SpacesOverviewCard.server";
import {
  Flex,
  Stack,
  Group,
  Space,
  Text,
  Button,
  Card,
  Title,
  TextInput,
  Grid,
  GridCol,
  CardSection,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";

const MOCK_SPACES = [
  {
    code: "SPACE_ONE",
    modificationDate: new Date("2025-12-10"),
    modifiedBy: "User A",
    numberOfProjects: 5,
    numberOfCollections: 2,
    description: "This is the first space.",
    tags: ["Quantum", "Research", "Active"],
    spaceRights: "admin",
  },
  {
    code: "SPACE_TWO",
    modificationDate: new Date("2024-06-15"),
    modifiedBy: "User B",
    numberOfProjects: 3,
    numberOfCollections: 4,
    description: "This is the second space.",
    tags: ["Biology", "Archived"],
    spaceRights: "power_user",
  },
  {
    code: "SPACE_THREE",
    modificationDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 days ago
    modifiedBy: "User C",
    numberOfProjects: 8,
    numberOfCollections: 1,
    description:
      "This is the third space with a very long description that should automatically clamp after x lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Chemistry",
      "In Progress",
      "Important",
      "Long Tag",
      "Extra Tag",
      "Tag6",
    ],
  },
  {
    code: "SPACE_FOUR",
    modificationDate: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    modifiedBy: "User D",
    numberOfProjects: 0,
    numberOfCollections: 0,
    description: "This is the fourth space.",
    tags: [],
    spaceRights: "user",
  },
];

export default function DashboardPage() {
  return (
    <Stack>
      <Header />
      <SearchCard />
      <Grid mt="md" gutter="md">
        {/* Spaces Card */}
        <GridCol span={8}>
          <SpacesOverviewCard maxSpaceCount={4} spaces={MOCK_SPACES} />
        </GridCol>
        <GridCol span={4}>
          {/* Recent Activities Card */}
          <Card withBorder={true} p="lg" shadow="md" radius="lg"></Card>
        </GridCol>
      </Grid>
    </Stack>
  );
}
