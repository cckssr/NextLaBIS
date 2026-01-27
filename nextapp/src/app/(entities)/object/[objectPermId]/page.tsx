import { OpenbisPermId } from "@/lib/model/OpenBISModel";

/**
 * Props for the ObjectPage component.
 *
 * @param params - The route parameters containing the objectPermId.
 */
export interface ObjectPageProps {
  params: Promise<{ objectPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific object.
 */
export default async function ObjectPage({ params }: ObjectPageProps) {
  const { objectPermId } = await params;
}
