import { StateSchemaUiKit } from './../../../../../app/providers/StoreProvider/config/StateSchemaUiKit';

export const getPathList = (state: StateSchemaUiKit) =>
  state.breadCrumps?.pathList || [];
