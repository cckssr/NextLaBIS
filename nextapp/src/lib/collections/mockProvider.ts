// Mock data provider for collections
// This will be replaced with real openBIS API calls in Phase 1

import { collectionOverviewMock } from "@/lib/mocks/mockCollection";
import { CollectionOverview } from "./model";

/**
 * Get complete collection overview for a project
 * Phase 0: Returns mock data from mockCollection.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @param projectCode The code of the project
 * @returns Complete collection overview or null if not found
 */
export function getCollectionOverviewMock(
  projectCode: string,
): CollectionOverview | null {
  // For now, return the single mock collection overview
  // In Phase 1, this will filter by projectCode from API
  if (projectCode === collectionOverviewMock.project.code) {
    return collectionOverviewMock;
  }

  return null;
}
