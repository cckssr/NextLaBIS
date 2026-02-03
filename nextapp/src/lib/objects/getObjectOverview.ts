/**
 * Server-side data fetching for Object overview.
 * Phase 0: Uses mock data. Phase 1: Replace with openBIS API calls.
 */

import type { OpenbisPermId } from "@/lib/model/OpenBISModel";
import type { ObjectOverview } from "./model";
import { getObjectOverviewMock } from "./mockProvider";

/**
 * Fetches complete object overview data for display/editing.
 *
 * @param permId - The permanent ID of the object to fetch.
 * @returns ObjectOverview with all data needed for view/edit page.
 * @throws Error if object not found.
 */
export async function getObjectOverview(
  permId: OpenbisPermId,
): Promise<ObjectOverview> {
  // Phase 0: Use mock data
  const overview = getObjectOverviewMock(permId);

  if (!overview) {
    throw new Error(`Object not found: ${permId}`);
  }

  return overview;

  // Phase 1: Replace with API call
  // const response = await fetch(`/api/objects/${permId}`);
  // if (!response.ok) {
  //   throw new Error(`Object not found: ${permId}`);
  // }
  // return response.json();
}
