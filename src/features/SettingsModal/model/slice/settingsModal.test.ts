import { changePassword } from '../services/fetchSettingsModal/changePassword';
import { SettingsModalSchema } from '../types/settingsModal';
import { settingsModalActions, settingsModalReducer } from './settingsModal';

const data = {};

describe('settingsModalSlice', () => {
  test('', () => {
    const state: DeepPartial<SettingsModalSchema> = {};
    // expect(
    //   settingsModalReducer(
    //     state as SettingsModalSchema,
    //     settingsModalActions.set(true)
    //   )
    // ).toEqual({});
  });

  test('test settingsModal service pending', () => {
    const state: DeepPartial<SettingsModalSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(
      settingsModalReducer(state as SettingsModalSchema, changePassword.pending)
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('test settingsModal service fullfilled', () => {
    const state: DeepPartial<SettingsModalSchema> = {
      isLoading: true,
      error: 'error',
    };
    // expect(
    //   settingsModalReducer(
    //     state as SettingsModalSchema,
    //     changePassword.fulfilled(, '', '')
    //   )
    // ).toEqual({
    //   isLoading: false,
    //   error: undefined,
    //   data,
    // });
  });
});
