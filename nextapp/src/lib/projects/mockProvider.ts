// Mock data provider for projects
// This will be replaced with real openBIS API calls in Phase 1

import { projectOverviewMock } from "@/lib/mocks/mockProject";
import { ProjectOverview } from "./model";

/**
 * Get complete project overview for a space
 * Phase 0: Returns mock data from mockProject.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @param spaceCode The code of the space
 * @returns Complete project overview or null if not found
 */
export function getProjectOverviewMock(
  spaceCode: string,
): ProjectOverview | null {
  // For now, return the single mock project overview
  // In Phase 1, this will filter by spaceCode from API
  if (spaceCode === projectOverviewMock.space.code) {
    return projectOverviewMock;
  }

  return null;
}

/**
 * Get all projects for a specific space
 * Phase 0: Returns mock data from mockProject.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @param spaceCode The code of the space
 * @returns Array of projects or empty array if space not found
 */
export function getProjectsBySpaceMock(spaceCode: string) {
  const projectOverview = getProjectOverviewMock(spaceCode);
  return projectOverview?.projects || [];
}

/**
 * Get a specific project by code within a space
 * Phase 0: Returns mock data from mockProject.ts
 * Phase 1: Will fetch from openBIS API
 *
 * @param spaceCode The code of the space
 * @param projectCode The code of the project
 * @returns Project object or null if not found
 */
export function getProjectByCodeMock(spaceCode: string, projectCode: string) {
  const projects = getProjectsBySpaceMock(spaceCode);
  return projects.find((project) => project.code === projectCode) || null;
}
