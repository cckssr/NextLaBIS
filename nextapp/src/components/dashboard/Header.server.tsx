import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export const Header = () => (
  <Flex align="center">
    <Stack justify="flex-start" align="flex-start">
      <Title order={1}>OpenBIS Dashboard</Title>
      <Text size="md" c="dimmed">
        Welcome back! Manage your research data and laboratory information.
      </Text>
    </Stack>
    <Button
      variant="filled"
      size="md"
      ml="auto"
      my="auto"
      leftSection={<IconPlus />}
      visibleFrom="md"
    >
      Create New Space
    </Button>
  </Flex>
);
