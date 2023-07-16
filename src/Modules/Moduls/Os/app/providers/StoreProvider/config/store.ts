/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from "@reduxjs/toolkit";
import { StateSchemaOs, ThunkExtraArg } from "./StateSchemaOs";
import { createReducerManager } from "./reduserManaget";
import { $api } from "shared/api/api";
import { NavigateOptions, To } from "react-router-dom";
import { rtkApi } from "../../../../shared/api/rtkApi";

export function createReduxStore(
  initialState?: StateSchemaOs,
  asyncReducers?: ReducersMapObject<StateSchemaOs>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReduser: ReducersMapObject<StateSchemaOs> = {
    ...asyncReducers,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReduser);

  const extraArh: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchemaOs>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: extraArh,
        },
      }).concat(rtkApi.middleware);
    },
  });

  // @ts-expect-error
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
