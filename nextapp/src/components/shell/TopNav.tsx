"use client";

import { Group, Button, Avatar, Text, Burger, Box } from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";

export interface TopNavProps {
  currentView?: "dashboard" | "inventory" | "search" | "create-object";
  onMenuClick?: () => void;
  onDashboardClick?: () => void;
  onInventoryClick?: () => void;
  onSearchClick?: () => void;
  onCreateClick?: () => void;
  onBrandClick?: () => void;
  userName?: string;
  userInitials?: string;
  userSpace?: string;
}

export function TopNav({
  currentView = "dashboard",
  onMenuClick,
  onDashboardClick,
  onInventoryClick,
  onSearchClick,
  onCreateClick,
  onBrandClick,
  userName = "Dr. Johnson",
  userInitials = "DJ",
  userSpace = "Physics Lab",
}: TopNavProps) {
  return (
    <Box
      py="sm"
      px="md"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
    >
      <Group justify="space-between" h="100%">
        {/* Left Section: Menu, Logo, and Navigation */}
        <Group gap="lg">
          {/* Menu Button */}
          <Burger
            opened={false}
            onClick={onMenuClick}
            hiddenFrom="md"
            size="sm"
          />

          {/* Brand/Logo */}
          <Group
            gap="sm"
            onClick={onBrandClick}
            style={{ cursor: "pointer" }}
            className="hover:opacity-80"
          >
            <Box
              style={{
                width: 32,
                height: 32,
                backgroundColor: "var(--mantine-color-blue-600)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text c="white" fw={600} size="sm">
                O
              </Text>
            </Box>
            <Text fw={600} size="sm" hiddenFrom="sm">
              OpenBIS ELN-LIMS
            </Text>
          </Group>

          {/* Navigation Links */}
          <Group gap="xs" visibleFrom="md">
            <Button
              variant={currentView === "dashboard" ? "filled" : "subtle"}
              size="xs"
              onClick={onDashboardClick}
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === "inventory" ? "filled" : "subtle"}
              size="xs"
              onClick={onInventoryClick}
              leftSection={<IconPackage size={14} />}
            >
              Inventory
            </Button>
            <Button
              variant={currentView === "search" ? "filled" : "subtle"}
              size="xs"
              onClick={onSearchClick}
            >
              Search
            </Button>
            <Button
              variant={currentView === "create-object" ? "filled" : "subtle"}
              size="xs"
              onClick={onCreateClick}
            >
              Create
            </Button>
          </Group>
        </Group>

        {/* Right Section: User Info */}
        <Group gap="md">
          <Text size="sm" hiddenFrom="sm">
            {userName} • {userSpace}
          </Text>
          <Avatar
            name={userInitials}
            color="gray"
            radius="xl"
            style={{ cursor: "pointer" }}
          />
        </Group>
      </Group>
    </Box>
  );
}

export default TopNav;
