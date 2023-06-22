export type { BreadCrumbsSchema, Paths } from "./model/types/breadCrumbsSchema";
export {
  BreadCrumbsActions,
  BreadCrumbsReducer,
} from "./model/slice/breadCrumbs";
export { getPathList } from "./model/selectors/getPathList/getPathList";
export { BreadCrumbs } from "./ui/BreadCrumbs";
