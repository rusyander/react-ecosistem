import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginLogin = (state: StateSchema) => state?.auth?.login || '';
