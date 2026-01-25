"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Anchor,
  Box,
  Breadcrumbs as MantineBreadcrumbs,
  Group,
  Text,
} from "@mantine/core";

/**
 * Represents a single breadcrumb item in the navigation trail.
 */
type Crumb = {
  kind: "space" | "project" | "collection" | "object" | "dataset";
  id: string;
  label: string;
  href: string;
};

/**
 * Generates a unique cache key from a breadcrumb trail.
 */
function keyOf(list: Crumb[]): string {
  return list.map((c) => `${c.kind}:${c.id}`).join(">");
}

/**
 * Parse pathname and build breadcrumb trail.
 * Phase 0: Uses codes as labels. Phase 1: Replace with openBIS API calls.
 */
function buildBreadcrumbs(pathname: string): Crumb[] | null {
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

  if (parts[0] !== "spaces") {
    return null;
  }

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
    label: spaceCode,
    href: `/spaces/${encodeURIComponent(spaceCode)}`,
  });

  // Project crumb
  if (projectCode) {
    crumbs.push({
      kind: "project",
      id: projectCode,
      label: projectCode,
      href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}`,
    });
  }

  // Collection crumb
  if (collectionCode && projectCode) {
    crumbs.push({
      kind: "collection",
      id: collectionCode,
      label: collectionCode,
      href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}`,
    });
  }

  // Object crumb
  if (objectCode && projectCode && collectionCode) {
    crumbs.push({
      kind: "object",
      id: objectCode,
      label: objectCode,
      href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}/objects/${encodeURIComponent(objectCode)}`,
    });
  }

  // Dataset crumb
  if (datasetCode && projectCode && collectionCode && objectCode) {
    crumbs.push({
      kind: "dataset",
      id: datasetCode,
      label: datasetCode,
      href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(projectCode)}/collections/${encodeURIComponent(collectionCode)}/objects/${encodeURIComponent(objectCode)}/datasets/${encodeURIComponent(datasetCode)}`,
    });
  }

  return crumbs.length > 0 ? crumbs : null;
}

/**
 * Renders a breadcrumb trail as clickable links.
 */
function Trail({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <MantineBreadcrumbs separator="/">
      {crumbs.map((c) => (
        <Anchor
          key={`${c.kind}:${c.id}`}
          href={c.href}
          underline="hover"
          c="primary.8"
        >
          {c.label}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}

/**
 * Client Component: Resolves pathname and renders breadcrumbs with transition animation.
 *
 * Features:
 * - Parses current pathname to build breadcrumb trail
 * - Animates transitions when navigation changes (shows "prev → current")
 * - Only renders for /spaces/... routes
 *
 * @returns Breadcrumbs element or null if not applicable
 */
export function Breadcrumbs(): React.ReactElement | null {
  const pathname = usePathname();
  const current = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  const prevRef = useRef<Crumb[] | null>(null);
  const [from, setFrom] = useState<Crumb[] | null>(null);

  const currentKey = useMemo(() => (current ? keyOf(current) : ""), [current]);

  useEffect(() => {
    if (!current) {
      prevRef.current = null;
      return;
    }

    const prev = prevRef.current;

    // First render: just store current
    if (!prev) {
      prevRef.current = current;
      return;
    }

    // If changed: show transition briefly
    if (keyOf(prev) !== currentKey) {
      setFrom(prev);
      prevRef.current = current;

      const t = window.setTimeout(() => setFrom(null), 1600);
      return () => window.clearTimeout(t);
    }
  }, [currentKey, current]);

  if (!current || current.length === 0) {
    return null;
  }

  return (
    <Box mb="md">
      {from ? (
        <Group gap="xs" align="center" wrap="wrap">
          <Trail crumbs={from} />
          <Text size="sm" c="dimmed">
            →
          </Text>
          <Trail crumbs={current} />
        </Group>
      ) : (
        <Trail crumbs={current} />
      )}
    </Box>
  );
}
