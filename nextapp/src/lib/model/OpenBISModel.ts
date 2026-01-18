/**
 * Defines the base entity types used in OpenBIS.
 * These types represent the core entities managed within the OpenBIS system.
 */
export type OpenbisEntityKind =
  | "SPACE"
  | "PROJECT"
  | "COLLECTION" // old: experiment
  | "OBJECT" // old: sample
  | "DATASET";

export type OpenbisDatasetKind = "Physical" | "Link";

// TODO: fully implement OpenBIS types and extensions for each type
// FEAT: add zod schemas for validation of json-rpc output
export interface OpenbisEntityBase {
  kind: OpenbisEntityKind;
  permId: string;
  code: string;
  registrationDate: number; // epoch ms
  modificationDate: number; // epoch ms
  registratedBy: string;
  frozen?: boolean;
  description?: string | null;
}

export interface OpenbisSpace extends OpenbisEntityBase {
  kind: "SPACE";
  frozenForProjects?: boolean;
  frozenForObjects?: boolean;
}

export interface OpenbisProject extends OpenbisEntityBase {
  kind: "PROJECT";
  modifiedBy: string;
  leader?: string | null;
  frozenForCollections?: boolean;
  frozenForObjects?: boolean;
}

export interface OpenbisCollection extends OpenbisEntityBase {
  kind: "COLLECTION";
  modifiedBy: string;
  projectIdentifier: string;
  collectionType: string;
  tags?: string[];
  frozenForObjects?: boolean;
  frozenForDatasets?: boolean;
}

export interface OpenbisObject extends OpenbisEntityBase {
  kind: "OBJECT";
  modifiedBy: string;
  projectIdentifier: string;
  collectionIdentifier: string;
  objectType: string;
  container?: string | null;
  components?: string[] | null;
  parentsIdentifiers?: string[] | null;
  childrenIdentifiers?: string[] | null;
  tags?: string[];
  frozenForDatasets?: boolean;
  frozenForParents?: boolean;
  frozenForChildren?: boolean;
  frozenForComponents?: boolean;
}

export interface OpenbisDataset extends OpenbisEntityBase {
  kind: "DATASET";
  logicalKind: OpenbisDatasetKind;
  modifiedBy: string;
  accessDate: number; // epoch ms
  dataProducedBy: string;
  dataProductionDate: number; // epoch ms
  datastoreCode: string;
  measured: boolean;
  postRegistrationProcessingDone: boolean;
  collectionIdentifier?: string | null;
  objectIdentifier: string;
  datasetType: string;
  parentsIdentifiers?: string[] | null;
  childrenIdentifiers?: string[] | null;
  componets?: string[] | null;
  containers?: string[] | null;
  tags?: string[];
  frozenForParents?: boolean;
  frozenForChildren?: boolean;
  frozenForComponents?: boolean;
  frozenForContainers?: boolean;
}
