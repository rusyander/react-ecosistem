import { lazy } from 'react';

export const CORE_SCHEDULER_TASKS_Async = lazy(
  async () => await import('./CORE_SCHEDULER_TASKS')
);
