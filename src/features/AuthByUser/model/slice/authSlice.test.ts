import { AuthSliceActions, AuthSliceReducer } from './authSlice';
import { AuthSchema } from '../types/authSchema';

describe('LoginSlice', () => {
  test('test set error', () => {
    const state: DeepPartial<AuthSchema> = {
      error: 'error',
    };
    expect(
      AuthSliceReducer(state as AuthSchema, AuthSliceActions.setPassword)
    ).toEqual({ error: 'error' });
  });

  test('test set login', () => {
    const state: DeepPartial<AuthSchema> = {
      login: '123',
    };
    expect(
      AuthSliceReducer(
        state as AuthSchema,
        AuthSliceActions.setLoginName('123')
      )
    ).toEqual({ login: '123' });
  });

  test('test set password', () => {
    const state: DeepPartial<AuthSchema> = {
      password: '123',
    };
    expect(
      AuthSliceReducer(state as AuthSchema, AuthSliceActions.setPassword('123'))
    ).toEqual({ password: '123' });
  });
});
