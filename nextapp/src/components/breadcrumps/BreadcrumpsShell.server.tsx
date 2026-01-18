"use server";
import React from "react";
import { Box } from "@mantine/core";
import { headers } from "next/headers";
import { resolveBreadcrumbsFromPath } from "./resolveBreadcrumpsFromPath";
import { BreadcrumbsBar } from "./BreadcrumpsBar.client";

/**
 * Server Component: Resolves breadcrumb trail from current request path.
 *
 * This component:
 * - Extracts the current pathname from Next.js request headers
 * - Resolves breadcrumb labels (currently from mock data; Phase 1 will use openBIS API)
 * - Passes resolved trail to client component for rendering with transitions
 * - Returns null if breadcrumbs don't apply to the current route (e.g., dashboard)
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
 * @returns {Promise<React.ReactElement | null>} Breadcrumbs bar or null if not applicable
 */
export async function BreadcrumbsShell(): Promise<React.ReactElement | null> {
  // Extract pathname from Next.js request headers (works on Vercel and Node.js)
  const h = await headers();

  // Try multiple header names for pathname extraction
  // Next.js 14+ uses x-pathname, older versions may use x-url or x-nextjs-url
  let pathname =
    h.get("x-pathname") ??
    h.get("x-nextjs-url") ??
    h.get("x-url") ??
    h.get("next-url") ??
    "/";

  // Fallback: construct pathname from referer header if available
  if (pathname === "/") {
    const referer =
      (h.get("referer") ??
      (h.get("x-forwarded-proto") && h.get("x-forwarded-host")))
        ? `${h.get("x-forwarded-proto")}://${h.get("x-forwarded-host")}${h.get("x-forwarded-path")}`
        : null;
    if (referer) {
      try {
        pathname = new URL(referer).pathname;
      } catch {
        pathname = "/";
      }
    }
  }

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
