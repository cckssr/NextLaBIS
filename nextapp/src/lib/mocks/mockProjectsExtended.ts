/**
 * Comprehensive mock data for OpenBIS Projects across all Spaces.
 * Extends mockProject.ts to include projects from NANO_LAB, ASTRO_DET, TEACH_LABS,
 * STRUCTURAL_BIO, and MATERIALS_SCI spaces.
 *
 * Structure: Space → Project (with numberOfCollections and numberOfObjects)
 */

import { OpenbisPermId } from "../model/OpenBISModel";
import { ProjectOverview } from "../projects/model";
import { commonUsers } from "@/lib/mocks/commonUsers";
import { spaceOverviewMock } from "@/lib/mocks/mockSpace";

// Extract spaces for reference
const nanoLabSpace = spaceOverviewMock[1]?.space;
const astroDetSpace = spaceOverviewMock[2]?.space;
const teachLabsSpace = spaceOverviewMock[3]?.space;
const structBioSpace = spaceOverviewMock[4]?.space;
const matSciSpace = spaceOverviewMock[5]?.space;

if (
  !nanoLabSpace ||
  !astroDetSpace ||
  !teachLabsSpace ||
  !structBioSpace ||
  !matSciSpace
) {
  throw new Error("Invalid mock data: Required spaces not found in mockSpace.");
}

/**
 * Project Overview for NANO_LAB Space
 */
export const projectOverviewNanoLab: ProjectOverview = {
  space: nanoLabSpace,
  projects: [
    {
      kind: "PROJECT",
      code: "AFM_SURF_2024",
      permId: "20240122100000101-7001" as OpenbisPermId,
      description: "AFM-based surface roughness and adhesion measurements.",
      registratedBy: commonUsers.aliceWilson,
      modifiedBy: commonUsers.bobSmith,
      registrationDate: new Date("2024-01-22T10:00:00Z"),
      modificationDate: new Date("2024-12-09T09:15:00Z"),
      numberOfCollections: 6,
      numberOfObjects: 83,
    },
    {
      kind: "PROJECT",
      code: "THINFILM_ALD",
      permId: "20240314110000102-7002" as OpenbisPermId,
      description: "Atomic layer deposition of oxide thin films.",
      registratedBy: commonUsers.bobSmith,
      modifiedBy: commonUsers.aliceWilson,
      registrationDate: new Date("2023-03-14T11:40:00Z"),
      modificationDate: new Date("2024-11-28T14:05:00Z"),
      numberOfCollections: 9,
      numberOfObjects: 142,
    },
    {
      kind: "PROJECT",
      code: "GRAPHENE_GROWTH",
      permId: "20240505145000103-7003" as OpenbisPermId,
      description:
        "Chemical vapor deposition of graphene on various substrates.",
      registratedBy: commonUsers.charlesLi,
      modifiedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2024-05-05T14:50:00Z"),
      modificationDate: new Date("2024-12-08T16:30:00Z"),
      numberOfCollections: 8,
      numberOfObjects: 127,
    },
    {
      kind: "PROJECT",
      code: "NANOPARTICLE_SYN",
      permId: "20240612120000104-7004" as OpenbisPermId,
      description: "Synthesis and characterization of metallic nanoparticles.",
      registratedBy: commonUsers.mariaGarcia,
      modifiedBy: commonUsers.janeDoe,
      registrationDate: new Date("2024-06-12T12:00:00Z"),
      modificationDate: new Date("2024-12-14T10:20:00Z"),
      numberOfCollections: 10,
      numberOfObjects: 198,
    },
  ],
};

/**
 * Project Overview for ASTRO_DET Space
 */
