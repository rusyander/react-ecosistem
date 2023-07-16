import {
  AnyAction,
  ReducersMapObject,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import {
  ReducerManager,
  StateSchemaOs,
  StateSchemaOsKey,
} from "./StateSchemaOs";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchemaOs>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaOsKey[] = [];
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchemaOs, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };

        keysToRemove.forEach((key: StateSchemaOsKey) => {
          // @ts-ignore
          delete state[key];
        });

        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaOsKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      // @ts-ignore
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaOsKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      // @ts-ignore
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
