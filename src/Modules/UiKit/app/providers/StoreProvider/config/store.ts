/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reduserManaget";
import { NavigateOptions, To } from "react-router-dom";
import { $api } from "../../../../shared/api/api";
import { BreadCrumbsReducer } from "../../../../features/BreadCrumbs";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReduser: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    breadCrumps: BreadCrumbsReducer,
  };

  const reducerManager = createReducerManager(rootReduser);

  const extraArh: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
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

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
