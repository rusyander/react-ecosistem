import { rtkApi } from 'shared/api/rtkApi';
const OsRegionsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/region/saveData',
        body: data,
        method: 'POST',
      }),
    }),
    deleteData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/region/deleteData',
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const saveDataM = OsRegionsApi.useSaveDataMutation;
export const deleteDataM = OsRegionsApi.useDeleteDataMutation;
