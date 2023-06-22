import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginUsernameProps {
  username: string;
  password: string;
}

export const loginByUserName = createAsyncThunk<
User,
LoginUsernameProps,
ThunkConfig<string>
>(
  'login/loginByUserName',
  async ({ username, password }, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', {
        username,
        password,
      });

      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify(response.data)
      );
      dispatch(UserActions.setAuthData(response.data));

      // extra.navigate('/profile');
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  }
);
