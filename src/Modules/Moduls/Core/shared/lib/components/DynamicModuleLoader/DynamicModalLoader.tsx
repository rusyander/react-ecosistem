import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaCoreKey } from '../../../../app/providers/StoreProvider/config/StateSchemaCore';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
// import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaCoreKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmaunt?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, removeAfterUnmaunt = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      // @ts-ignore
      store.reducerManager.add(name as StateSchemaCoreKey, reducer);
      dispatch({ type: `@Init- ${name} reduser` });
    });

    return () => {
      if (removeAfterUnmaunt) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          // @ts-ignore
          store.reducerManager.remove(name as StateSchemaCoreKey);
          dispatch({ type: `@Destroy- ${name} reduser` });
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
