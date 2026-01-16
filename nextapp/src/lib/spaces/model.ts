export type SpaceOverview = {
  space: {
    code: string;
    name?: string; // if you have one; otherwise code is the name
    description?: string | null;
    frozen: boolean;
    frozenForProjects?: boolean;
    frozenForObjects?: boolean;
    registrationDate?: number | null;
    modificationDate?: number | null;
  };
  projects: Array<{
    code: string;
    description?: string | null;
    registrationDate?: number | null;
    modificationDate?: number | null;
  }>;
};
