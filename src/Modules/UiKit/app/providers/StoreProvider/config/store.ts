/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { StateSchemaUiKit, ThunkExtraArg } from './StateSchemaUiKit';
import { createReducerManager } from './reduserManaget';
import { NavigateOptions, To } from 'react-router-dom';
import { $api } from '../../../../shared/api/api';
import { BreadCrumbsReducer } from '../../../../features/BreadCrumbs';

export function createReduxStore(
  initialState?: StateSchemaUiKit,
  asyncReducers?: ReducersMapObject<StateSchemaUiKit>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReduser: ReducersMapObject<StateSchemaUiKit> = {
    ...asyncReducers,
    breadCrumps: BreadCrumbsReducer,
  };

  const reducerManager = createReducerManager(rootReduser);

  const extraArh: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchemaUiKit>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: extraArh,
        },
      });
    },
  });

  // @ts-expect-error
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatchUiKit = ReturnType<typeof createReduxStore>['dispatch'];
