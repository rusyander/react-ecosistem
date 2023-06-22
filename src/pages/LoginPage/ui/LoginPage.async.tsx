import { lazy } from 'react';

export const LoginPageAsync = lazy(async () => await import('./LoginPage'));
