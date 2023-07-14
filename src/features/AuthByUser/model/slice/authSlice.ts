import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';
import { authByUser } from '../services/loginByUserName/authByUser';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: AuthSchema = {
  isLoading: false,
  password: '',
  login: '',
  error: '',
  userData: undefined,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginName: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setAuth: (state) => {
      // state.password = action.payload;
      // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(true));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authByUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(authByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
        console.log('asasasas', state.userData);
      })
      .addMatcher(asError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        console.log('action.payload', action.payload);

        state.error = action.payload;
      });
  },
});

export const { actions: AuthSliceActions } = AuthSlice;
export const { reducer: AuthSliceReducer } = AuthSlice;

function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
