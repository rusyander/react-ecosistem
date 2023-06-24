import { Story } from '@storybook/react';
import { StoreProviderCore } from '../../../../app/providers/StoreProvider';
import { StateSchemaCore } from '../../../../app/providers/StoreProvider/config/StateSchemaCore';
// import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModalLoader';
import { BreadCrumbsReducer } from 'Modules/UiKit';
import { ReducersList } from '../../../lib/components/DynamicModuleLoader/DynamicModalLoader';

const defaultAsyncReducers: ReducersList = {
  breadCrumbs: BreadCrumbsReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchemaCore>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProviderCore
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProviderCore>
    );
