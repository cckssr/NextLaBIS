import { getCollectionOverviewMock } from "./mockProvider";
import { CollectionOverview } from "./model";
import { OpenbisPermId } from "../model/OpenBISModel";

/**
 * Fetch complete space overview data
 * In Phase 1, this will call the openBIS API instead of mock data
 *
 * @param collectionPermId The permId of the collection to fetch
 * @returns Collection overview data
 * @throws Error if collection not found
 */
export async function getCollectionOverview(
  collectionPermId: OpenbisPermId,
): Promise<CollectionOverview> {
  // TODO(#41): In Phase 1, replace with real openBIS API call
  // const response = await fetch(`/api/collections/${collectionPermId}`);
  // if (!response.ok) throw new Error(`Collection not found: ${collectionPermId}`);
  // return response.json();

  // Phase 0: Use mock data
  const collectionOverview = getCollectionOverviewMock(collectionPermId);
  if (!collectionOverview) {
    throw new Error(`Collection not found: ${collectionPermId}`);
  }

  return collectionOverview;
}
