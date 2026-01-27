/**
 * Extensive mock data for OpenBIS Objects (formerly Samples) within Collections.
 * Includes multiple objects with different property types for testing edge cases.
 * These objects are tied to collections from mockCollection.ts
 */

import { OpenbisObject, OpenbisPermId } from "../model/OpenBISModel";
import { commonUsers } from "./commonUsers";
import { collectionOverviewMock } from "./mockCollection";

// Extract collection references from mockCollection
const qdBatch001 = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_BATCH_001",
);
const qdBatch002 = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_BATCH_002",
);
const qdHeterostructure = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_HETEROSTRUCTURE",
);
const qdOpticalProps = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_OPTICAL_PROPS",
);
const qdElectronicChar = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_ELECTRONIC_CHAR",
);
const qdMorphology = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_MORPHOLOGY",
);
const qdThermalAnalysis = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_THERMAL_ANALYSIS",
);
const qdControlSamples = collectionOverviewMock.collections.find(
  (c) => c.code === "QD_CONTROL_SAMPLES",
);

if (
  !qdBatch001 ||
  !qdBatch002 ||
  !qdHeterostructure ||
  !qdOpticalProps ||
  !qdElectronicChar ||
  !qdMorphology ||
  !qdThermalAnalysis ||
  !qdControlSamples
) {
  throw new Error(
    "Invalid mock data: Required collections not found in mockCollection. Ensure mockCollection is initialized first.",
  );
}

/**
 * Objects from QD_BATCH_001 collection
 * Testing: basic properties, varying creation dates, different states
 */
