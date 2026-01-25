"use server";
import React from "react";
import AppShellContent from "./AppShellContent.client";

/**
 * Props for AppShellLayout component.
 *
 * @property {React.ReactNode} children - The main content of the application
 */
interface AppShellLayoutProps {
  children: React.ReactNode;
}

/**
 * Server Component: Root layout for the application shell.
 *
 * This component:
 * - Delegates interactive state management to AppShellContent (Client Component)
 * - Passes children to AppShellContent for rendering
 *
 * Responsibilities:
 * - Server-side layout composition
 * - Pass children to Client Component
 *
 * Server/Client:
 * - Server Component (no "use client")
 *
 * Note: Breadcrumb resolution happens client-side in AppShellContent
 * using BreadcrumbsResolver to leverage usePathname() hook.
 *
 * @param {AppShellLayoutProps} props - Component props
 * @returns {Promise<React.ReactElement>} Rendered app shell
 */
export default async function AppShellLayout({
  children,
}: AppShellLayoutProps): Promise<React.ReactElement> {
  return <AppShellContent>{children}</AppShellContent>;
}
