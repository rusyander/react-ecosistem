import { StateSchema } from 'app/providers/StoreProvider';

export const globalData = (state: StateSchema) =>
  state?.user?.globalData ?? undefined;
