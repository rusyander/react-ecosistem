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

export interface StateSchema2 {
  // counter: CounterSchema;
  // user: UserSchema;
  // async redusers
  // profile?: ProfileSchema;
  // loginForm?: LoginSchema;
  // articleDetails?: ArticleDetailsSchema;
  // articleDetailsComments?: ArticleDetailsPageComponentSchema;
  // addCommentForm?: AddCommentFormSchema;
  // articlesPage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateSchema2;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema2>;
  reduce: (
    state: StateSchema2,
    action: AnyAction
  ) => CombinedState<StateSchema2>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema2> {
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
  state: StateSchema2;
}
