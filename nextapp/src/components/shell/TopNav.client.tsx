"use client";

import {
  AppShell,
  Group,
  Button,
  ActionIcon,
  Avatar,
  Text,
  Burger,
  Grid,
  Flex,
  ButtonGroup,
} from "@mantine/core";
import {
  IconDashboard,
  IconPackage,
  IconSearch,
  IconSquareRoundedPlus,
  IconSettings,
  IconNotebook,
  Icon,
} from "@tabler/icons-react";

interface TopNavProps {
  currentView: { type: string };
  isNavigationOpen: boolean;
  toggleNavigation: () => void;
  navigateToDashboard: () => void;
  navigateToInventory: () => void;
  navigateToSearch: () => void;
  navigateToCreateObject: () => void;
  navigateToSettings: () => void;
}

export function TopNav({
  currentView,
  isNavigationOpen,
  toggleNavigation,
  navigateToDashboard,
  navigateToInventory,
  navigateToSearch,
  navigateToCreateObject,
  navigateToSettings,
}: TopNavProps) {
  return (
    <AppShell.Header padding="xs">
      <Flex justify="flex-start" align="center" h="100%">
        <Burger
          opened={isNavigationOpen}
          onClick={toggleNavigation}
          size="md"
          mx="md"
        />

        {/* Logo and title */}
        <IconNotebook size={25} stroke={1.5} />
        <Text fw={600} size="h1" ml="xs">
          OpenBIS ELN-LIMS
        </Text>

        {/* Navigation buttons */}
        <ButtonGroup ml="xl" spacing="sm">
          <NavigationButton
            onClick={navigateToDashboard}
            currentView={currentView}
            icon={IconDashboard}
            label="Dashboard"
            viewType="dashboard"
          />
          <NavigationButton
            onClick={navigateToInventory}
            currentView={currentView}
            icon={IconPackage}
            label="Inventory"
            viewType="inventory"
          />
          <NavigationButton
            onClick={navigateToSearch}
            currentView={currentView}
            icon={IconSearch}
            label="Search"
            viewType="search"
          />
          <NavigationButton
            onClick={navigateToCreateObject}
            currentView={currentView}
            icon={IconSquareRoundedPlus}
            label="Create"
            viewType="create-object"
          />
          <NavigationButton
            onClick={navigateToSettings}
            currentView={currentView}
            icon={IconSettings}
            label="Settings"
            viewType="settings"
          />
        </ButtonGroup>

        {/* User info */}
        <Group ml="auto" mr="md">
          <Text size="sm" c="dimmed" visibleFrom="md">
            Dr. Johnson • Physics Lab
          </Text>
          <Avatar name="DJ" size="md" color="blue" />
        </Group>
      </Flex>
    </AppShell.Header>
  );
}

interface NavigationButtonProps {
  onClick: () => void;
  currentView: { type: string };
  icon: Icon;
  label: string;
  viewType: string;
}

function NavigationButton({
  onClick,
  currentView,
  icon: IconComponent,
  label,
  viewType,
}: NavigationButtonProps) {
  return (
    <Group>
      {/* Desktop: Icon + Button*/}
      <Button
        variant={currentView.type === viewType ? "light" : "subtle"}
        size="sm"
        onClick={onClick}
        leftSection={<IconComponent stroke={1.5} />}
        visibleFrom="md"
      >
        <Text>{label}</Text>
      </Button>
      {/* Mobile: Icon only */}
      <ActionIcon
        variant={currentView.type === viewType ? "light" : "subtle"}
        size="xl"
        onClick={onClick}
        hiddenFrom="md"
      >
        <IconComponent stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
