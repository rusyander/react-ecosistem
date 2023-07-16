import { lazy } from "react";

export const OS_COUNTRIES_Async = lazy(
  async () => await import("./OS_COUNTRIES")
);
