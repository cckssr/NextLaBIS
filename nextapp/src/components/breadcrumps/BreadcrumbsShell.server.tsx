"use server";
import React from "react";
import { Box } from "@mantine/core";
import { resolveBreadcrumbsFromPath } from "./resolveBreadcrumpsFromPath";
import { BreadcrumbsBar } from "./BreadcrumpsBar.client";

/**
 * Props for BreadcrumbsShell component.
 *
 * @property {string} pathname - The current pathname (e.g., `/spaces/SPACE-1/projects/PROJ-1`)
 */
interface BreadcrumbsShellProps {
  pathname: string;
}

/**
 * Server Component: Resolves breadcrumb trail from provided pathname.
 *
 * This component:
 * - Accepts pathname as a prop (passed from layout or page component)
 * - Resolves breadcrumb labels (currently from mock data; Phase 1 will use openBIS API)
 * - Passes resolved trail to client component for rendering with transitions
 * - Returns null if breadcrumbs don't apply to the provided route (e.g., dashboard)
 *
 * Routes where breadcrumbs appear:
 * - `/spaces/[spaceCode]`
 * - `/spaces/[spaceCode]/projects/[projectCode]`
 * - `/spaces/[spaceCode]/projects/[projectCode]/collections/[collectionCode]`
 * - `/spaces/[spaceCode]/projects/[projectCode]/collections/[collectionCode]/objects/[objectCode]`
 * - `/spaces/[spaceCode]/projects/[projectCode]/collections/[collectionCode]/objects/[objectCode]/datasets/[datasetCode]`
 *
 * Routes where breadcrumbs do NOT appear:
 * - `/dashboard` (no context)
 * - `/settings` (no context)
 * - `/` (home)
 *
 * @param {BreadcrumbsShellProps} props - Component props
 * @returns {Promise<React.ReactElement | null>} Breadcrumbs bar or null if not applicable
 */
export async function BreadcrumbsShell({
  pathname,
}: BreadcrumbsShellProps): Promise<React.ReactElement | null> {
  // Resolve breadcrumb trail from pathname
  const current = await resolveBreadcrumbsFromPath(pathname);

  // If no breadcrumbs apply to this route, render nothing
  if (!current || current.length === 0) {
    return null;
  }

  return (
    <Box px="md" pb="xs">
      <BreadcrumbsBar current={current} />
    </Box>
  );
}
