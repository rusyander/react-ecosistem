import { rtkApi } from 'shared/api/rtkApi';
const CoreAuditSessionsWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    killSession: build.mutation<any[], string>({
      query: (id) => ({
        url: '/api/core/audit/killSession',
        body: id,
      }),
    }),
  }),
  overrideExisting: true,
});
export const KillSessionM = CoreAuditSessionsWidgetsApi.useKillSessionMutation;
