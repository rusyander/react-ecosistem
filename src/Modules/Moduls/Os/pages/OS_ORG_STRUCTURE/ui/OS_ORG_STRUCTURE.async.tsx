import { lazy } from "react";

export const OS_ORG_STRUCTURE_Async = lazy(
  async () => await import("./OS_ORG_STRUCTURE")
);
