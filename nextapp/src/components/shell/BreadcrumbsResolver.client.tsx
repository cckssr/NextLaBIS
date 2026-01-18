"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";
import {
  BreadcrumbsBar,
  type Crumb,
} from "@/components/breadcrumps/BreadcrumpsBar.client";

/**
 * Client Component: Resolves pathname and renders breadcrumbs client-side.
 *
 * This component:
 * - Uses usePathname() hook to get current pathname (client-side only)
 * - Parses pathname and extracts entity codes
 * - Builds breadcrumb trail (with mock labels for Phase 0)
 * - Renders breadcrumbs directly without server component call
 *
 * Note: Label resolution uses simple mock logic in Phase 0.
 * Phase 1 will replace this with openBIS API calls via server actions.
 *
 * @returns {React.ReactElement | null} BreadcrumbsBar with resolved trail or null if not applicable
 */
export function BreadcrumbsResolver(): React.ReactElement | null {
  const pathname = usePathname();

  /**
   * Parse pathname and build breadcrumb trail (Phase 0: mock labels).
   */
  const buildBreadcrumbs = (): Crumb[] | null => {
    // Only show breadcrumbs for /spaces/... routes
    const parts = pathname
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .filter(Boolean);

    if (parts[0] !== "spaces") {
      return null;
    }

    /**
     * Helper: Extract code following a segment name
     */
    const get = (name: string): string | null => {
      const i = parts.indexOf(name);
      return i >= 0 ? (parts[i + 1] ?? null) : null;
    };

    const spaceCode = get("spaces");
    const projectCode = get("projects");
    const collectionCode = get("collections");
    const objectCode = get("objects");
    const datasetCode = get("datasets");

    if (!spaceCode) {
      return null;
    }

    const crumbs: Crumb[] = [];

    // Space crumb
    crumbs.push({
      kind: "space",
      id: spaceCode,
      label: spaceCode, // Phase 0: use code as label
      href: `/spaces/${encodeURIComponent(spaceCode)}`,
    });

    // Project crumb
    if (projectCode) {
      crumbs.push({
        kind: "project",
        id: projectCode,
        label: projectCode, // Phase 0: use code as label
        href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}`,
      });
    }

    // Collection crumb
    if (collectionCode && projectCode) {
      crumbs.push({
        kind: "collection",
        id: collectionCode,
        label: collectionCode, // Phase 0: use code as label
        href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}`,
      });
    }

    // Object crumb
    if (objectCode && projectCode && collectionCode) {
      crumbs.push({
        kind: "object",
        id: objectCode,
        label: objectCode, // Phase 0: use code as label
        href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}/objects/${encodeURIComponent(objectCode)}`,
      });
    }

    // Dataset crumb
    if (datasetCode && projectCode && collectionCode && objectCode) {
      crumbs.push({
        kind: "dataset",
        id: datasetCode,
        label: datasetCode, // Phase 0: use code as label
        href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}/objects/${encodeURIComponent(objectCode)}/datasets/${encodeURIComponent(datasetCode)}`,
      });
    }

    return crumbs.length > 0 ? crumbs : null;
  };

  const current = buildBreadcrumbs();

  if (!current || current.length === 0) {
    return null;
  }

  return (
    <Box mb="md">
      <BreadcrumbsBar current={current} />
    </Box>
  );
}
