import { lazy } from 'react';

export const UserPageAsync = lazy(async () => await import('./UserPage'));
