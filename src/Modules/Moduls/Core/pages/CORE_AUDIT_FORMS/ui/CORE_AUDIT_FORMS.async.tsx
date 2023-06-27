import { lazy } from 'react';

export const CORE_AUDIT_FORMS_Async = lazy(
  async () => await import('./CORE_AUDIT_FORMS')
);
