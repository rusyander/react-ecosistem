import { CheckboxTreeDataProps } from 'shared/Globals/types/checkboxTreeTypes';
import { rtkApi } from 'shared/api/rtkApi';
const CoreSetFormActionAuditWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAccessTree: build.query<CheckboxTreeDataProps, null>({
      query: () => ({
        url: '/api/core/audit/getAccessTree',
        method: 'GET',
      }),
    }),

    saveConfigAccessTree: build.mutation<CheckboxTreeDataProps, string[]>({
      query: (data) => ({
        url: '/api/core/audit/saveConfig',
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const getAccessTreeQ =
  CoreSetFormActionAuditWidgetsApi.useGetAccessTreeQuery;
export const saveConfigAccessTreeM =
  CoreSetFormActionAuditWidgetsApi.useSaveConfigAccessTreeMutation;
