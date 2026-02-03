import { getSpaceOverviewMock } from "./mockProvider";
import { SpaceOverview } from "./model";

/**
 * Fetch complete space overview data
 * In Phase 1, this will call the openBIS API instead of mock data
 *
 * @param spaceCode The code of the space to fetch
 * @returns Space overview data
 * @throws Error if space not found
 */
export async function getSpaceOverview(
  spaceCode: string,
): Promise<SpaceOverview> {
  // TODO(#47): In Phase 1, replace with real openBIS API call
  // const response = await fetch(`/api/spaces/${spaceCode}`);
  // if (!response.ok) throw new Error(`Space not found: ${spaceCode}`);
  // return response.json();

  // Phase 0: Use mock data
  const spaceOverview = getSpaceOverviewMock(spaceCode);
  if (!spaceOverview) {
    throw new Error(`Space not found: ${spaceCode}`);
  }

  return spaceOverview;
}
