import { StateSchema } from 'app/providers/StoreProvider';

export const getSettingsModalIsLoading = (state: StateSchema) =>
  state?.settingsModal?.isLoading ?? false;

export const getSettingsModalError = (state: StateSchema) =>
  state?.settingsModal?.error ?? undefined;

export const getSettingsModalLogin = (state: StateSchema) =>
  state?.settingsModal?.login ?? '';

export const getSettingsModalPassword = (state: StateSchema) =>
  state?.settingsModal?.password ?? '';

export const getSettingsModalNewPassword = (state: StateSchema) =>
  state?.settingsModal?.newPass ?? '';

export const getSettingsModalConfirmPassword = (state: StateSchema) =>
  state?.settingsModal?.confirmPassword ?? '';

export const getSettingsModalRole = (state: StateSchema) =>
  state?.settingsModal?.role ?? undefined;

export const getSettingsModalLanguage = (state: StateSchema) =>
  state?.settingsModal?.language ?? undefined;
