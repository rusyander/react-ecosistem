import { lazy } from 'react';

export const CORE_SCHED_TASKS_Async = lazy(
  async () => await import('./CORE_SCHED_TASKS')
);
