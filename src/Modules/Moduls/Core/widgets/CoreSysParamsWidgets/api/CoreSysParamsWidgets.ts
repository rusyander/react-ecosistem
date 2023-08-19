import { rtkApi } from 'shared/api/rtkApi';
const CoreSysParamsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getGridData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/sysPar/getGridData',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getAttrValues: build.mutation<any[], any>({
      query: (data) => ({
        url: '/api/core/attr/getAttrValues',
        method: 'POST',
        body: [{ code: 'CORE_APPLICATIONS' }],
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});
export const GetGridDataM = CoreSysParamsApi.useGetGridDataMutation;
export const GetAttrValuesM = CoreSysParamsApi.useGetAttrValuesMutation;
