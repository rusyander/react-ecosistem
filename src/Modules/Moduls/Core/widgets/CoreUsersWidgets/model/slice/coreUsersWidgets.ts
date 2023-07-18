import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCoreUsersWidgets } from '../services/fetchCoreUsersWidgets/fetchCoreUsersWidgets';
import { CoreUsersWidgetsSchema } from '../types/coreUsersWidgets';

const initialState: CoreUsersWidgetsSchema = {
  isLoading: false,
  error: undefined,
};

export const coreUsersWidgetsSlice = createSlice({
  name: 'coreUsersWidgets',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  // extraReducers: (builder) => {
  // builder
  // .addCase(fetchCoreUsersWidgets.pending, (state) => {
  // state.error = undefined;
  // state.isLoading = true;
  // })
  // .addCase(
  // fetchCoreUsersWidgets.fulfilled,
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

export const { actions: coreUsersWidgetsActions } = coreUsersWidgetsSlice;
export const { reducer: coreUsersWidgetsReducer } = coreUsersWidgetsSlice;
function asError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
