import { lazy } from 'react';

export const CORE_SYS_PARAMS_Async = lazy(
  async () => await import('./CORE_SYS_PARAMS')
);
