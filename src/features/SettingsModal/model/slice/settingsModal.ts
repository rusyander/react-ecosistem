import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changePassword } from '../services/fetchSettingsModal/changePassword';
import { SettingsModalSchema } from '../types/settingsModal';
import { UserRoles } from 'shared/types/ititType';

const initialState: SettingsModalSchema = {
  isLoading: false,
  error: undefined,

  login: '',
  confirmPassword: '',
  newPass: '',
  password: '',

  language: undefined,
  role: undefined,
};

export const settingsModalSlice = createSlice({
  name: 'settingsModal',
  initialState,
  reducers: {
    setLogin: (state, { payload }: PayloadAction<string>) => {
      state.login = payload;
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.password = payload;
    },
    setNewPassword: (state, { payload }: PayloadAction<string>) => {
      state.newPass = payload;
    },
    setConfirmPassword: (state, { payload }: PayloadAction<string>) => {
      state.confirmPassword = payload;
    },

    setLanguage: (state, { payload }: PayloadAction<UserRoles>) => {
      state.language = payload;
    },
    setRole: (state, { payload }: PayloadAction<UserRoles>) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: settingsModalActions } = settingsModalSlice;
export const { reducer: settingsModalReducer } = settingsModalSlice;
function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
