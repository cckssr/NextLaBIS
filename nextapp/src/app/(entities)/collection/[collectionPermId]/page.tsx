import { OpenbisPermId } from "@/lib/model/OpenBISModel";

/**
 * Props for the CollectionPage component.
 *
 * @param params - The route parameters containing the collectionPermId.
 */
export interface CollectionOverviewPageProps {
  params: Promise<{ collectionPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific collection.
 */
export default async function CollectionOverviewPage({
  params,
}: CollectionOverviewPageProps) {
  const { collectionPermId } = await params;
}
