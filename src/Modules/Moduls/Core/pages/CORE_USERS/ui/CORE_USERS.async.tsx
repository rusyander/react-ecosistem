import { lazy } from 'react';

export const CORE_USERS_Async = lazy(async () => await import('./CORE_USERS'));
