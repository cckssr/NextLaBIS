import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid, GridCol, Stack, Text, Title, Alert } from "@mantine/core";

import RightsPill from "./RightsPill";

const meta = {
  component: RightsPill,
  title: "Components/Shared/RightsPill",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "RightsPill displays OpenBIS user roles in a styled pill component. Each role has a distinct color scheme: admin (red), power_user (orange), user (blue), and observer (gray). Uses CSS modules with Mantine color tokens for consistency.",
      },
    },
  },
  argTypes: {
    role: {
      control: "select",
      options: ["admin", "power_user", "user", "observer"],
      description: "The OpenBIS role type to display",
    },
  },
} satisfies Meta<typeof RightsPill>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story showing an observer role.
 */
export const Default: Story = {
  args: {
    role: "observer",
  },
};

/**
 * Admin role - highest privilege level.
 * CSS class: `.admin` - Red (error) color with white text.
 * Displayed with `var(--mantine-color-red-6)` background.
 */
export const Admin: Story = {
  args: {
    role: "admin",
  },
  parameters: {
    docs: {
      description: {
        story: "Admin role with red styling - CSS class `.admin`",
      },
    },
  },
};

/**
 * Power User role - elevated privileges.
 * CSS class: `.powerUser` - Orange (warning) color with white text.
 * Displayed with `var(--mantine-color-orange-6)` background.
 */
export const PowerUser: Story = {
  args: {
    role: "power_user",
  },
  parameters: {
    docs: {
      description: {
        story: "Power User role with orange styling - CSS class `.powerUser`",
      },
    },
  },
};

/**
 * User role - standard privileges.
 * CSS class: `.user` - Blue (info) color with white text.
 * Displayed with `var(--mantine-color-blue-6)` background.
 */
export const User: Story = {
  args: {
    role: "user",
  },
  parameters: {
    docs: {
      description: {
        story: "User role with blue styling - CSS class `.user`",
      },
    },
  },
};

/**
 * Observer role - read-only access.
 * CSS class: `.observer` - Gray (muted) color with black text.
 * Displayed with `var(--mantine-color-gray-5)` background.
 */
export const Observer: Story = {
  args: {
    role: "observer",
  },
  parameters: {
    docs: {
      description: {
        story: "Observer role with gray styling - CSS class `.observer`",
      },
    },
  },
};

/**
 * All roles displayed together for comparison.
 * Shows the visual distinction between different permission levels.
 */
export const AllRoles: Story = {
  render: () => (
    <Stack gap="md">
      <Title order={3}>OpenBIS User Roles</Title>
      <Alert title="Known Issue" color="yellow">
        FIXME: Text is not vertically centered in the pill. This is a known
        issue that should be addressed in the CSS styling.
      </Alert>
      <Grid>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Admin
            </Text>
            <RightsPill role="admin" />
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                Full system access
              </Text>
              <Text size="xs" c="gray.6">
                CSS: <code>.admin</code>
              </Text>
              <Text size="xs" c="gray.6">
                Color: var(--mantine-color-red-6)
              </Text>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Power User
            </Text>
            <RightsPill role="power_user" />
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                Elevated access
              </Text>
              <Text size="xs" c="gray.6">
                CSS: <code>.powerUser</code>
              </Text>
              <Text size="xs" c="gray.6">
                Color: var(--mantine-color-orange-6)
              </Text>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              User
            </Text>
            <RightsPill role="user" />
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                Standard access
              </Text>
              <Text size="xs" c="gray.6">
                CSS: <code>.user</code>
              </Text>
              <Text size="xs" c="gray.6">
                Color: var(--mantine-color-blue-6)
              </Text>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Observer
            </Text>
            <RightsPill role="observer" />
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                Read-only access
              </Text>
              <Text size="xs" c="gray.6">
                CSS: <code>.observer</code>
              </Text>
              <Text size="xs" c="gray.6">
                Color: var(--mantine-color-gray-5)
              </Text>
            </Stack>
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  ),
};
