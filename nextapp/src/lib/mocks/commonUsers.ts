/**
 * Shared mock user definitions used across all mock data files
 * Ensures consistency in user attribution throughout the hierarchy
 */

import { OpenbisUser } from "../model/OpenBISModel";

export const commonUsers = {
  johnDoe: {
    userPermId: "john.doe",
    userId: "john.doe",
    firstName: "Dr.",
    lastName: "Doe",
  } as OpenbisUser,
  janeDoe: {
    userPermId: "jane.doe",
    userId: "jane.doe",
    firstName: "Prof.",
    lastName: "Doe",
  } as OpenbisUser,
  bobSmith: {
    userPermId: "bob.smith",
    userId: "bob.smith",
    firstName: "Dr.",
    lastName: "Smith",
  } as OpenbisUser,
  aliceWilson: {
    userPermId: "alice.wilson",
    userId: "alice.wilson",
    firstName: "Dr.",
    lastName: "Wilson",
  } as OpenbisUser,
  charlesLi: {
    userPermId: "charles.li",
    userId: "charles.li",
    firstName: "Prof.",
    lastName: "Li",
  } as OpenbisUser,
  mariaGarcia: {
    userPermId: "maria.garcia",
    userId: "maria.garcia",
    firstName: "Dr.",
    lastName: "Garcia",
  } as OpenbisUser,
  davidBrown: {
    userPermId: "david.brown",
    userId: "david.brown",
    firstName: "Dr.",
    lastName: "Brown",
  } as OpenbisUser,
  sophiaDavis: {
    userPermId: "sophia.davis",
    userId: "sophia.davis",
    firstName: "Prof.",
    lastName: "Davis",
  } as OpenbisUser,
};