export const projectOverviewAstroDet: ProjectOverview = {
  space: astroDetSpace,
  projects: [
    {
      kind: "PROJECT",
      code: "COSMIC_MUONS",
      permId: "20220901123000201-8001" as OpenbisPermId,
      description: "Long-term muon rate measurements with scintillator arrays.",
      registratedBy: commonUsers.charlesLi,
      modifiedBy: commonUsers.davidBrown,
      registrationDate: new Date("2022-09-01T12:30:00Z"),
      modificationDate: new Date("2024-12-17T07:55:00Z"),
      numberOfCollections: 15,
      numberOfObjects: 312,
    },
    {
      kind: "PROJECT",
      code: "DAQ_CAL",
      permId: "20230520151000202-8002" as OpenbisPermId,
      description: "Calibration and validation of DAQ electronics.",
      registratedBy: commonUsers.davidBrown,
      modifiedBy: commonUsers.charlesLi,
      registrationDate: new Date("2023-05-20T15:10:00Z"),
      modificationDate: new Date("2024-12-01T10:35:00Z"),
      numberOfCollections: 5,
      numberOfObjects: 67,
    },
    {
      kind: "PROJECT",
      code: "GAMMA_RAY_BURST",
      permId: "20240720094500203-8003" as OpenbisPermId,
      description: "Gamma-ray burst detection and analysis with timing arrays.",
      registratedBy: commonUsers.bobSmith,
      modifiedBy: commonUsers.charlesLi,
      registrationDate: new Date("2024-07-20T09:45:00Z"),
      modificationDate: new Date("2024-12-15T13:20:00Z"),
      numberOfCollections: 12,
      numberOfObjects: 287,
    },
    {
      kind: "PROJECT",
      code: "CHERENKOV_OBS",
      permId: "20240910165000204-8004" as OpenbisPermId,
      description: "Cherenkov radiation observations and spectrum analysis.",
      registratedBy: commonUsers.sophiaDavis,
      modifiedBy: commonUsers.davidBrown,
      registrationDate: new Date("2024-09-10T16:50:00Z"),
      modificationDate: new Date("2024-12-12T11:40:00Z"),
      numberOfCollections: 8,
      numberOfObjects: 156,
    },
  ],
};

/**
 * Project Overview for TEACH_LABS Space
 */
export const projectOverviewTeachLabs: ProjectOverview = {
  space: teachLabsSpace,
  projects: [
    {
      kind: "PROJECT",
      code: "OPTICS_GP",
      permId: "20200201100000301-8501" as OpenbisPermId,
      description: "Basic optics experiments for first-year students.",
      registratedBy: commonUsers.sophiaDavis,
      modifiedBy: commonUsers.mariaGarcia,
      registrationDate: new Date("2020-02-01T10:00:00Z"),
      modificationDate: new Date("2024-09-15T14:20:00Z"),
      numberOfCollections: 18,
      numberOfObjects: 420,
    },
    {
      kind: "PROJECT",
      code: "ELEC_GP",
      permId: "20210312111500302-8502" as OpenbisPermId,
      description: "Electronics lab experiments and measurement training.",
      registratedBy: commonUsers.mariaGarcia,
      modifiedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2021-03-12T11:15:00Z"),
      modificationDate: new Date("2024-10-22T09:40:00Z"),
      numberOfCollections: 14,
      numberOfObjects: 305,
    },
    {
      kind: "PROJECT",
      code: "MECH_LAB_2024",
      permId: "20240415130000303-8503" as OpenbisPermId,
      description: "Classical mechanics experiments and data analysis.",
      registratedBy: commonUsers.johnDoe,
      modifiedBy: commonUsers.mariaGarcia,
      registrationDate: new Date("2024-04-15T13:00:00Z"),
      modificationDate: new Date("2024-12-10T15:30:00Z"),
      numberOfCollections: 12,
      numberOfObjects: 278,
    },
    {
      kind: "PROJECT",
      code: "THERMO_LABS",
      permId: "20240601140000304-8504" as OpenbisPermId,
      description: "Thermodynamics and heat transfer experiments.",
      registratedBy: commonUsers.aliceWilson,
      modifiedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2024-06-01T14:00:00Z"),
      modificationDate: new Date("2024-11-28T12:15:00Z"),
      numberOfCollections: 10,
      numberOfObjects: 234,
    },
  ],
};

