import { StateSchema } from 'app/providers/StoreProvider';
import { getSettingsModalIsLoading } from './getSettingsModal';

describe('getSettingsModal', () => {
  test('', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getSettingsModalIsLoading(state as StateSchema)).toEqual({});
  });
});
