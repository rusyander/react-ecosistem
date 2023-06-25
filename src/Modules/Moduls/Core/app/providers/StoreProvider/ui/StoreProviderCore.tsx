import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchemaCore } from '../config/StateSchemaCore';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderCoreProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchemaCore>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchemaCore>>;
}

export const StoreProviderCore: FC<StoreProviderCoreProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const store = createReduxStore(
    initialState as StateSchemaCore,
    asyncReducers as ReducersMapObject<StateSchemaCore>
  );

  return <Provider store={store}>{children}</Provider>;
};
