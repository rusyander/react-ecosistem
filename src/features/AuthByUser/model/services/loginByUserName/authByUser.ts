import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserData } from '../../types/authSchema';
import { UserActions } from 'entities/User';

interface AuthByUserProps {
  login: string;
  password: string;
}

export const authByUser = createAsyncThunk<
  UserData,
  AuthByUserProps,
  ThunkConfig<string>
>(
  'auth/authByUser',
  async ({ login, password }, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<UserData>(
        '/api/core/security/login',
        {
          login,
          password,
          lang: 1,
        }
      );

      if (response.data.result !== '1') {
        console.log('response.data', response.data);

        // @ts-ignore
        return rejectWithValue(response?.data?.data[0].message);
      }

      const localStorageData: any = {
        userId: response.data.data?.userId,
        loginId: response.data.data?.loginId,
        orgId: -1,
        lang: '1',
      };

      console.log('localStorageData', JSON.stringify(localStorageData));

      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify(localStorageData)
      );
      dispatch(UserActions.setAuthData(response?.data));
      return response.data;
    } catch (e) {
      console.log(e);
      // return rejectWithValue('error');
      return rejectWithValue('error');
    }
  }
);
