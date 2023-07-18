import { fetchCoreUsersWidgets } from '../services/fetchCoreUsersWidgets/fetchCoreUsersWidgets';
import { CoreUsersWidgetsSchema } from '../types/coreUsersWidgets';
import {
  coreUsersWidgetsActions,
  coreUsersWidgetsReducer,
} from './coreUsersWidgets';

const data = {};

describe('coreUsersWidgetsSlice', () => {
  test('', () => {
    const state: DeepPartial<CoreUsersWidgetsSchema> = {};
    // expect(
    //   coreUsersWidgetsReducer(
    //     state as CoreUsersWidgetsSchema,
    //     coreUsersWidgetsActions.set(true)
    //   )
    // ).toEqual({});
  });

  test('test coreUsersWidgets service pending', () => {
    const state: DeepPartial<CoreUsersWidgetsSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(
      coreUsersWidgetsReducer(
        state as CoreUsersWidgetsSchema,
        fetchCoreUsersWidgets.pending
      )
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('test coreUsersWidgets service fullfilled', () => {
    const state: DeepPartial<CoreUsersWidgetsSchema> = {
      isLoading: true,
      error: 'error',
    };
    expect(
      coreUsersWidgetsReducer(
        state as CoreUsersWidgetsSchema,
        fetchCoreUsersWidgets.fulfilled(data, '', '')
      )
    ).toEqual({
      isLoading: false,
      error: undefined,
      data,
    });
  });
});
