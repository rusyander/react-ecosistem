import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { rtkApi } from '../../../../shared/api/rtkApi';
import { BreadCrumbsSchema } from 'Modules/UiKit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchemaCore {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  breadCrumbs: BreadCrumbsSchema;
  // async redusers
  // profile?: ProfileSchema;
}

export type StateSchemaCoreKey = keyof StateSchemaCore;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchemaCore>;
  reduce: (
    state: StateSchemaCore,
    action: AnyAction
  ) => CombinedState<StateSchemaCore>;
  add: (key: StateSchemaCoreKey, reducer: Reducer) => void;
  remove: (key: StateSchemaCoreKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchemaCore> {
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
  state: StateSchemaCore;
}
