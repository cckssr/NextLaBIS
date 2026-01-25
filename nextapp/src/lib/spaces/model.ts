import { OpenbisProject, OpenbisSpace } from "@/lib/model/OpenBISModel";

type ProjectTable = OpenbisProject & {
  // Extend with additional properties if needed
  numberOfCollections: number;
  numberOfObjects: number;
};

export type SpaceOverview = {
  space: OpenbisSpace;
  projects: Array<ProjectTable>;
};
