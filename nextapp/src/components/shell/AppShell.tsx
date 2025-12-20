"use client";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TopNav } from "./TopNav.client";

export default function Demo() {
  const [navigationOpen, { toggle: burgerToggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navigationOpen, desktop: navigationOpen },
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

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
