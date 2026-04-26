/**
 * Extensive mock data for OpenBIS Objects across all extended collections.
 * Includes objects from NANO_LAB, ASTRO_DET, TEACH_LABS, STRUCTURAL_BIO, and MATERIALS_SCI spaces.
 */

import { OpenbisObject, OpenbisPermId } from "../model/OpenBISModel";
import { commonUsers } from "./commonUsers";

/**
 * Objects from NANO_LAB / AFM_SURF_2024 / AFM_ROUGHNESS_DATA Collection
 */
export const nanoLabAFMRoughnessObjects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "AFM_R_001_GLASS",
    permId: "20240122100201001-6501" as OpenbisPermId,
    description: "Glass substrate roughness - Ra = 2.3 nm",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.bobSmith,
    registrationDate: new Date("2024-01-22T10:02:01Z"),
    modificationDate: new Date("2024-12-09T09:15:00Z"),
    projectIdentifier: "AFM_SURF_2024",
    collectionIdentifier: "AFM_ROUGHNESS_DATA",
    objectType: "MEASUREMENT_DATA",
    tags: ["glass", "substrate", "roughness", "Ra"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "AFM_R_002_SILICON",
    permId: "20240122100202002-6502" as OpenbisPermId,
    description: "Silicon surface roughness - Ra = 0.8 nm",
    registratedBy: commonUsers.bobSmith,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-01-22T10:02:02Z"),
    modificationDate: new Date("2024-12-08T14:30:00Z"),
    projectIdentifier: "AFM_SURF_2024",
    collectionIdentifier: "AFM_ROUGHNESS_DATA",
    objectType: "MEASUREMENT_DATA",
    tags: ["silicon", "polished", "smooth", "Ra"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "AFM_R_003_MICA",
    permId: "20240122100203003-6503" as OpenbisPermId,
    description: "Mica cleaved surface - Ra < 0.1 nm",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2024-01-22T10:02:03Z"),
    modificationDate: new Date("2024-12-07T11:20:00Z"),
    projectIdentifier: "AFM_SURF_2024",
    collectionIdentifier: "AFM_ROUGHNESS_DATA",
    objectType: "MEASUREMENT_DATA",
    tags: ["mica", "atomically-flat", "reference"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "AFM_R_004_GOLD",
    permId: "20240122100204004-6504" as OpenbisPermId,
    description: "Gold surface after annealing - Ra = 1.2 nm",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2024-01-22T10:02:04Z"),
    modificationDate: new Date("2024-12-09T15:45:00Z"),
    projectIdentifier: "AFM_SURF_2024",
    collectionIdentifier: "AFM_ROUGHNESS_DATA",
    objectType: "MEASUREMENT_DATA",
    tags: ["gold", "metal", "annealed"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from ASTRO_DET / COSMIC_MUONS / MUON_RATE_MEASUREMENTS Collection
 */
export const astroDetMuonRateObjects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "MUON_2022_ANNUAL",
    permId: "20220901123201001-7501" as OpenbisPermId,
    description: "2022 annual muon rate data - 365 days continuous monitoring",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.davidBrown,
    registrationDate: new Date("2022-09-01T12:32:01Z"),
    modificationDate: new Date("2024-12-16T08:20:00Z"),
    projectIdentifier: "COSMIC_MUONS",
    collectionIdentifier: "MUON_RATE_MEASUREMENTS",
    objectType: "TIMESERIES_DATA",
    tags: ["2022", "annual", "continuous"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "MUON_2023_ANNUAL",
    permId: "20220901123202002-7502" as OpenbisPermId,
    description: "2023 annual muon rate data - 365 days continuous monitoring",
    registratedBy: commonUsers.davidBrown,
    modifiedBy: commonUsers.charlesLi,
    registrationDate: new Date("2022-09-01T12:32:02Z"),
    modificationDate: new Date("2024-12-15T09:45:00Z"),
    projectIdentifier: "COSMIC_MUONS",
    collectionIdentifier: "MUON_RATE_MEASUREMENTS",
    objectType: "TIMESERIES_DATA",
    tags: ["2023", "annual", "continuous"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "MUON_2024_PARTIAL",
    permId: "20220901123203003-7503" as OpenbisPermId,
    description: "2024 partial year data - January to December (ongoing)",
    registratedBy: commonUsers.charlesLi,
    modifiedBy: commonUsers.davidBrown,
    registrationDate: new Date("2022-09-01T12:32:03Z"),
    modificationDate: new Date("2024-12-17T07:55:00Z"),
    projectIdentifier: "COSMIC_MUONS",
    collectionIdentifier: "MUON_RATE_MEASUREMENTS",
    objectType: "TIMESERIES_DATA",
    tags: ["2024", "partial", "ongoing"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from TEACH_LABS / OPTICS_GP / OPTICS_GEOMETRIC_LAB Collection
 */
export const teachLabsOpticsGeometricObjects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "OPTICS_LENS_F1_SEM2024",
    permId: "20200201100101001-8501" as OpenbisPermId,
    description: "Spring semester 2024 - Lens focal length measurements",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2024-02-01T10:01:01Z"),
    modificationDate: new Date("2024-09-15T14:20:00Z"),
    projectIdentifier: "OPTICS_GP",
    collectionIdentifier: "OPTICS_GEOMETRIC_LAB",
    objectType: "STUDENT_DATA",
    tags: ["lens", "focal-length", "2024-spring"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "OPTICS_MIRROR_F2_SEM2024",
    permId: "20200201100102002-8502" as OpenbisPermId,
    description: "Spring semester 2024 - Curved mirror properties",
    registratedBy: commonUsers.mariaGarcia,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2024-02-01T10:01:02Z"),
    modificationDate: new Date("2024-09-14T11:35:00Z"),
    projectIdentifier: "OPTICS_GP",
    collectionIdentifier: "OPTICS_GEOMETRIC_LAB",
    objectType: "STUDENT_DATA",
    tags: ["mirror", "radius-of-curvature", "2024-spring"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "OPTICS_ABERRATION_F3_SEM2024",
    permId: "20200201100103003-8503" as OpenbisPermId,
    description: "Spring semester 2024 - Lens aberrations analysis",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2024-02-01T10:01:03Z"),
    modificationDate: new Date("2024-09-13T15:50:00Z"),
    projectIdentifier: "OPTICS_GP",
    collectionIdentifier: "OPTICS_GEOMETRIC_LAB",
    objectType: "STUDENT_DATA",
    tags: ["aberration", "spherical", "chromatic"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from STRUCTURAL_BIO / PROT_CRYSTAL / DIFFRACTION_DATA Collection
 */
export const structBioProteinDiffractionObjects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "PROT_CRYSTAL_1A2B",
    permId: "20230615100201001-9501" as OpenbisPermId,
    description: "Protein complex structure - PDB 1A2B - 2.1 Å resolution",
    registratedBy: commonUsers.mariaGarcia,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2023-06-15T10:02:01Z"),
    modificationDate: new Date("2024-12-15T11:30:00Z"),
    projectIdentifier: "PROT_CRYSTAL",
    collectionIdentifier: "DIFFRACTION_DATA",
    objectType: "STRUCTURAL_DATA",
    tags: ["crystal", "diffraction", "2.1A", "structure"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "PROT_CRYSTAL_2C3D",
    permId: "20230615100202002-9502" as OpenbisPermId,
    description: "Enzyme active site complex - PDB 2C3D - 1.8 Å resolution",
    registratedBy: commonUsers.sophiaDavis,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2023-06-15T10:02:02Z"),
    modificationDate: new Date("2024-12-14T15:20:00Z"),
    projectIdentifier: "PROT_CRYSTAL",
    collectionIdentifier: "DIFFRACTION_DATA",
    objectType: "STRUCTURAL_DATA",
    tags: ["enzyme", "active-site", "1.8A", "complex"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "PROT_CRYSTAL_3E4F",
    permId: "20230615100203003-9503" as OpenbisPermId,
    description: "Membrane protein dimer - PDB 3E4F - 3.2 Å resolution",
    registratedBy: commonUsers.mariaGarcia,
    modifiedBy: commonUsers.sophiaDavis,
    registrationDate: new Date("2023-06-15T10:02:03Z"),
    modificationDate: new Date("2024-12-13T10:50:00Z"),
    projectIdentifier: "PROT_CRYSTAL",
    collectionIdentifier: "DIFFRACTION_DATA",
    objectType: "STRUCTURAL_DATA",
    tags: ["membrane", "dimer", "3.2A", "interface"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * Objects from MATERIALS_SCI / POLYMER_CHAR / THERMAL_ANALYSIS_DSC Collection
 */
export const matSciPolymerDSCObjects: OpenbisObject[] = [
  {
    kind: "OBJECT",
    code: "POLYMER_DSC_PET",
    permId: "20230110142201001-10501" as OpenbisPermId,
    description: "PET polyethylene terephthalate - DSC thermogram",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2023-01-10T14:22:01Z"),
    modificationDate: new Date("2024-12-12T12:40:00Z"),
    projectIdentifier: "POLYMER_CHAR",
    collectionIdentifier: "THERMAL_ANALYSIS_DSC",
    objectType: "THERMAL_DATA",
    tags: ["PET", "DSC", "polyester", "crystalline"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "POLYMER_DSC_PDMS",
    permId: "20230110142202002-10502" as OpenbisPermId,
    description: "PDMS polydimethylsiloxane - DSC thermogram",
    registratedBy: commonUsers.mariaGarcia,
    modifiedBy: commonUsers.aliceWilson,
    registrationDate: new Date("2023-01-10T14:22:02Z"),
    modificationDate: new Date("2024-12-11T14:10:00Z"),
    projectIdentifier: "POLYMER_CHAR",
    collectionIdentifier: "THERMAL_ANALYSIS_DSC",
    objectType: "THERMAL_DATA",
    tags: ["PDMS", "DSC", "silicone", "amorphous"],
    frozenForDatasets: false,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
  {
    kind: "OBJECT",
    code: "POLYMER_DSC_PEEK",
    permId: "20230110142203003-10503" as OpenbisPermId,
    description: "PEEK polyetheretherketone - High-temperature DSC",
    registratedBy: commonUsers.aliceWilson,
    modifiedBy: commonUsers.mariaGarcia,
    registrationDate: new Date("2023-01-10T14:22:03Z"),
    modificationDate: new Date("2024-12-10T16:50:00Z"),
    projectIdentifier: "POLYMER_CHAR",
    collectionIdentifier: "THERMAL_ANALYSIS_DSC",
    objectType: "THERMAL_DATA",
    tags: ["PEEK", "DSC", "high-temperature", "engineering-polymer"],
    frozenForDatasets: true,
    frozenForParents: false,
    frozenForChildren: false,
    frozenForComponents: false,
  },
];

/**
 * All extended objects grouped by space/project/collection
 */
export const allExtendedObjects = {
  NANO_LAB: {
    AFM_SURF_2024: {
      AFM_ROUGHNESS_DATA: nanoLabAFMRoughnessObjects,
    },
  },
  ASTRO_DET: {
    COSMIC_MUONS: {
      MUON_RATE_MEASUREMENTS: astroDetMuonRateObjects,
    },
  },
  TEACH_LABS: {
    OPTICS_GP: {
      OPTICS_GEOMETRIC_LAB: teachLabsOpticsGeometricObjects,
    },
  },
  STRUCTURAL_BIO: {
    PROT_CRYSTAL: {
      DIFFRACTION_DATA: structBioProteinDiffractionObjects,
    },
  },
  MATERIALS_SCI: {
    POLYMER_CHAR: {
      THERMAL_ANALYSIS_DSC: matSciPolymerDSCObjects,
    },
  },
};

/**
 * Flatten all extended objects for quick access
 */
export const allExtendedObjectsFlat: OpenbisObject[] = [
  ...nanoLabAFMRoughnessObjects,
  ...astroDetMuonRateObjects,
  ...teachLabsOpticsGeometricObjects,
  ...structBioProteinDiffractionObjects,
  ...matSciPolymerDSCObjects,
];
