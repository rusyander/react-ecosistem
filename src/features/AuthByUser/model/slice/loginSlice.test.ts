import { LoginActions, LoginReducer } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';

describe('LoginSlice', () => {
  test('test set error', () => {
    const state: DeepPartial<LoginSchema> = {
      error: 'error',
    };
    expect(
      LoginReducer(state as LoginSchema, LoginActions.setPassword)
    ).toEqual({ error: 'error' });
  });

  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: '123',
    };
    expect(
      LoginReducer(state as LoginSchema, LoginActions.setUserName('123'))
    ).toEqual({ username: '123' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '123',
    };
    expect(
      LoginReducer(state as LoginSchema, LoginActions.setPassword('123'))
    ).toEqual({ password: '123' });
  });
});
