/**
 * Defines the base entity types used in OpenBIS.
 * These types represent the core entities managed within the OpenBIS system.
 */
export type OpenbisEntityKind =
  | "SPACE"
  | "PROJECT"
  | "COLLECTION"
  | "OBJECT" // sample
  | "EXPERIMENT"
  | "DATASET";

// TODO: fully implement OpenBIS types and extensions for each type
// FEAT: add zod schemas for validation of json-rpc output
export interface OpenbisEntityBase {
  kind: OpenbisEntityKind;
  permId: string;
  code: string;
  description?: string | null;
  registrationDate?: number | null; // epoch ms
  modificationDate?: number | null; // epoch ms
  registrator?: string | null;
  frozen?: boolean;
}
