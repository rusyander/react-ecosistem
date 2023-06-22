import { loginByUserName } from './loginByUserName';
import { UserActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsuncThunk';

// jest.mock('axios');
// const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName', () => {
  //   let dispatch: Dispatch;
  //   let getState: () => StateSchema;

  //   beforeEach(() => {
  //     dispatch = jest.fn();
  //     getState = jest.fn();
  //   });

  //   test('shod call loginByUserName success', async () => {
  //     const userValue = { username: 'test', id: '1' };
  //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

  //     const action = loginByUserName({ username: 'test', password: 'test' });
  //     const result = await action(dispatch, getState, undefined);

  //     expect(dispatch).toHaveBeenCalledWith(UserActions.setAuthData(userValue));
  //     expect(dispatch).toHaveBeenCalledTimes(3);
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(result.payload).toEqual(userValue);
  //     expect(result.meta.requestStatus).toBe('fulfilled');
  //   });

  //   test('shod call error', async () => {
  //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

  //     const action = loginByUserName({ username: 'test', password: 'test' });
  //     const result = await action(dispatch, getState, undefined);

  //     expect(dispatch).toHaveBeenCalledTimes(2);
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(result.meta.requestStatus).toBe('rejected');
  //     expect(result.payload).toEqual('error');
  //   });

  test('shod call loginByUserName success', async () => {
    const userValue = { username: 'test', id: '1' };

    const thunk = new TestAsyncThunk(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const result = await thunk.callThunk({
      username: 'test',
      password: 'test',
    });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      UserActions.setAuthData(userValue)
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.payload).toEqual(userValue);
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('shod call error', async () => {
    const thunk = new TestAsyncThunk(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({
      username: 'test',
      password: 'test',
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
