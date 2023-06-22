import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema2 } from '../config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema2>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema2>>;
}

export const StoreProvider2: FC<StoreProviderProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  // const navigate = useNavigate();

  const store = createReduxStore(
    initialState as StateSchema2,
    asyncReducers as ReducersMapObject<StateSchema2>
    // navigate
  );

  return <Provider store={store}>{children}</Provider>;
};
