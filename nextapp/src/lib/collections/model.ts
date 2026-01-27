import { OpenbisCollection, OpenbisProject } from "@/lib/model/OpenBISModel";

type CollectionTable = OpenbisCollection & {
  // Extend with additional properties if needed
  numberOfObjects: number;
};

export type CollectionOverview = {
  project: OpenbisProject;
  collections: Array<CollectionTable>;
};
