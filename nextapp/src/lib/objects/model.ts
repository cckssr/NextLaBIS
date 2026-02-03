/**
 * Model types for Object view/edit page.
 * Transforms the index-based openBIS schema into usable TypeScript interfaces.
 */

import type {
  OpenbisObject,
  OpenbisPropertyDataType,
  OpenbisUser,
  OpenbisPermId,
} from "@/lib/model/OpenBISModel";

/**
 * Option for controlled vocabulary / dropdown fields.
 */
export interface VocabularyOption {
  code: string;
  label: string;
  description?: string | null;
  ordinal: number;
}

/**
 * Transformed property definition from openBIS object_type schema.
 * Converts the index-based JSON structure into a flat array.
 */
export interface PropertyDefinition {
  code: string;
  dataType: OpenbisPropertyDataType;
  section: string;
  ordinal: number;
  mandatory: boolean;
  showInEditView: boolean;
  vocabularyOptions?: VocabularyOption[];
}

/**
 * Properties grouped by section, sorted by ordinal.
 */
export interface PropertySection {
  sectionName: string;
  properties: PropertyDefinition[];
}

/**
 * Complete object overview with all data needed for view/edit page.
 */
export interface ObjectOverview {
  object: OpenbisObject;
  objectName: string; // Extracted from $name property
  propertyDefinitions: PropertyDefinition[];
  propertyValues: Record<string, unknown>;
  sections: PropertySection[];
  filesCount: number;
  objectPath: string; // e.g. "Physics Laboratory / Lab Equipment / Instruments / INST_001"
}

/**
 * Raw index-based schema from openBIS JSON (as in properties_demo.json).
 */
export interface RawObjectTypeSchema {
  code: Record<string, string>;
  dataType: Record<string, string>;
  section: Record<string, string>;
  ordinal: Record<string, number>;
  mandatory: Record<string, boolean>;
  showInEditView: Record<string, boolean>;
  controlledVocabulary?: Record<
    string,
    {
      code: Record<string, string>;
      label: Record<string, string>;
      description: Record<string, string | null>;
      ordinal: Record<string, number>;
    }
  >;
}

/**
 * Transforms a controlled vocabulary from index-based to array format.
 */
function transformVocabulary(
  vocabData:
    | {
        code: Record<string, string>;
        label: Record<string, string>;
        description: Record<string, string | null>;
        ordinal: Record<string, number>;
      }
    | undefined,
): VocabularyOption[] {
  if (!vocabData) return [];

  const indices = Object.keys(vocabData.code);
  return indices
    .map((idx) => ({
      code: vocabData.code[idx],
      label: vocabData.label[idx],
      description: vocabData.description[idx],
      ordinal: vocabData.ordinal[idx],
    }))
    .sort((a, b) => a.ordinal - b.ordinal);
}

/**
 * Transforms the index-based openBIS object_type schema into PropertyDefinition array.
 */
export function transformObjectTypeSchema(
  schema: RawObjectTypeSchema,
): PropertyDefinition[] {
  const indices = Object.keys(schema.code);

  return indices
    .map((idx) => {
      const def: PropertyDefinition = {
        code: schema.code[idx],
        dataType: schema.dataType[idx] as OpenbisPropertyDataType,
        section: schema.section[idx],
        ordinal: schema.ordinal[idx],
        mandatory: schema.mandatory[idx],
        showInEditView: schema.showInEditView[idx],
      };

      // Add vocabulary options if this is a CONTROLLEDVOCABULARY field
      if (
        schema.dataType[idx] === "CONTROLLEDVOCABULARY" &&
        schema.controlledVocabulary?.[idx]
      ) {
        def.vocabularyOptions = transformVocabulary(
          schema.controlledVocabulary[idx],
        );
      }

      return def;
    })
    .sort((a, b) => a.ordinal - b.ordinal);
}

/**
 * Groups property definitions by section, maintaining ordinal order within each section.
 */
export function groupPropertiesBySection(
  definitions: PropertyDefinition[],
): PropertySection[] {
  const sectionMap = new Map<string, PropertyDefinition[]>();

  // Preserve section order by first occurrence
  const sectionOrder: string[] = [];

  for (const def of definitions) {
    if (!sectionMap.has(def.section)) {
      sectionMap.set(def.section, []);
      sectionOrder.push(def.section);
    }
    sectionMap.get(def.section)!.push(def);
  }

  return sectionOrder.map((sectionName) => ({
    sectionName,
    properties: sectionMap.get(sectionName)!,
  }));
}

/**
 * Determines grid column span based on property data type.
 * Full-width for multiline/rich content, smaller spans for simple fields.
 *
 * @returns span value (1=full width 12 cols, 2=half 6 cols, 3=third 4 cols, 4=quarter 3 cols)
 */
export function getPropertySpan(dataType: OpenbisPropertyDataType): number {
  switch (dataType) {
    case "MULTILINE_VARCHAR":
    case "XML":
    case "JSON":
      return 1; // Full width
    case "BOOLEAN":
      return 4; // Quarter width
    case "INTEGER":
    case "REAL":
    case "DATE":
    case "TIMESTAMP":
      return 3; // Third width
    default:
      return 2; // Half width (VARCHAR, CONTROLLEDVOCABULARY, etc.)
  }
}

/**
 * Converts span hint to actual Mantine GridCol span value (out of 12 columns).
 */
export function spanToGridCols(span: number): number {
  switch (span) {
    case 1:
      return 12; // Full width
    case 2:
      return 6; // Half
    case 3:
      return 4; // Third
    case 4:
      return 3; // Quarter
    default:
      return 6;
  }
}

/**
 * Mock user helper for Phase 0.
 */
export function createMockUser(
  userId: string,
  firstName: string,
  lastName: string,
): OpenbisUser {
  return {
    userPermId: `user-${userId}`,
    userId,
    registrationDate: new Date("2023-01-01"),
    firstName,
    lastName,
    email: `${userId}@example.com`,
  };
}

/**
 * Creates a mock OpenbisObject for Phase 0.
 */
export function createMockObject(
  permId: OpenbisPermId,
  code: string,
  objectType: string,
  description: string,
): OpenbisObject {
  const mockUser = createMockUser("admin", "Lab", "Admin");

  return {
    kind: "OBJECT",
    permId,
    code,
    description,
    registrationDate: new Date("2025-05-01T09:00:00"),
    modificationDate: new Date("2025-07-01T14:30:00"),
    registratedBy: mockUser,
    modifiedBy: mockUser,
    projectIdentifier: "/PHYSICS_LAB/QD_CHAR_2024",
    collectionIdentifier: "/PHYSICS_LAB/QD_CHAR_2024/INSTRUMENTS",
    objectType,
    tags: ["instrument", "measurement"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  };
}
