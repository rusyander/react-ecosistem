import { StateSchema } from 'app/providers/StoreProvider';

export const getSettingsModalIsLoading = (state: StateSchema) =>
  state.SettingsModal.isLoading ?? false;
export const getSettingsModalError = (state: StateSchema) =>
  state.SettingsModal.error ?? undefined;
