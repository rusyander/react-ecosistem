import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

import { BreadCrumbsSchema } from '../../../../features/BreadCrumbs';

export interface StateSchemaUiKit {
  breadCrumps: BreadCrumbsSchema;
}

export type StateSchemaUiKitKey = keyof StateSchemaUiKit;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchemaUiKit>;
  reduce: (
    state: StateSchemaUiKit,
    action: AnyAction
  ) => CombinedState<StateSchemaUiKit>;
  add: (key: StateSchemaUiKitKey, reducer: Reducer) => void;
  remove: (key: StateSchemaUiKitKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchemaUiKit> {
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
  state: StateSchemaUiKit;
}
