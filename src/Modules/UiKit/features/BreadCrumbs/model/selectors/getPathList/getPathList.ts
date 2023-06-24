import { BreadCrumbsSchema } from '../../types/breadCrumbsSchema';

// export const getPathList = (state: BreadCrumbsSchema) =>
//   state.breadCrumps?.pathList || [];

export const getPathList = (state: BreadCrumbsSchema) => state.pathList || [];
