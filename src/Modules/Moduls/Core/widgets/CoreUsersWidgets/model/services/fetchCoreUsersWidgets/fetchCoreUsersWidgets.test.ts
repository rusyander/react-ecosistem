import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsuncThunk';
import { fetchCoreUsersWidgets } from './fetchCoreUsersWidgets';

const data = {};

describe('fetchCoreUsersWidgets', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCoreUsersWidgets);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    // expect(result.meta.requestStatus).toBe('fulfilled');
    // expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchCoreUsersWidgets);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    // const result = await thunk.callThunk();

    // expect(result.meta.requestStatus).toBe('rejected');
  });
});
