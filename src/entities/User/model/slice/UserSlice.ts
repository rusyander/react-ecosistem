import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: UserSchema = {
  _inited: false,
  isAuth: false,
  authData: undefined,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      // @ts-ignore
      if (state.authData?.result === '1') {
        state._inited = true;
      } else {
        state._inited = false;
      }
    },
    logout: (state) => {
      state.authData = undefined;
      state.isAuth = false;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      localStorage.removeItem('user');
      state._inited = false;
    },
  },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
