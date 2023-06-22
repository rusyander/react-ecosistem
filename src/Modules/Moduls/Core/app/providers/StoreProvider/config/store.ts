/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { StateSchema2, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reduserManaget';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
  initialState?: StateSchema2,
  asyncReducers?: ReducersMapObject<StateSchema2>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReduser: ReducersMapObject<StateSchema2> = {
    ...asyncReducers,
    // counter: CounterReducer,
    // user: UserReducer,

    // loginForm: LoginReducer,
    // articleDetails: ArticleDetailsReducer,
  };

  const reducerManager = createReducerManager(rootReduser);

  const extraArh: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema2>>,
    devTools: __IS_DEV__,
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

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];