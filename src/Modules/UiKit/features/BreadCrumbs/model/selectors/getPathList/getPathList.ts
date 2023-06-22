import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPathList = (state: StateSchema) =>
  state.breadCrumps?.pathList || [];
