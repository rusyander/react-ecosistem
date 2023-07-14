import { StateSchema } from 'app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state?.auth?.userData || {};
