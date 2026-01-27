import { OpenbisPermId } from "@/lib/model/OpenBISModel";

/**
 * Props for the DatasetPage component.
 *
 * @param params - The route parameters containing the datasetPermId.
 */
export interface DatasetPageProps {
  params: Promise<{ datasetPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific dataset.
 */
export default async function DatasetPage({ params }: DatasetPageProps) {
  const { datasetPermId } = await params;
}
