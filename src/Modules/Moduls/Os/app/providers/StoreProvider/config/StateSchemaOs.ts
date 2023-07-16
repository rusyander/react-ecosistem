import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { rtkApi } from "../../../../shared/api/rtkApi";
import { BreadCrumbsSchema } from "Modules/UiKit";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";

export interface StateSchemaOs {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  // breadCrumbs: BreadCrumbsSchema;
  // async redusers
  // profile?: ProfileSchema;
}

export type StateSchemaOsKey = keyof StateSchemaOs;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchemaOs>;
  reduce: (
    state: StateSchemaOs,
    action: AnyAction
  ) => CombinedState<StateSchemaOs>;
  add: (key: StateSchemaOsKey, reducer: Reducer) => void;
  remove: (key: StateSchemaOsKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchemaOs> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  dispatch?: Dispatch;
  state: StateSchemaOs;
}
