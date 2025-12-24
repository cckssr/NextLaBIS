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

export default function DashboardPage() {
  return (
    <Stack>
      <Header />
      <SearchCard />
      <Grid mt="md" gutter="md">
        {/* Spaces Card */}
        <GridCol span={8}>
          <SpacesOverviewCard />
        </GridCol>
        <GridCol span={4}>
          {/* Recent Activities Card */}
          <Card withBorder={true} p="lg" shadow="md" radius="lg"></Card>
        </GridCol>
      </Grid>
    </Stack>
  );
}
