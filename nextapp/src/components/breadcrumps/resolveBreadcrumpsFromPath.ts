import type { Crumb } from "./BreadcrumpsBar.client";

/**
 * Server-side function: Parses pathname and resolves breadcrumb trail.
 *
 * Algorithm:
 * 1. Parse pathname segments (e.g., `/spaces/SPACE-1/projects/PROJ-1` → segments)
 * 2. Extract entity codes (spaceCode, projectCode, etc.) from segments
 * 3. Resolve human-readable labels (Phase 0: mock; Phase 1: openBIS API)
 * 4. Build crumb objects with href and metadata
 * 5. Return trail or null if not applicable
 *
 * Example input/output:
 * - Input: `/spaces/SPACE-1/projects/PROJ-2`
 * - Output: [
 *     { kind: "space", id: "SPACE-1", label: "Space 1", href: "/spaces/SPACE-1" },
 *     { kind: "project", id: "PROJ-2", label: "Project 2", href: "/spaces/SPACE-1/projects/PROJ-2" }
 *   ]
 *
 * @param {string} pathname - The current request pathname (e.g., `/spaces/SPACE-1/projects/PROJ-2`)
 * @returns {Promise<Crumb[] | null>} Breadcrumb trail or null if route doesn't support breadcrumbs
 */
export async function resolveBreadcrumbsFromPath(
  pathname: string,
): Promise<Crumb[] | null> {
  // Parse pathname: split on query/fragment, then by /, filter empty segments
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

  // Breadcrumbs only apply to /spaces/... routes
  if (parts[0] !== "spaces") {
    return null;
  }

  /**
   * Extracts the code (value) following a segment name.
   *
   * @param {string} name - Segment name to search for (e.g., "spaces", "projects")
   * @returns {string | null} The code following the segment, or null if not found
   */
  const get = (name: string): string | null => {
    const i = parts.indexOf(name);
    return i >= 0 ? (parts[i + 1] ?? null) : null;
  };

  // Extract entity codes from URL segments
  const spaceCode = get("spaces");
  const projectCode = get("projects");
  const collectionCode = get("collections");
  const objectCode = get("objects");
  const datasetCode = get("datasets");

  // Space is required; if missing, breadcrumbs don't apply
  if (!spaceCode) {
    return null;
  }

  // Resolve human-readable labels for each entity
  // Phase 0: Mock data; Phase 1: Replace with openBIS API calls
  const spaceLabel = await fetchSpaceLabel(spaceCode);
  const projectLabel = projectCode
    ? await fetchProjectLabel(projectCode)
    : null;
  const collectionLabel = collectionCode
    ? await fetchCollectionLabel(collectionCode)
    : null;
  const objectLabel = objectCode ? await fetchObjectLabel(objectCode) : null;
  const datasetLabel = datasetCode
    ? await fetchDatasetLabel(datasetCode)
    : null;

  // Build breadcrumb trail, starting with space
  const crumbs: Crumb[] = [];

  crumbs.push({
    kind: "space",
    id: spaceCode,
    label: spaceLabel ?? spaceCode,
    href: `/spaces/${encodeURIComponent(spaceCode)}`,
  });

  // Add project if present in URL
  if (projectCode) {
    crumbs.push({
      kind: "project",
      id: projectCode,
      label: projectLabel ?? projectCode,
      href: `/spaces/${encodeURIComponent(spaceCode)}/projects/${encodeURIComponent(
        projectCode,
      )}`,
    });
  }

  // Add collection if present in URL
  if (projectCode && collectionCode) {
    crumbs.push({
      kind: "collection",
      id: collectionCode,
      label: collectionLabel ?? collectionCode,
      href: `/spaces/${encodeURIComponent(
        spaceCode,
      )}/projects/${encodeURIComponent(
        projectCode,
      )}/collections/${encodeURIComponent(collectionCode)}`,
    });
  }

  // Add object if present in URL
  if (projectCode && collectionCode && objectCode) {
    crumbs.push({
      kind: "object",
      id: objectCode,
      label: objectLabel ?? objectCode,
      href: `/spaces/${encodeURIComponent(
        spaceCode,
      )}/projects/${encodeURIComponent(
        projectCode,
      )}/collections/${encodeURIComponent(
        collectionCode,
      )}/objects/${encodeURIComponent(objectCode)}`,
    });
  }

  // Add dataset if present in URL
  if (projectCode && collectionCode && objectCode && datasetCode) {
    crumbs.push({
      kind: "dataset",
      id: datasetCode,
      label: datasetLabel ?? datasetCode,
      href: `/spaces/${encodeURIComponent(
        spaceCode,
      )}/projects/${encodeURIComponent(
        projectCode,
      )}/collections/${encodeURIComponent(
        collectionCode,
      )}/objects/${encodeURIComponent(
        objectCode,
      )}/datasets/${encodeURIComponent(datasetCode)}`,
    });
  }

  return crumbs;
}

/**
 * Fetches human-readable label for a space.
 *
 * Phase 0: Returns the code as-is (mock data).
 * Phase 1: Will call openBIS API to fetch space name/description.
 *
 * @param {string} code - Space code (e.g., "SPACE-1")
 * @returns {Promise<string | null>} Human-readable label or null if not found
 */
async function fetchSpaceLabel(code: string): Promise<string | null> {
  // TODO (Phase 1): Replace with openBIS API call
  // const space = await openBisClient.getSpace(code);
  // return space?.name ?? code;
  return code;
}

/**
 * Fetches human-readable label for a project.
 *
 * Phase 0: Returns the code as-is (mock data).
 * Phase 1: Will call openBIS API to fetch project name/description.
 *
 * @param {string} code - Project code (e.g., "PROJ-1")
 * @returns {Promise<string | null>} Human-readable label or null if not found
 */
async function fetchProjectLabel(code: string): Promise<string | null> {
  // TODO (Phase 1): Replace with openBIS API call
  return code;
}

/**
 * Fetches human-readable label for a collection.
 *
 * Phase 0: Returns the code as-is (mock data).
 * Phase 1: Will call openBIS API to fetch collection name/description.
 *
 * @param {string} code - Collection code (e.g., "COLL-1")
 * @returns {Promise<string | null>} Human-readable label or null if not found
 */
async function fetchCollectionLabel(code: string): Promise<string | null> {
  // TODO (Phase 1): Replace with openBIS API call
  return code;
}

/**
 * Fetches human-readable label for an object.
 *
 * Phase 0: Returns the code as-is (mock data).
 * Phase 1: Will call openBIS API to fetch object name/description.
 *
 * @param {string} code - Object code (e.g., "OBJ-1")
 * @returns {Promise<string | null>} Human-readable label or null if not found
 */
async function fetchObjectLabel(code: string): Promise<string | null> {
  // TODO (Phase 1): Replace with openBIS API call
  return code;
}

/**
 * Fetches human-readable label for a dataset.
 *
 * Phase 0: Returns the code as-is (mock data).
 * Phase 1: Will call openBIS API to fetch dataset name/description.
 *
 * @param {string} code - Dataset code (e.g., "DS-1")
 * @returns {Promise<string | null>} Human-readable label or null if not found
 */
async function fetchDatasetLabel(code: string): Promise<string | null> {
  // TODO (Phase 1): Replace with openBIS API call
  return code;
}
