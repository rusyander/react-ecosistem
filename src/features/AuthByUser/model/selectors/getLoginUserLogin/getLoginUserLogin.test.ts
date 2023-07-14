import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginLogin } from './getLoginUserLogin';

describe('getLoginLoading', () => {
  test('shod login', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {
        login: '123',
      },
    };
    expect(getLoginLogin(state as StateSchema)).toEqual('123');
  });

  test('work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginLogin(state as StateSchema)).toEqual('');
  });
});
