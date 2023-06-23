import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchemaUiKit } from '../config/StateSchemaUiKit';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderUiKitProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchemaUiKit>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchemaUiKit>>;
}

export const StoreProviderUiKit: FC<StoreProviderUiKitProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const store = createReduxStore(
    initialState as StateSchemaUiKit,
    asyncReducers as ReducersMapObject<StateSchemaUiKit>
  );

  return <Provider store={store}>{children}</Provider>;
};
