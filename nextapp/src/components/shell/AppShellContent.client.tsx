"use client";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { TopNav } from "./TopNav.client";
import { Navbar } from "./SideNav.client";
import { Breadcrumbs } from "./Breadcrumbs.client";

/**
 * Props for AppShellContent component.
 *
 * @property {React.ReactNode} children - The main content of the application
 */
interface AppShellContentProps {
  children: React.ReactNode;
}

/**
 * Client Component: Manages interactive state for the application shell.
 *
 * This component:
 * - Manages sidebar navigation state
 * - Handles navigation button interactions
 * - Renders header, sidebar, breadcrumbs, and main content
 * - Resolves breadcrumbs client-side using BreadcrumbsResolver
 *
 * Server/Client:
 * - Client Component (interactive state management)
 *
 * @param {AppShellContentProps} props - Component props
 * @returns {React.ReactElement} Rendered shell content
 */
export default function AppShellContent({ children }: AppShellContentProps) {
  const router = useRouter();
  const [navigationOpen, { toggle: burgerToggle }] = useDisclosure();

  const handleNavigateToDashboard = () => {
    router.push("/dashboard");
  };

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
        navigateToDashboard={handleNavigateToDashboard}
        navigateToInventory={() => {}}
        navigateToSearch={() => {}}
        navigateToCreateObject={() => {}}
        navigateToSettings={() => {}}
      />

      <Navbar />

      <AppShell.Main
        maw={1200}
        ml={navigationOpen ? "md" : "auto"}
        mr="auto"
      >
        <Suspense fallback={null}>
          <Breadcrumbs />
        </Suspense>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
