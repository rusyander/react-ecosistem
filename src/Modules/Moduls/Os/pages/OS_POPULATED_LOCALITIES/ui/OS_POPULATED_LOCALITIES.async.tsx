import { lazy } from "react";

export const OS_POPULATED_LOCALITIES_Async = lazy(
  async () => await import("./OS_POPULATED_LOCALITIES")
);
