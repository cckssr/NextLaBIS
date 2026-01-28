/**
 * Shared global types for OpenBIS entities.
 */

export type OpenBISRole = "admin" | "power_user" | "user" | "observer";

/**
 * Space data for display in cards and lists.
 * This is a simplified view model for Phase 0 UI development.
 */
export interface SpaceDisplayData {
  code: string;
  modificationDate: Date;
  modifiedBy: string;
  numberOfProjects?: number;
  numberOfCollections?: number;
  description?: string;
  tags?: string[];
  spaceRights?: OpenBISRole;
}
