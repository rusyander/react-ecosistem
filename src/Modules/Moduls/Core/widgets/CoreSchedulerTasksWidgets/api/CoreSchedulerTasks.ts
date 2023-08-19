import { rtkApi } from 'shared/api/rtkApi';
const CoreSchedulerTasksApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedulerTaskGridData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/sched/getSchedulerTaskGridData',
        method: 'POST',
        body: data,
      }),
    }),
    getAttrValues: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/attr/getAttrValues',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const GetSchedulerTaskGridDataM =
  CoreSchedulerTasksApi.useGetSchedulerTaskGridDataMutation;
export const GetAttrValuesM = CoreSchedulerTasksApi.useGetAttrValuesMutation;
