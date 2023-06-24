import {
  AnyAction,
  ReducersMapObject,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import {
  ReducerManager,
  StateSchemaCore,
  StateSchemaCoreKey,
} from './StateSchemaCore';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchemaCore>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaCoreKey[] = [];
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchemaCore, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };

        keysToRemove.forEach((key: StateSchemaCoreKey) => {
          // @ts-ignore
          delete state[key];
        });

        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaCoreKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      // @ts-ignore
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaCoreKey) => {
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
