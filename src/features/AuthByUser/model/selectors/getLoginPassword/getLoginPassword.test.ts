import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginLoading', () => {
  test('shod password', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('123');
  });

  test('work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
