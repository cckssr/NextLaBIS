import { SpaceOverview } from "@/lib/spaces/model";
import { OpenbisPermId } from "../model/OpenBISModel";
import { commonUsers } from "./commonUsers";

export const spaceOverviewMock = [
  {
    space: {
      kind: "SPACE",
      code: "SPACE_ONE",
      permId: "20231208165028539-6938" as OpenbisPermId,
      description:
        "Quantum mechanics and optics research facility for advanced physics experiments.",
      registratedBy: commonUsers.johnDoe,
      registrationDate: new Date("2023-01-15T10:12:00Z"),
      modificationDate: new Date("2024-12-15T08:30:00Z"),
    },

    projects: [
      {
        kind: "PROJECT",
        code: "QD_CHAR_2024",
        permId: "/SPACE_ONE/QD_CHAR_2024" as OpenbisPermId,
        description:
          "Optical and electronic characterization of semiconductor quantum dots.",
        registratedBy: commonUsers.johnDoe,
        modifiedBy: commonUsers.janeDoe,
        registrationDate: new Date("2024-01-10T09:00:00Z"),
        modificationDate: new Date("2024-12-15T08:30:00Z"),
        numberOfCollections: 12,
        numberOfObjects: 156,
      },
      {
        kind: "PROJECT",
        code: "LASER_SPEC",
        permId: "/SPACE_ONE/LASER_SPEC" as OpenbisPermId,
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
        permId: "/SPACE_ONE/PHOTONIC_2023" as OpenbisPermId,
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
        permId: "/SPACE_ONE/TEMP_CAL_2024" as OpenbisPermId,
        description:
          "Instrument temperature calibration and validation procedures.",
        registratedBy: commonUsers.davidBrown,
        modifiedBy: commonUsers.mariaGarcia,
        registrationDate: new Date("2024-02-02T13:30:00Z"),
        modificationDate: new Date("2024-12-08T10:00:00Z"),
        numberOfCollections: 4,
        numberOfObjects: 28,
      },
    ],
  } satisfies SpaceOverview,
  {
    space: {
      kind: "SPACE",
      code: "NANO_LAB",
      permId: "20240112111233456-1023" as OpenbisPermId,
      description:
        "Nanofabrication and surface analysis laboratory focusing on thin films and nanostructures.",
      registratedBy: commonUsers.aliceWilson,
      registrationDate: new Date("2022-10-05T09:20:00Z"),
      modificationDate: new Date("2024-12-10T16:45:00Z"),
    },

    projects: [
      {
        kind: "PROJECT",
        code: "AFM_SURF_2024",
        permId: "/NANO_LAB/AFM_SURF_2024" as OpenbisPermId,
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
        permId: "/NANO_LAB/THINFILM_ALD" as OpenbisPermId,
        description: "Atomic layer deposition of oxide thin films.",
        registratedBy: commonUsers.bobSmith,
        modifiedBy: commonUsers.aliceWilson,
        registrationDate: new Date("2023-03-14T11:40:00Z"),
        modificationDate: new Date("2024-11-28T14:05:00Z"),
        numberOfCollections: 9,
        numberOfObjects: 142,
      },
    ],
  } satisfies SpaceOverview,
  {
    space: {
      kind: "SPACE",
      code: "ASTRO_DET",
      permId: "20240203104555999-3312" as OpenbisPermId,
      description:
        "Astroparticle physics space for detector development and cosmic-ray measurements.",
      registratedBy: commonUsers.charlesLi,
      registrationDate: new Date("2021-04-12T08:00:00Z"),
      modificationDate: new Date("2024-12-18T18:10:00Z"),
    },

    projects: [
      {
        kind: "PROJECT",
        code: "COSMIC_MUONS",
        permId: "/ASTRO_DET/COSMIC_MUONS" as OpenbisPermId,
        description:
          "Long-term muon rate measurements with scintillator arrays.",
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
        permId: "/ASTRO_DET/DAQ_CAL" as OpenbisPermId,
        description: "Calibration and validation of DAQ electronics.",
        registratedBy: commonUsers.davidBrown,
        modifiedBy: commonUsers.charlesLi,
        registrationDate: new Date("2023-05-20T15:10:00Z"),
        modificationDate: new Date("2024-12-01T10:35:00Z"),
        numberOfCollections: 5,
        numberOfObjects: 67,
      },
    ],
  } satisfies SpaceOverview,
  {
    space: {
      kind: "SPACE",
      code: "TEACH_LABS",
      permId: "20231122153000421-7781" as OpenbisPermId,
      description:
        "Teaching laboratory space for undergraduate physics practical courses.",
      registratedBy: commonUsers.sophiaDavis,
      registrationDate: new Date("2020-01-08T09:00:00Z"),
      modificationDate: new Date("2024-11-30T12:00:00Z"),
    },

    projects: [
      {
        kind: "PROJECT",
        code: "OPTICS_GP",
        permId: "/TEACH_LABS/OPTICS_GP" as OpenbisPermId,
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
        permId: "/TEACH_LABS/ELEC_GP" as OpenbisPermId,
        description: "Electronics lab experiments and measurement training.",
        registratedBy: commonUsers.mariaGarcia,
        modifiedBy: commonUsers.sophiaDavis,
        registrationDate: new Date("2021-03-12T11:15:00Z"),
        modificationDate: new Date("2024-10-22T09:40:00Z"),
        numberOfCollections: 14,
        numberOfObjects: 305,
      },
    ],
  } satisfies SpaceOverview,
];
