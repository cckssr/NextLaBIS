/**
 * Mock data provider for Object overview page (Phase 0).
 * Uses properties_demo.json as source for realistic mock data.
 */

import type { OpenbisPermId } from "@/lib/model/OpenBISModel";
import {
  type ObjectOverview,
  type PropertyDefinition,
  type RawObjectTypeSchema,
  type VocabularyOption,
  transformObjectTypeSchema,
  groupPropertiesBySection,
  createMockObject,
} from "./model";

// Import properties demo data
import propertiesDemo from "@/lib/mocks/properties_demo.json";

/**
 * Type for the raw JSON structure from properties_demo.json.
 */
interface RawDemoEntry {
  example_props: Record<string, unknown>;
  object_type: RawObjectTypeSchema;
}

type PropertiesDemoType = Record<string, RawDemoEntry>;

const typedPropertiesDemo = propertiesDemo as PropertiesDemoType;

/**
 * Mock controlled vocabulary options for fields that don't have vocab data in demo.
 */
const MOCK_VOCABULARIES: Record<string, VocabularyOption[]> = {
  "experiment.subtask": [
    { code: "42A", label: "42A - Michelson Interferometer", ordinal: 1 },
    { code: "42B", label: "42B - Mach-Zehnder", ordinal: 2 },
    { code: "43A", label: "43A - Diffraction", ordinal: 3 },
    { code: "43B", label: "43B - Polarization", ordinal: 4 },
  ],
  "equipment.type": [
    { code: "6231", label: "Multimeter", ordinal: 1 },
    { code: "6232", label: "Oscilloscope", ordinal: 2 },
    { code: "6233", label: "Power Supply", ordinal: 3 },
    { code: "6234", label: "Function Generator", ordinal: 4 },
  ],
  "equipment.status": [
    {
      code: "FUNC",
      label: "Funktioniert",
      description: "Funktionsfähig",
      ordinal: 1,
    },
    {
      code: "DEF",
      label: "Defekt",
      description: "Nicht funktionsfähig",
      ordinal: 2,
    },
    {
      code: "OK",
      label: "Kalibriert",
      description: "Kalibriert und einsatzbereit",
      ordinal: 3,
    },
    {
      code: "NOCALB",
      label: "Unkalibriert",
      description: "Funktioniert, aber nicht kalibriert",
      ordinal: 4,
    },
    {
      code: "UNKWN",
      label: "Unbekannt",
      description: "Status unbekannt",
      ordinal: 5,
    },
    {
      code: "ARCHIVE",
      label: "Archiviert",
      description: "Nicht mehr in Nutzung",
      ordinal: 6,
    },
  ],
  "equipment.room": [
    {
      code: "ER129",
      label: "ER129/130",
      description: "Tutorschaft",
      ordinal: 1,
    },
    { code: "ER149", label: "ER149 (A1-0)", ordinal: 2 },
    { code: "ER150", label: "ER150 (A1)", ordinal: 3 },
    { code: "ER169", label: "ER169 (A4)", ordinal: 4 },
    { code: "EW74", label: "EW74/75 (N2)", ordinal: 5 },
    { code: "EW78", label: "EW78 (N1)", ordinal: 6 },
    { code: "MISC", label: "Sonstiges", ordinal: 99 },
  ],
  "equipment.storage_type": [
    { code: "BOX", label: "Box", ordinal: 1 },
    { code: "DRAWER", label: "Schublade", ordinal: 2 },
    { code: "SHELF", label: "Regal", ordinal: 3 },
    { code: "CABINET", label: "Schrank", ordinal: 4 },
  ],
  "equipment.gastube_element": [
    { code: "AR", label: "Ar (Argon)", ordinal: 1 },
    { code: "HE", label: "He (Helium)", ordinal: 2 },
    { code: "NE", label: "Ne (Neon)", ordinal: 3 },
    { code: "KR", label: "Kr (Krypton)", ordinal: 4 },
    { code: "HG", label: "Hg (Quecksilber)", ordinal: 5 },
    { code: "N2", label: "N2 (Stickstoff)", ordinal: 6 },
    { code: "H2", label: "H2 (Wasserstoff)", ordinal: 7 },
    { code: "O2", label: "O2 (Sauerstoff)", ordinal: 8 },
  ],
};

