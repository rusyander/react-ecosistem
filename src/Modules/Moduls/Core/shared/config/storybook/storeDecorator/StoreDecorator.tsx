import { Story } from '@storybook/react';
import { StoreProvider2 } from 'Modules/Moduls/Core/app/providers/StoreProvider';
// import { StoreProvider2 } from '../../../../app/providers/StoreProvider/ui/StoreProvider2';
import { StateSchema } from 'app/providers/StoreProvider';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModalLoader';

const defaultAsyncReducers: ReducersList = {};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider2
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider2>
    );
