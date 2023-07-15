import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { BreadCrumbsSchema } from 'Modules/UiKit';
import { AxiosInstance } from 'axios';
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthByUser';
import { SettingsModalSchema } from 'features/SettingsModal';
import { NavigateOptions, To } from 'react-router-dom';
import { rtkApi } from 'shared/api/rtkApi';

export interface StateSchema {
  user: UserSchema;
  auth: AuthSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  breadCrumbs: BreadCrumbsSchema;
  settingsModal?: SettingsModalSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
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
  state: StateSchema;
}