export const qd_batch_001_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_B1_001",
    permId: "20240115093015001-5001" as OpenbisPermId,
    description: "CdSe core-shell QD sample - first synthesis run",
    registratedBy: commonUsers.johnDoe,
    modifiedBy: commonUsers.bobSmith,
    registrationDate: new Date("2024-01-15T09:30:15Z"),
    modificationDate: new Date("2024-12-10T14:20:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["synthesis-v1", "tested", "archived"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B1_002",
    permId: "20240115093045002-5002" as OpenbisPermId,
    description: "CdSe core-shell QD with increased shell thickness",
    registratedBy: commonUsers.johnDoe,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-01-15T09:30:45Z"),
    modificationDate: new Date("2024-12-09T10:15:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["shell-optimization", "high-quality"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B1_003",
    permId: "20240115094000003-5003" as OpenbisPermId,
    description: "Control sample - bare CdSe core without shell",
    registratedBy: commonUsers.bobSmith,
    modifiedBy: commonUsers.johnDoe,
    registrationDate: new Date("2024-01-15T09:40:00Z"),
    modificationDate: new Date("2024-12-08T16:30:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["control", "reference"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B1_004",
    permId: "20240115094015004-5004" as OpenbisPermId,
    description:
      "CdSe QD with doping - added Mn impurities for magnetic properties",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.bobSmith,
    registrationDate: new Date("2024-01-15T09:40:15Z"),
    modificationDate: new Date("2024-12-07T11:45:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["doped", "magnetic", "experimental"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B1_005",
    permId: "20240115094030005-5005" as OpenbisPermId,
    description: "CdSe/ZnS heterostructure with graded interface",
    registratedBy: commonUsers.johnDoe,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-01-15T09:40:30Z"),
    modificationDate: new Date("2024-12-10T13:20:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["heterostructure", "graded-interface"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B1_006",
    permId: "20240115094045006-5006" as OpenbisPermId,
    description:
      "CdSe QD in toluene solvent - post-synthesis extraction and purification",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-01-15T09:40:45Z"),
    modificationDate: new Date("2024-12-09T15:10:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch001.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["purified", "solvent-dispersed"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_BATCH_002 collection
 * Testing: PbS quantum dots, various size distributions
 */
export const qd_batch_002_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_B2_001",
    permId: "20240202145530001-5007" as OpenbisPermId,
    description: "PbS quantum dots - 3.5 nm diameter (size 1)",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-02-02T14:55:30Z"),
    modificationDate: new Date("2024-12-08T11:45:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch002.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["PbS", "size-3.5nm", "temperature-room"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B2_002",
    permId: "20240202145600002-5008" as OpenbisPermId,
    description: "PbS quantum dots - 3.5 nm diameter at 4K",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.bobSmith,
    registrationDate: new Date("2024-02-02T14:56:00Z"),
    modificationDate: new Date("2024-12-08T11:50:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch002.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["PbS", "size-3.5nm", "temperature-4K", "cryogenic"],
    frozenForDatasets: false,
    frozenForParents: true,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B2_003",
    permId: "20240202145630003-5009" as OpenbisPermId,
    description: "PbS quantum dots - 4.5 nm diameter (size 2)",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.johnDoe,
    registrationDate: new Date("2024-02-02T14:56:30Z"),
    modificationDate: new Date("2024-12-08T11:55:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch002.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["PbS", "size-4.5nm"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B2_004",
    permId: "20240202145700004-5010" as OpenbisPermId,
    description: "PbS quantum dots - 5.5 nm diameter (size 3)",
    registratedBy: commonUsers.janeDoe,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-02-02T14:57:00Z"),
    modificationDate: new Date("2024-12-08T12:00:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch002.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["PbS", "size-5.5nm"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_B2_005",
    permId: "20240202145730005-5011" as OpenbisPermId,
    description: "PbS/PbSe type-II heterostructure - NIR active",
    registratedBy: commonUsers.janeDoe,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-02-02T14:57:30Z"),
    modificationDate: new Date("2024-12-08T12:05:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdBatch002.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["PbS/PbSe", "type-II", "NIR"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_HETEROSTRUCTURE collection
 * Testing: complex compositions, multiple tags, parent-child relationships
 */
export const qd_heterostructure_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_HS_001",
    permId: "20240310102245001-5012" as OpenbisPermId,
    description:
      "CdSe/CdS/ZnS gradient heterostructure - optimized composition",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-03-10T10:22:45Z"),
    modificationDate: new Date("2024-12-12T16:10:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdHeterostructure.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: [
      "heterostructure",
      "gradient",
      "CdSe-core",
      "CdS-gradient",
      "ZnS-shell",
    ],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_HS_002",
    permId: "20240310102300002-5013" as OpenbisPermId,
    description: "CdSe/CdS step heterostructure - thick shell variant",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-03-10T10:23:00Z"),
    modificationDate: new Date("2024-12-12T16:15:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdHeterostructure.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["heterostructure", "step", "CdSe-core", "CdS-shell", "thick-shell"],
    parentsIdentifiers: ["20240115093015001-5001"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_HS_003",
    permId: "20240310102315003-5014" as OpenbisPermId,
    description: "InP/ZnS heterostructure - green emitting variant",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-03-10T10:23:15Z"),
    modificationDate: new Date("2024-12-12T16:20:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdHeterostructure.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["heterostructure", "InP", "ZnS", "green-emission"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: true,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_HS_004",
    permId: "20240310102330004-5015" as OpenbisPermId,
    description: "CdTe/CdSe type-II heterostructure - indirect bandgap",
    registratedBy: commonUsers.johnDoe,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-03-10T10:23:30Z"),
    modificationDate: new Date("2024-12-12T16:25:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdHeterostructure.code,
    objectType: "QUANTUM_DOT_SAMPLE",
    tags: ["heterostructure", "type-II", "CdTe", "CdSe", "indirect-gap"],
    childrenIdentifiers: ["20240310102300002-5013", "20240310102315003-5014"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_OPTICAL_PROPS collection
 * Testing: objects with very detailed descriptions, multiple measurement types
 */
export const qd_optical_props_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_OP_ABS_001",
    permId: "20240515081300001-5016" as OpenbisPermId,
    description:
      "Absorption spectroscopy data - broadband UV-Vis-NIR measurements (300-1700nm)",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-05-15T08:13:00Z"),
    modificationDate: new Date("2024-12-01T13:55:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdOpticalProps.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["absorption", "UV-Vis", "NIR", "spectroscopy"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_OP_FL_001",
    permId: "20240515081330002-5017" as OpenbisPermId,
    description:
      "Fluorescence spectroscopy - steady-state and lifetime measurements with picosecond resolution",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-05-15T08:13:30Z"),
    modificationDate: new Date("2024-12-01T14:00:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdOpticalProps.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["fluorescence", "lifetime", "quantum-yield", "spectroscopy"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_OP_PL_TEMP",
    permId: "20240515081400003-5018" as OpenbisPermId,
    description:
      "Temperature-dependent photoluminescence measurements (10K-300K) with cryogenic setup",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2024-05-15T08:14:00Z"),
    modificationDate: new Date("2024-12-01T14:05:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdOpticalProps.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["photoluminescence", "temperature-dependent", "cryogenic"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_OP_RAMAN",
    permId: "20240515081430004-5019" as OpenbisPermId,
    description:
      "Raman spectroscopy measurements - structural characterization and phonon modes",
    registratedBy: commonUsers.janeDoe,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-05-15T08:14:30Z"),
    modificationDate: new Date("2024-12-01T14:10:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdOpticalProps.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["Raman", "structural", "phonon-modes"],
    frozenForDatasets: false,
    frozenForParents: true,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_ELECTRONIC_CHAR collection
 * Testing: complex relationships, multiple measurement parameters
 */
export const qd_electronic_char_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_EC_IVD_001",
    permId: "20240625133045001-5020" as OpenbisPermId,
    description:
      "I-V curves of individual quantum dot - dark and illuminated measurements at 300K",
    registratedBy: commonUsers.johnDoe,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2024-06-25T13:30:45Z"),
    modificationDate: new Date("2024-12-14T10:20:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdElectronicChar.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["I-V-curves", "dark-current", "illuminated", "single-device"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_EC_TRANSISTOR_001",
    permId: "20240625133100002-5021" as OpenbisPermId,
    description:
      "Field-effect transistor characterization - transfer and output curves with varying gate voltage",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.johnDoe,
    registrationDate: new Date("2024-06-25T13:31:00Z"),
    modificationDate: new Date("2024-12-14T10:25:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdElectronicChar.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["transistor", "FET", "transfer-curve", "output-curve"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_EC_CAPACITANCE",
    permId: "20240625133115003-5022" as OpenbisPermId,
    description:
      "Capacitance-voltage measurements - high-frequency and low-frequency data",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2024-06-25T13:31:15Z"),
    modificationDate: new Date("2024-12-14T10:30:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdElectronicChar.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["capacitance", "C-V", "HF", "LF"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_EC_NOISE",
    permId: "20240625133130004-5023" as OpenbisPermId,
    description:
      "Electrical noise measurements - 1/f noise characterization and spectral analysis",
    registratedBy: commonUsers.bobSmith,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-06-25T13:31:30Z"),
    modificationDate: new Date("2024-12-14T10:35:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdElectronicChar.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["noise", "1/f-noise", "flicker"],
    parentsIdentifiers: ["20240625133100002-5021"],
    frozenForDatasets: false,
    frozenForParents: true,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_MORPHOLOGY collection
 * Testing: imaging data, very long descriptions, large file references
 */
export const qd_morphology_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_MO_TEM_001",
    permId: "20240703095900001-5024" as OpenbisPermId,
    description:
      "High-resolution TEM images of quantum dot structures - multiple magnifications (50k to 500k) showing lattice fringes and particle size distribution analysis from 500 particles",
    registratedBy: commonUsers.bobSmith,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-07-03T09:59:00Z"),
    modificationDate: new Date("2024-12-09T15:40:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdMorphology.code,
    objectType: "IMAGING_DATA",
    tags: ["TEM", "HRTEM", "lattice-fringes", "size-distribution"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_MO_SEM_001",
    permId: "20240703095930002-5025" as OpenbisPermId,
    description:
      "Scanning electron microscopy images - surface morphology and aggregation state analysis at various magnifications with elemental composition mapping via EDS",
    registratedBy: commonUsers.bobSmith,
    modifiedBy: commonUsers.janeDoe,
    registrationDate: new Date("2024-07-03T09:59:30Z"),
    modificationDate: new Date("2024-12-09T15:45:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdMorphology.code,
    objectType: "IMAGING_DATA",
    tags: ["SEM", "surface-morphology", "EDS", "elemental-analysis"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_MO_AFM_001",
    permId: "20240703100000003-5026" as OpenbisPermId,
    description:
      "Atomic force microscopy 3D height maps and roughness analysis - surface characterization with nanometer-scale resolution over 10x10 micrometer areas",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.bobSmith,
    registrationDate: new Date("2024-07-03T10:00:00Z"),
    modificationDate: new Date("2024-12-09T15:50:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdMorphology.code,
    objectType: "IMAGING_DATA",
    tags: ["AFM", "3D-height", "roughness", "surface-characterization"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: true,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_MO_XRD_001",
    permId: "20240703100030004-5027" as OpenbisPermId,
    description:
      "X-ray diffraction patterns - crystalline structure determination with Rietveld refinement and strain analysis of 2D and 3D superlattices",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-07-03T10:00:30Z"),
    modificationDate: new Date("2024-12-09T15:55:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdMorphology.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["XRD", "diffraction", "crystal-structure", "strain"],
    childrenIdentifiers: ["20240703095900001-5024", "20240703095930002-5025"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_THERMAL_ANALYSIS collection
 * Testing: temperature-dependent data, long-term measurements
 */
export const qd_thermal_analysis_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_TA_DSC_001",
    permId: "20240812152700001-5028" as OpenbisPermId,
    description:
      "Differential scanning calorimetry - thermal transitions from 25°C to 500°C at 10°C/min scan rate",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2024-08-12T15:27:00Z"),
    modificationDate: new Date("2024-11-30T12:15:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdThermalAnalysis.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["DSC", "thermal-transition", "calorimetry"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_TA_TGA_001",
    permId: "20240812152730002-5029" as OpenbisPermId,
    description:
      "Thermogravimetric analysis - mass loss profile during heating showing organic coating decomposition and inorganic core stability",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2024-08-12T15:27:30Z"),
    modificationDate: new Date("2024-11-30T12:20:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdThermalAnalysis.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["TGA", "mass-loss", "thermal-stability"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_TA_DTA_001",
    permId: "20240812152800003-5030" as OpenbisPermId,
    description:
      "Differential thermal analysis - endo/exothermic events with high temperature resolution",
    registratedBy: commonUsers.mariaGarcia,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-08-12T15:28:00Z"),
    modificationDate: new Date("2024-11-30T12:25:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdThermalAnalysis.code,
    objectType: "MEASUREMENT_DATA",
    tags: ["DTA", "endothermic", "exothermic"],
    parentsIdentifiers: ["20240812152700001-5028"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from QD_CONTROL_SAMPLES collection
 * Testing: reference samples with minimal properties
 */
export const qd_control_samples_objects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "QD_REF_CdSe",
    permId: "20240520110100001-5031" as OpenbisPermId,
    description: "Reference sample - CdSe quantum dots (Sigma Aldrich, Lot X)",
    registratedBy: commonUsers.davidBrown,
    modifiedBy: commonUsers.johnDoe,
    registrationDate: new Date("2024-05-20T11:01:00Z"),
    modificationDate: new Date("2024-12-11T08:50:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdControlSamples.code,
    objectType: "REFERENCE_SAMPLE",
    tags: ["reference", "standard", "commercial"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "QD_REF_Blank",
    permId: "20240520110130002-5032" as OpenbisPermId,
    description: "Blank reference - pure solvent (toluene) without particles",
    registratedBy: commonUsers.davidBrown,
    modifiedBy: commonUsers.johnDoe,
    registrationDate: new Date("2024-05-20T11:01:30Z"),
    modificationDate: new Date("2024-12-11T08:55:00Z"),
    projectIdentifier: collectionOverviewMock.project.code,
    collectionIdentifier: qdControlSamples.code,
    objectType: "REFERENCE_SAMPLE",
    tags: ["blank", "solvent", "negative-control"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * All objects grouped by collection code for easy access in tests
 */
export const allCollectionObjects = {
  QD_BATCH_001: qd_batch_001_objects,
  QD_BATCH_002: qd_batch_002_objects,
  QD_HETEROSTRUCTURE: qd_heterostructure_objects,
  QD_OPTICAL_PROPS: qd_optical_props_objects,
  QD_ELECTRONIC_CHAR: qd_electronic_char_objects,
  QD_MORPHOLOGY: qd_morphology_objects,
  QD_THERMAL_ANALYSIS: qd_thermal_analysis_objects,
  QD_CONTROL_SAMPLES: qd_control_samples_objects,
};

/**
 * Flatten all objects for quick access
 */
export const allObjectsFlat: OpenbisObject[] =
  Object.values(allCollectionObjects).flat();
