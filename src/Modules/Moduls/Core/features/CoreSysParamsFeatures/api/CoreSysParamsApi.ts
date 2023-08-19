import { rtkApi } from 'shared/api/rtkApi';
const CoreGlobalApi = rtkApi.injectEndpoints({
  // tagTypes: ["Post"],
  endpoints: (build) => ({
    getAttrValues: build.mutation<any, any>({
      query: (formCode: string) => ({
        url: '/api/core/attr/getAttrValues',
        body: formCode,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getSysParValuesGridData: build.mutation<any, any>({
      query: (data: string) => ({
        url: '/api/core/sysPar/getSysParValuesGridData',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const getAttrValuesM = CoreGlobalApi.useGetAttrValuesMutation;
export const getSysParValuesGridDataM =
  CoreGlobalApi.useGetSysParValuesGridDataMutation;
