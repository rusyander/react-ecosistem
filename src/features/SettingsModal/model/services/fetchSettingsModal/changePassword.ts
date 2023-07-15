import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import i18next from 'i18next';
import {
  getSettingsModalLogin,
  getSettingsModalPassword,
  getSettingsModalNewPassword,
  getSettingsModalConfirmPassword,
} from '../../selectors/getSettingsModal/getSettingsModal';

interface SettingsModalProps {
  id?: string;
}

export const changePassword = createAsyncThunk<
  void,
  SettingsModalProps,
  ThunkConfig<string>
>('settingsModal/changePassword', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const login = getSettingsModalLogin(getState());
  const password = getSettingsModalPassword(getState());
  const newPassword = getSettingsModalNewPassword(getState());
  const confirmPassword = getSettingsModalConfirmPassword(getState());

  if (password === confirmPassword) {
    return rejectWithValue('Новый пароль должен отличаться от старого');
  }
  if (newPassword !== confirmPassword) {
    return rejectWithValue(
      'Новый пароль и Подтверждение пароля должны быть одинаковыми'
    );
  }

  try {
    const response = await extra.api.post('/api/core/user/changePassword', {
      lang: 1,
      login: login,
      newPassword: newPassword,
      password: password,
    });
    // if (!response.data) throw new Error();

    console.log('response', response);

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
