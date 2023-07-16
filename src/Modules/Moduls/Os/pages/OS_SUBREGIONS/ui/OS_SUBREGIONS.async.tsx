import { lazy } from "react";

export const OS_SUBREGIONS_Async = lazy(
  async () => await import("./OS_SUBREGIONS")
);
