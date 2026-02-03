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

export type OpenbisPropertyDataType =
  | "INTEGER"
  | "VARCHAR"
  | "MULTILINE_VARCHAR"
  | "REAL"
  | "TIMESTAMP"
  | "BOOLEAN"
  | "CONTROLLEDVOCABULARY"
  | "MATERIAL"
  | "HYPERLINK"
  | "XML"
  | "OBJECT"
  | "DATE"
  | "JSON"
  | "ARRAY_INTEGER"
  | "ARRAY_REAL"
  | "ARRAY_STRING"
  | "ARRAY_TIMESTAMP";

/**
 * openBIS timestamp-based permId
 * Format: YYYYMMDDHHMMSSmmm-#
 * Example: 20241119170647917-13437
 */
export const OPENBIS_TIMESTAMP_PERMID_REGEX = /^\d{17}-\d+$/;
// TODO(#42): : validate regex correctness with zod (strict)

export type OpenbisPermId = string & {
  readonly __brand: "OpenbisTimestampPermId";
};

// TODO(#43): fully implement OpenBIS types and extensions for each type
// FEAT(#44): add zod schemas for validation of json-rpc output
export interface OpenbisEntityBase {
  kind: OpenbisEntityKind;
  permId: OpenbisPermId;
  code: string;
  registrationDate: Date;
  modificationDate: Date;
  registratedBy: OpenbisUser;
  frozen?: boolean;
  description?: string | null;
}

// FIXME(#45): The Space does NOT use the normal timestamp-based permId, but a simple string code as id.
export interface OpenbisSpace extends OpenbisEntityBase {
  kind: "SPACE";
  frozenForProjects?: boolean;
  frozenForObjects?: boolean;
}

export interface OpenbisProject extends OpenbisEntityBase {
  kind: "PROJECT";
  modifiedBy: OpenbisUser;
  leader?: string | null;
  frozenForCollections?: boolean;
  frozenForObjects?: boolean;
}

export interface OpenbisCollection extends OpenbisEntityBase {
  kind: "COLLECTION";
  modifiedBy: OpenbisUser;
  projectIdentifier: string;
  collectionType: string;
  tags?: string[];
  frozenForObjects?: boolean;
  frozenForDatasets?: boolean;
}

export interface OpenbisObject extends OpenbisEntityBase {
  kind: "OBJECT";
  modifiedBy: OpenbisUser;
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
  modifiedBy: OpenbisUser;
  accessDate: Date;
  dataProducedBy: string;
  dataProductionDate: Date;
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

export interface OpenbisUser {
  userPermId: string; // NOT like OpenbisPermId, different format
  userId: string; // login name
  registrationDate: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  homeSpace?: OpenbisSpace;
}

// TODO(#46): add semantic annotation, new properties, etc.
export interface OpenbisPropertyType {
  code: string;
  managedInternally: boolean;
  dataType: OpenbisPropertyDataType;
  registratedBy: OpenbisUser;
  registrationDate: Date;
  label?: string;
  description?: string;
  vocabulary?: string;
  objectType?: string;
  scheme?: string;
  transformation?: string;
  metadata?: Record<string, unknown>;
}
