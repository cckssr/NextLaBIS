import {
  Card,
  Group,
  Title,
  Text,
  Grid,
  GridCol,
  TextInput,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const SearchCard = () => (
  <Card withBorder={true} p="lg" shadow="md" radius="lg">
    <Group gap="md" align="center" mb="xs">
      <IconSearch size={20} />
      <Title order={4}>Quick Search</Title>
    </Group>
    <Text c="dimmed">
      Search across all spaces, projects, collections, and objects.
    </Text>
    <Grid mt="md" gap="md">
      <GridCol span={10}>
        <TextInput
          variant="filled"
          placeholder="Search ..."
          radius="md"
          size="md"
        />
      </GridCol>
      <GridCol span={2}>
        <Button size="md" radius="md" fullWidth variant="filled">
          Search
        </Button>
      </GridCol>
    </Grid>
  </Card>
);
