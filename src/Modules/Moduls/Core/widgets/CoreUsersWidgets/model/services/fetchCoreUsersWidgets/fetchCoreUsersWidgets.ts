import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import i18next from 'i18next';

interface CoreUsersWidgetsProps {}

export const fetchCoreUsersWidgets = createAsyncThunk<
  any,
  CoreUsersWidgetsProps,
  ThunkConfig<string>
>('coreUsersWidgets/fetchCoreUsersWidgets', async (_, thunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkApi;

  try {
    const response = await extra.api.post<any>('/***', {});
    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(i18next.t('ERROR'));
  }
});
