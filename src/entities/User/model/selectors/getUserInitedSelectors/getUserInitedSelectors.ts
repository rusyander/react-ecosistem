import { StateSchema } from 'app/providers/StoreProvider';

export const getUserInitedSelectors = (state: StateSchema) =>
  state.user._inited;
