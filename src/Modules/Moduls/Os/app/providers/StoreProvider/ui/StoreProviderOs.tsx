import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchemaOs } from "../config/StateSchemaOs";
import { ReducersMapObject } from "@reduxjs/toolkit";

interface StoreProviderOsProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchemaOs>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchemaOs>>;
}

export const StoreProviderOs: FC<StoreProviderOsProps> = ({
  children,
  initialState,
  asyncReducers,
}) => {
  const store = createReduxStore(
    initialState as StateSchemaOs,
    asyncReducers as ReducersMapObject<StateSchemaOs>
  );

  return <Provider store={store}>{children}</Provider>;
};