/**
 * Enriches property definitions with mock vocabulary options where missing.
 */
function enrichWithVocabularies(
  definitions: PropertyDefinition[],
): PropertyDefinition[] {
  return definitions.map((def) => {
    if (def.dataType === "CONTROLLEDVOCABULARY" && !def.vocabularyOptions) {
      // Try to find mock vocabulary by property code (lowercase, without prefix)
      const codeKey = def.code.toLowerCase();
      const mockVocab = MOCK_VOCABULARIES[codeKey];
      if (mockVocab) {
        return { ...def, vocabularyOptions: mockVocab };
      }
    }
    return def;
  });
}

/**
 * Maps demo permIds to human-readable object info.
 */
const MOCK_OBJECT_INFO: Record<
  string,
  { code: string; objectType: string; description: string; objectPath: string }
> = {
  "20230926131945976-3845": {
    code: "EXP_42A_001",
    objectType: "GP_STANDARDVERSUCH",
    description:
      "Aufbau und Justage des Michelson Interferometers aus Thorlabs Kit",
    objectPath:
      "Physics Laboratory / Grundpraktikum / Optik Versuche / EXP_42A_001",
  },
  "20251114144002628-18230": {
    code: "INST_001",
    objectType: "EQUIPMENT",
    description:
      "Precise digital desktop multimeter for laboratory applications with high resolution and comprehensive interface support.",
    objectPath:
      "Physics Laboratory / Laboratory Equipment / Electrical Instruments / INST_001",
  },
  "20240721180130727-12153": {
    code: "TUBE_AR_001",
    objectType: "EQUIPMENT_GASTUBE",
    description: "Argon spectrum tube for spectroscopy experiments",
    objectPath:
      "Physics Laboratory / Laboratory Equipment / Spectrum Tubes / TUBE_AR_001",
  },
};

/**
 * Returns mock ObjectOverview for a given permId.
 * Returns null if permId not found in demo data.
 */
export function getObjectOverviewMock(
  permId: OpenbisPermId,
): ObjectOverview | null {
  const demoEntry = typedPropertiesDemo[permId];
  if (!demoEntry) {
    return null;
  }

  const objectInfo = MOCK_OBJECT_INFO[permId] || {
    code: `OBJ_${permId.slice(-4)}`,
    objectType: "UNKNOWN_TYPE",
    description: "Mock object description",
    objectPath: `Unknown / Path / OBJ_${permId.slice(-4)}`,
  };

  // Transform the schema
  let propertyDefinitions = transformObjectTypeSchema(demoEntry.object_type);

  // Enrich with mock vocabularies where needed
  propertyDefinitions = enrichWithVocabularies(propertyDefinitions);

  // Group by sections
  const sections = groupPropertiesBySection(propertyDefinitions);

  // Extract $name from properties
  const objectName =
    (demoEntry.example_props["$name"] as string) || objectInfo.code;

  // Create mock object entity
  const object = createMockObject(
    permId,
    objectInfo.code,
    objectInfo.objectType,
    objectInfo.description,
  );

  return {
    object,
    objectName,
    propertyDefinitions,
    propertyValues: demoEntry.example_props,
    sections,
    filesCount: 5, // Mock files count
    objectPath: objectInfo.objectPath,
  };
}

/**
 * Returns all available mock object permIds for testing.
 */
export function getAvailableMockPermIds(): OpenbisPermId[] {
  return Object.keys(typedPropertiesDemo) as OpenbisPermId[];
}
