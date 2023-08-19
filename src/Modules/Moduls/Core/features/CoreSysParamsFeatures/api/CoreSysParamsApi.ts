import { rtkApi } from 'shared/api/rtkApi';

const getAttrValuesPayload = [
  {
    code: 'CORE_SYS_PAR_LEVELS',
  },
  {
    code: 'CORE_APPLICATIONS',
  },
  {
    code: 'CORE_ROLES',
  },
  {
    code: 'CORE_USERS',
  },
];

const CoreGlobalApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAttrValues: build.mutation<any, any>({
      query: (formCode: string) => ({
        url: '/api/core/attr/getAttrValues',
        body: getAttrValuesPayload,
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

    initSysParValues: build.mutation<any, any>({
      query: (data: string) => ({
        url: '/api/core/sysPar/initSysParValues',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    saveData: build.mutation<any, any>({
      query: (data: string) => ({
        url: '/api/core/sysPar/saveData',
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
export const initSysParValuesM = CoreGlobalApi.useInitSysParValuesMutation;
export const saveDataM = CoreGlobalApi.useSaveDataMutation;
