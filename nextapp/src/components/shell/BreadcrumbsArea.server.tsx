"use server";
import React from "react";
import { headers } from "next/headers";
import { BreadcrumbsShell } from "@/components/breadcrumps/BreadcrumbsShell.server";

/**
 * Server Component: Renders breadcrumbs area below the header.
 *
 * This component:
 * - Is a Server Component (no "use client")
 * - Uses Next.js headers() API to access the current pathname
 * - Passes pathname to BreadcrumbsShell for resolution
 * - Returns null if breadcrumbs don't apply to the current route (e.g., /dashboard)
 *
 * Placement: Between AppShell.Header and AppShell.Main
 *
 * How it works:
 * 1. Calls headers() to access request metadata
 * 2. Extracts pathname from x-pathname header (set by AppShellContent)
 * 3. Passes pathname to BreadcrumbsShell for resolution and rendering
 *
 * @returns {Promise<React.ReactElement | null>} Breadcrumbs bar or null if not applicable
 */
export async function BreadcrumbsArea(): Promise<React.ReactElement | null> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return <BreadcrumbsShell pathname={pathname} />;
}
