import { Story } from "@storybook/react";
import { StoreProviderOs } from "../../../../app/providers/StoreProvider";
import { StateSchemaOs } from "../../../../app/providers/StoreProvider/config/StateSchemaOs";
import { ReducersList } from "../../../lib/components/DynamicModuleLoader/DynamicModalLoader";

const defaultAsyncReducers: ReducersList = {};

export const StoreDecorator =
  (state: DeepPartial<StateSchemaOs>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProviderOs
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProviderOs>
    );
