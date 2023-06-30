import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUserName';

describe('getLoginLoading', () => {
  test('shod username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '123',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('123');
  });

  test('work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
