import { SpaceOverview } from "@/lib/spaces/model";
import { OpenbisPermId, OpenbisUser } from "../model/OpenBISModel";

export const spaceOverviewMock = {
  space: {
    kind: "SPACE",
    code: "SPACE_ONE",
    permId: "20231208165028539-6938" as OpenbisPermId,
    description:
      "Quantum mechanics and optics research facility for advanced physics experiments.",
    registratedBy: {
      userPermId: "john.johnson",
      userId: "john.johnson",
      firstName: "Dr. John",
      lastName: "Johnson",
    } as OpenbisUser,
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
      registratedBy: {
        userPermId: "john.johnson",
        userId: "john.johnson",
        firstName: "Dr. John",
        lastName: "Johnson",
      } as OpenbisUser,
      modifiedBy: {
        userPermId: "jane.smith",
        userId: "jane.smith",
        firstName: "Dr. Jane",
        lastName: "Smith",
      } as OpenbisUser,
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
      registratedBy: {
        userPermId: "anderson",
        userId: "anderson",
        firstName: "Prof.",
        lastName: "Anderson",
      } as OpenbisUser,
      modifiedBy: {
        userPermId: "miller",
        userId: "miller",
        firstName: "Dr.",
        lastName: "Miller",
      } as OpenbisUser,
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
      registratedBy: {
        userPermId: "lee",
        userId: "lee",
        firstName: "Dr.",
        lastName: "Lee",
      } as OpenbisUser,
      modifiedBy: {
        userPermId: "kim",
        userId: "kim",
        firstName: "Dr.",
        lastName: "Kim",
      } as OpenbisUser,
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
      registratedBy: {
        userPermId: "johnson",
        userId: "johnson",
        firstName: "Dr.",
        lastName: "Johnson",
      } as OpenbisUser,
      modifiedBy: {
        userPermId: "williams",
        userId: "williams",
        firstName: "Dr.",
        lastName: "Williams",
      } as OpenbisUser,
      registrationDate: new Date("2024-02-02T13:30:00Z"),
      modificationDate: new Date("2024-12-08T10:00:00Z"),
      numberOfCollections: 4,
      numberOfObjects: 28,
    },
  ],
} satisfies SpaceOverview;
