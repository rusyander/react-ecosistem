import { Reducer } from '@reduxjs/toolkit';

import { useEffect, ReactNode } from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  ReduxStoreWithManager,
  StateSchemaUiKitKey,
} from '../../../app/providers/StoreProvider/config/StateSchemaUiKit';

export type ReducersList = {
  [name in StateSchemaUiKitKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmaunt?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmaunt } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaUiKitKey, reducer);
      dispatch({ type: `@Init- ${name} reduser` });
    });

    return () => {
      if (removeAfterUnmaunt) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaUiKitKey);
          dispatch({ type: `@Destroy- ${name} reduser` });
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
