"use client";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TopNav } from "./TopNav.client";
import { Navbar } from "./SideNav.client";

/**
 * Props for AppShellRoot component.
 *
 * @param children - The main content of the application.
 */
interface AppShellRootProps {
  children: React.ReactNode;
}

/**
 * Root component for the application shell.
 *
 * Responsibilities:
 * - Layout structure with header and sidebar
 * - State management for sidebar visibility
 *
 * Server/Client:
 * - Client Component (interactive)
 */
export default function AppShellRoot({ children }: AppShellRootProps) {
  const [navigationOpen, { toggle: burgerToggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navigationOpen, desktop: !navigationOpen },
      }}
    >
      <TopNav
        currentView={{ type: "dashboard" }}
        isNavigationOpen={navigationOpen}
        toggleNavigation={burgerToggle}
        navigateToDashboard={() => {}}
        navigateToInventory={() => {}}
        navigateToSearch={() => {}}
        navigateToCreateObject={() => {}}
        navigateToSettings={() => {}}
      />

      <Navbar />

      <AppShell.Main maw={1200} mx="auto" mt="md">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
