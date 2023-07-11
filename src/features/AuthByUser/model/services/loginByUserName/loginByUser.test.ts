import { loginByUser } from './loginByUser';
import { UserActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsuncThunk';

describe('loginByUserName', () => {
  // test('shod call loginByUserName success', async () => {
  //   const userValue = { username: 'test', id: '1' };

  //   const thunk = new TestAsyncThunk(loginByUser);
  //   thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

  //   const result = await thunk.callThunk({
  //     username: 'test',
  //     password: 'test',
  //   });

  //   expect(thunk.dispatch).toHaveBeenCalledWith(
  //     UserActions.setAuthData(userValue)
  //   );
  //   expect(thunk.dispatch).toHaveBeenCalledTimes(3);
  //   expect(thunk.api.post).toHaveBeenCalled();
  //   expect(result.payload).toEqual(userValue);
  //   expect(result.meta.requestStatus).toBe('fulfilled');
  // });

  test('shod call error', async () => {
    const thunk = new TestAsyncThunk(loginByUser);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({
      username: 'test',
      password: 'test',
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    // expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });
});
