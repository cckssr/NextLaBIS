// Mock data provider for spaces
// This will be replaced with real openBIS API calls in Phase 1

import { spaceOverviewMock } from "@/lib/mocks/mockSpace";
import { SpaceOverview } from "./model";

/**
 * Get complete space overview by space code
 * Phase 0: Returns mock data from mockSpace.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @param spaceCode The code of the space
 * @returns Complete space overview or null if not found
 */
export function getSpaceOverviewMock(spaceCode: string): SpaceOverview | null {
  // Search through mock data array for matching space code
  const spaceOverview = spaceOverviewMock.find(
    (overview) => overview.space.code === spaceCode,
  );

  return spaceOverview || null;
}

/**
 * Get all space overviews
 * Phase 0: Returns mock data from mockSpace.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @returns Array of all space overviews
 */
export function getAllSpaceOverviewsMock(): SpaceOverview[] {
  return spaceOverviewMock;
}
