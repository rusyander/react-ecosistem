import {
  AnyAction,
  ReducersMapObject,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import {
  ReducerManager,
  StateSchemaUiKit,
  StateSchemaUiKitKey,
} from './StateSchemaUiKit';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchemaUiKit>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaUiKitKey[] = [];
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchemaUiKit, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key: StateSchemaUiKitKey) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete state[key];
        });

        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaUiKitKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaUiKitKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
