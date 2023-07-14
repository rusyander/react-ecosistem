import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsuncThunk';
import { fetchSettingsModal } from './fetchSettingsModal';

const data = {};

describe('fetchSettingsModal', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchSettingsModal);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchSettingsModal);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
