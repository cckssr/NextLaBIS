import { OpenbisPermId } from "@/lib/model/OpenBISModel";

/**
 * Props for the ProjectOverviewPage component.
 *
 * @param params - The route parameters containing the projectPermId.
 */
export interface ProjectOverviewPageProps {
  params: Promise<{ projectPermId: OpenbisPermId }>;
}
/**
 * Overview page for a specific project.
 */
export default async function ProjectOverviewPage({
  params,
}: ProjectOverviewPageProps) {
  const { projectPermId } = await params;
}
