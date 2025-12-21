import { AppShell } from "@mantine/core";

interface NavbarProps {}
/**
 * Side navigation bar shown on all application pages.
 *
 * Responsibilities:
 * - Application section navigation
 *
 * Server/Client:
 * - Client Component (interactive)
 */
export function Navbar({}: NavbarProps) {
  return <AppShell.Navbar>Navbar</AppShell.Navbar>;
}
