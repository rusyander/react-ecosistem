import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import { LoginReducer } from 'features/AuthByUserName/model/slice/loginSlice';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModalLoader';

const defaultAsyncReducers: ReducersList | any = {
  loginForm: LoginReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
