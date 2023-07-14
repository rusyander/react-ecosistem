import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSettingsModal } from '../services/fetchSettingsModal/fetchSettingsModal';
import { SettingsModalSchema } from '../types/settingsModal';

const initialState: SettingsModalSchema = {
  isLoading: false,
  error: undefined,
};

export const settingsModalSlice = createSlice({
  name: 'settingsModal',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  // extraReducers: (builder) => {
  // builder
  // .addCase(fetchSettingsModal.pending, (state) => {
  // state.error = undefined;
  // state.isLoading = true;
  // })
  // .addCase(
  // fetchSettingsModal.fulfilled,
  // (state, action: PayloadAction<any>) => {
  // state.isLoading = false;
  // state.data = action.payload;
  // }
  // )
  // .addMatcher(
  // asError,
  // (state, action: PayloadAction<string>) => {
  // state.isLoading = false;
  // state.error = action.payload;
  // }
  // );}
});

export const { actions: settingsModalActions } = settingsModalSlice;
export const { reducer: settingsModalReducer } = settingsModalSlice;
function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
