import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: LoginSchema = {
  isLoading: false,
  password: '',
  username: '',
  error: '',
};

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setAuth: (state) => {
      // state.password = action.payload;
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(true));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUserName.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginByUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        // state.password = action.payload.password;
        state.username = action.payload.username;
      })
      //   .addCase(loginByUserName.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   });
      .addMatcher(asError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: LoginActions } = LoginSlice;
export const { reducer: LoginReducer } = LoginSlice;

function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
