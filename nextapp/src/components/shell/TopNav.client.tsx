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

/**
 * Props for TopNav component.
 *
 * @param currentView - The current view of the application.
 * @param isNavigationOpen - Whether the navigation sidebar is open.
 * @param toggleNavigation - Function to toggle the navigation sidebar.
 * @param navigateToDashboard - Function to navigate to the dashboard view.
 * @param navigateToInventory - Function to navigate to the inventory view.
 * @param navigateToSearch - Function to navigate to the search view.
 * @param navigateToCreateObject - Function to navigate to the create object view.
 * @param navigateToSettings - Function to navigate to the settings view.
 */
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

/**
 * Top navigation bar shown on all application pages.
 *
 * Responsibilities:
 * - Global navigation actions
 * - Toggle sidebar navigation
 * - Display user identity
 *
 * Server/Client:
 * - Client Component (interactive)
 */
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
        <Group ml="xl" gap={8}>
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
        </Group>

        {/* User info */}
        <Group ml="auto" mr="md">
          <Text size="sm" c="dimmed" visibleFrom="lg">
            Dr. Johnson • Physics Lab
          </Text>
          <Avatar name="DJ" size="md" />
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

/**
 * Navigation button used inside TopNav.
 *
 * Renders:
 * - Button (icon + label) on desktop
 * - ActionIcon (icon-only) on mobile
 *
 * Active state is derived from currentView.
 */
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