/**
 * Project Overview for STRUCTURAL_BIO Space
 */
export const projectOverviewStructBio: ProjectOverview = {
  space: structBioSpace,
  projects: [
    {
      kind: "PROJECT",
      code: "PROT_CRYSTAL",
      permId: "20230615100000401-9001" as OpenbisPermId,
      description: "Protein crystal structure determination and refinement.",
      registratedBy: commonUsers.mariaGarcia,
      modifiedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2023-06-15T10:00:00Z"),
      modificationDate: new Date("2024-12-15T11:30:00Z"),
      numberOfCollections: 11,
      numberOfObjects: 287,
    },
    {
      kind: "PROJECT",
      code: "CRYO_EM_2024",
      permId: "20240220134500402-9002" as OpenbisPermId,
      description: "Cryo-electron microscopy structure determination.",
      registratedBy: commonUsers.charlesLi,
      modifiedBy: commonUsers.janeDoe,
      registrationDate: new Date("2024-02-20T13:45:00Z"),
      modificationDate: new Date("2024-12-14T15:20:00Z"),
      numberOfCollections: 7,
      numberOfObjects: 156,
    },
    {
      kind: "PROJECT",
      code: "PROTEIN_DYNAMICS",
      permId: "20231110091500403-9003" as OpenbisPermId,
      description: "Molecular dynamics simulations and flexibility studies.",
      registratedBy: commonUsers.davidBrown,
      modifiedBy: commonUsers.charlesLi,
      registrationDate: new Date("2023-11-10T09:15:00Z"),
      modificationDate: new Date("2024-12-13T10:50:00Z"),
      numberOfCollections: 8,
      numberOfObjects: 198,
    },
  ],
};

/**
 * Project Overview for MATERIALS_SCI Space
 */
export const projectOverviewMatSci: ProjectOverview = {
  space: matSciSpace,
  projects: [
    {
      kind: "PROJECT",
      code: "POLYMER_CHAR",
      permId: "20230110142000501-10001" as OpenbisPermId,
      description: "Polymer characterization and thermal analysis.",
      registratedBy: commonUsers.aliceWilson,
      modifiedBy: commonUsers.mariaGarcia,
      registrationDate: new Date("2023-01-10T14:20:00Z"),
      modificationDate: new Date("2024-12-12T12:40:00Z"),
      numberOfCollections: 9,
      numberOfObjects: 221,
    },
    {
      kind: "PROJECT",
      code: "COMPOSITE_STUDY",
      permId: "20230705150000502-10002" as OpenbisPermId,
      description:
        "Fiber-reinforced composite mechanical and thermal properties.",
      registratedBy: commonUsers.johnDoe,
      modifiedBy: commonUsers.bobSmith,
      registrationDate: new Date("2023-07-05T15:00:00Z"),
      modificationDate: new Date("2024-12-11T16:25:00Z"),
      numberOfCollections: 6,
      numberOfObjects: 143,
    },
    {
      kind: "PROJECT",
      code: "METAL_ALLOYS",
      permId: "20240315103000503-10003" as OpenbisPermId,
      description: "Metal alloys characterization and phase analysis.",
      registratedBy: commonUsers.sophiaDavis,
      modifiedBy: commonUsers.davidBrown,
      registrationDate: new Date("2024-03-15T10:30:00Z"),
      modificationDate: new Date("2024-12-10T13:15:00Z"),
      numberOfCollections: 7,
      numberOfObjects: 165,
    },
  ],
};

/**
 * All project overviews by space code
 */
export const projectOverviewsBySpaceExtended = {
  NANO_LAB: projectOverviewNanoLab,
  ASTRO_DET: projectOverviewAstroDet,
  TEACH_LABS: projectOverviewTeachLabs,
  STRUCTURAL_BIO: projectOverviewStructBio,
  MATERIALS_SCI: projectOverviewMatSci,
};
