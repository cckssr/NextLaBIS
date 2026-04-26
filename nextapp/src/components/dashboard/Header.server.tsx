import { Grid, Text, Title, GridCol, TextInput, Tooltip } from "@mantine/core";

export const Header = () => (
  <Grid mt="md" gap="md" align="flex-end">
    {/* Welcome message */}
    <GridCol span={9}>
      <Title order={1}>OpenBIS Dashboard</Title>
      <Text size="md" c="dimmed" visibleFrom="xs">
        Welcome back! Manage your research data and laboratory information.
      </Text>
    </GridCol>

    {/* Search component */}
    <GridCol span={3}>
      <Tooltip label="Search across all spaces, projects, collections, and objects.">
        <TextInput
          variant="filled"
          placeholder="Quick Search..."
          radius="md"
          size="md"
          visibleFrom="sm"
        />
      </Tooltip>
    </GridCol>
  </Grid>
);
