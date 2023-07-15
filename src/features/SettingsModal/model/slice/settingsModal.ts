import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changePassword } from '../services/fetchSettingsModal/changePassword';
import { Language, Role, SettingsModalSchema } from '../types/settingsModal';

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

    setLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.language = payload;
    },
    setRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        }
      )
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // .addMatcher(asError, (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { actions: settingsModalActions } = settingsModalSlice;
export const { reducer: settingsModalReducer } = settingsModalSlice;
function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
