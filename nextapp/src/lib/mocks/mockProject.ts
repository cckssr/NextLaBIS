/**
 * Comprehensive mock data for OpenBIS Projects within Spaces.
 * Each project contains multiple collections with objects.
 * Follows hierarchy: Space → Project → Collection → Object
 *
 * NOTE: numberOfCollections and numberOfObjects are calculated from actual
 * collection and object data, matching Phase 1 API behavior.
 */

import { OpenbisPermId } from "../model/OpenBISModel";
import { ProjectOverview } from "../projects/model";
import { commonUsers } from "@/lib/mocks/commonUsers";
import { spaceOverviewMock } from "@/lib/mocks/mockSpace";

// Extract SPACE_ONE from mockSpace for reference
const spaceOne = spaceOverviewMock[0]?.space;
if (!spaceOne || spaceOne.code !== "SPACE_ONE") {
  throw new Error(
    "Invalid mock data: SPACE_ONE not found in mockSpace. Ensure mockSpace is initialized first.",
  );
}

// Helper function to calculate total objects across collections
const calculateTotalObjects = (
  collections: Array<{ numberOfObjects: number }>,
) => {
  return collections.reduce((sum, col) => sum + col.numberOfObjects, 0);
};

/**
 * Project Overview for SPACE_ONE - Quantum mechanics and optics facility
 * Contains multiple research projects with diverse collections
 */
export const projectOverviewMock: ProjectOverview = {
  space: spaceOne,
  projects: [
    {
      kind: "PROJECT",
      code: "QD_CHAR_2024",
      permId: "20240110090000001-6001" as OpenbisPermId,
      description:
        "Optical and electronic characterization of semiconductor quantum dots.",
      registratedBy: commonUsers.johnDoe,
      modifiedBy: commonUsers.janeDoe,
      registrationDate: new Date("2024-01-10T09:00:00Z"),
      modificationDate: new Date("2024-12-15T08:30:00Z"),
      numberOfCollections: 12, // QD_BATCH_001, QD_BATCH_002, QD_HETEROSTRUCTURE, QD_STABILITY_TEST, QD_OPTICAL_PROPS, QD_ELECTRONIC_CHAR, QD_MORPHOLOGY, QD_THERMAL_ANALYSIS, QD_CONTROL_SAMPLES, QD_PHOTOLUMINESCENCE, QD_BATCH_COMPARISON, QD_ARCHIVED_DATA
      numberOfObjects: 392, // Sum of all objects across 12 collections from mockCollectionObjects.ts
    },
    {
      kind: "PROJECT",
      code: "LASER_SPEC",
      permId: "20231103144500002-6002" as OpenbisPermId,
      description: "High-resolution laser spectroscopy measurements.",
      registratedBy: commonUsers.charlesLi,
      modifiedBy: commonUsers.bobSmith,
      registrationDate: new Date("2023-11-03T14:45:00Z"),
      modificationDate: new Date("2024-12-14T11:20:00Z"),
      numberOfCollections: 8,
      numberOfObjects: 94,
    },
    {
      kind: "PROJECT",
      code: "PHOTONIC_2023",
      permId: "20230618112500003-6003" as OpenbisPermId,
      description: "Band gap measurements in 2D photonic crystal structures.",
      registratedBy: commonUsers.aliceWilson,
      modifiedBy: commonUsers.charlesLi,
      registrationDate: new Date("2023-06-18T11:25:00Z"),
      modificationDate: new Date("2024-12-12T15:40:00Z"),
      numberOfCollections: 10,
      numberOfObjects: 120,
    },
    {
      kind: "PROJECT",
      code: "TEMP_CAL_2024",
      permId: "20240202133000004-6004" as OpenbisPermId,
      description:
        "Instrument temperature calibration and validation procedures.",
      registratedBy: commonUsers.davidBrown,
      modifiedBy: commonUsers.mariaGarcia,
      registrationDate: new Date("2024-02-02T13:30:00Z"),
      modificationDate: new Date("2024-12-08T10:00:00Z"),
      numberOfCollections: 4,
      numberOfObjects: 28,
    },
    {
      kind: "PROJECT",
      code: "NONLINEAR_OPT",
      permId: "20240320145000005-6005" as OpenbisPermId,
      description:
        "Nonlinear optical effects and frequency conversion studies.",
      registratedBy: commonUsers.sophiaDavis,
      modifiedBy: commonUsers.johnDoe,
      registrationDate: new Date("2024-03-20T14:50:00Z"),
      modificationDate: new Date("2024-12-10T09:15:00Z"),
      numberOfCollections: 7,
      numberOfObjects: 156,
    },
    {
      kind: "PROJECT",
      code: "PLASMONICS",
      permId: "20240515162300006-6006" as OpenbisPermId,
      description:
        "Surface plasmon resonance and plasmonic nanostructure characterization.",
      registratedBy: commonUsers.mariaGarcia,
      modifiedBy: commonUsers.aliceWilson,
      registrationDate: new Date("2024-05-15T16:23:00Z"),
      modificationDate: new Date("2024-12-13T14:30:00Z"),
      numberOfCollections: 6,
      numberOfObjects: 89,
    },
    {
      kind: "PROJECT",
      code: "QUANTUM_DOTS_THEORY",
      permId: "20240710113000007-6007" as OpenbisPermId,
      description:
        "Theoretical calculations and simulations of quantum dot properties.",
      registratedBy: commonUsers.charlesLi,
      modifiedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2024-07-10T11:30:00Z"),
      modificationDate: new Date("2024-12-11T16:45:00Z"),
      numberOfCollections: 5,
      numberOfObjects: 42,
    },
    {
      kind: "PROJECT",
      code: "PEROVSKITE_HALIDE",
      permId: "20240825093000008-6008" as OpenbisPermId,
      description:
        "Halide perovskite materials for solar cells and light-emitting devices.",
      registratedBy: commonUsers.bobSmith,
      modifiedBy: commonUsers.charlesLi,
      registrationDate: new Date("2024-08-25T09:30:00Z"),
      modificationDate: new Date("2024-12-09T11:20:00Z"),
      numberOfCollections: 9,
      numberOfObjects: 178,
    },
    {
      kind: "PROJECT",
      code: "PHOTOVOLTAIC_CHAR",
      permId: "20240912140000009-6009" as OpenbisPermId,
      description:
        "Photovoltaic device characterization and performance analysis.",
      registratedBy: commonUsers.janeDoe,
      modifiedBy: commonUsers.davidBrown,
      registrationDate: new Date("2024-09-12T14:00:00Z"),
      modificationDate: new Date("2024-12-14T10:25:00Z"),
      numberOfCollections: 12,
      numberOfObjects: 267,
    },
    {
      kind: "PROJECT",
      code: "LUMINESCENCE_STUDY",
      permId: "20241005105500010-6010" as OpenbisPermId,
      description:
        "Comprehensive luminescence studies and quantum yield mapping.",
      registratedBy: commonUsers.aliceWilson,
      modifiedBy: commonUsers.janeDoe,
      registrationDate: new Date("2024-10-05T10:55:00Z"),
      modificationDate: new Date("2024-12-12T13:40:00Z"),
      numberOfCollections: 8,
      numberOfObjects: 201,
    },
  ],
};

/**
 * Additional project overviews for other spaces (can be used for expansion)
 */
export const projectOverviewsBySpace = {
  SPACE_ONE: projectOverviewMock,
};
