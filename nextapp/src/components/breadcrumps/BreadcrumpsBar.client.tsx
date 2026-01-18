"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Anchor, Breadcrumbs, Group, Text } from "@mantine/core";

/**
 * Represents a single breadcrumb item in the navigation trail.
 *
 * @property {("space"|"project"|"collection"|"object"|"dataset")} kind - The type of entity
 * @property {string} id - Unique identifier (code) of the entity
 * @property {string} label - Human-readable label to display
 * @property {string} href - Navigation URL for the breadcrumb link
 */
export type Crumb = {
  kind: "space" | "project" | "collection" | "object" | "dataset";
  id: string;
  label: string;
  href: string;
};

/**
 * Generates a unique cache key from a breadcrumb trail.
 *
 * @param {Crumb[]} list - Array of breadcrumb items
 * @returns {string} Composite key in format "kind:id>kind:id>..."
 */
function keyOf(list: Crumb[]): string {
  return list.map((c) => `${c.kind}:${c.id}`).join(">");
}

/**
 * Props for BreadcrumbsBar component.
 *
 * @property {Crumb[]} current - The current breadcrumb trail to display
 */
interface BreadcrumbsBarProps {
  current: Crumb[];
}

/**
 * Client Component: Displays breadcrumbs with smooth transition animation.
 *
 * Features:
 * - Animates transitions when navigation changes (shows "prev → current")
 * - Uses Mantine Breadcrumbs for consistent styling
 * - Responsive design with wrapping support
 *
 * @param {BreadcrumbsBarProps} props - Component props
 * @returns {React.ReactElement} Rendered breadcrumbs bar
 */
export function BreadcrumbsBar({ current }: BreadcrumbsBarProps) {
  const prevRef = useRef<Crumb[] | null>(null);
  const [from, setFrom] = useState<Crumb[] | null>(null);

  const currentKey = useMemo(() => keyOf(current), [current]);

  useEffect(() => {
    const prev = prevRef.current;

    // first render: just store current
    if (!prev) {
      prevRef.current = current;
      return;
    }

    // if changed: show transition "prev -> current" briefly
    if (keyOf(prev) !== currentKey) {
      setFrom(prev);
      prevRef.current = current;

      const t = window.setTimeout(() => setFrom(null), 1600);
      return () => window.clearTimeout(t);
    }
  }, [currentKey, current]);

  /**
   * Renders a breadcrumb trail as a series of clickable links.
   *
   * @param {Crumb[]} trail - Array of breadcrumb items to render
   * @returns {React.ReactElement} Mantine Breadcrumbs component
   */
  const renderTrail = (trail: Crumb[]): React.ReactElement => (
    <Breadcrumbs separator="—">
      {trail.map((c) => (
        <Anchor key={`${c.kind}:${c.id}`} href={c.href} underline="hover">
          {c.label}
        </Anchor>
      ))}
    </Breadcrumbs>
  );

  if (from) {
    return (
      <Group gap="xs" align="center" wrap="wrap">
        {renderTrail(from)}
        <Text size="sm" c="dimmed">
          →
        </Text>
        {renderTrail(current)}
      </Group>
    );
  }

  return renderTrail(current);
}
