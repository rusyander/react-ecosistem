import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';
import { LoginSchema } from '../../types/loginSchema';

describe('getLoginError', () => {
  test('shod return error', () => {
    const state: DeepPartial<StateSchema | LoginSchema> = {
      loginForm: {
        error: 'error',
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual('error');
  });

  test('work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toEqual('');
  });
});
